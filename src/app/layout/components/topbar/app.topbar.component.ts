import {Component, ElementRef, ViewChild} from '@angular/core';
import {MenuItem} from 'primeng/api';

import {AuthService} from '../../../demo/service/auth/auth.service';
import {LayoutService} from '../../service/app.layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items: MenuItem[] = [
        {
            label: 'Sair',
            icon: 'pi pi-times',
            command: () => this.authService.logout(),
        },
    ];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    user: string | null;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {
        this.user = this.authService.getUser();
    }
}

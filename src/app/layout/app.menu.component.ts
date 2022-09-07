import { Component, OnInit } from '@angular/core';

import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin/'],
                    },
                    {
                        label: 'Professores',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin/teachers'],
                    },
                    {
                        label: 'Alunos',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin/students'],
                    },
                    {
                        label: 'Salas de aula',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/admin/classrooms'],
                    },
                ],
            },
        ];
    }
}

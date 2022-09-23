import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-projeto',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    constructor(public layoutService: LayoutService, public router: Router) { }

    ngOnInit(): void {
    }
}

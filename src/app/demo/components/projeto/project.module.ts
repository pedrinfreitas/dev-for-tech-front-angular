import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectRoutingModule} from './project-routing.module';
import {StyleClassModule} from 'primeng/styleclass';
import {DividerModule} from 'primeng/divider';
import {ChartModule} from 'primeng/chart';
import {ButtonModule} from 'primeng/button';
import {ProjectComponent} from "./project.component";
import {PanelModule} from "primeng/panel";

@NgModule({
    imports: [
        CommonModule,
        ProjectRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule

    ],
    declarations: [ProjectComponent]
})
export class ProjectModule { }

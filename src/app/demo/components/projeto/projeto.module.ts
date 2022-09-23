import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjetoRoutingModule} from './projeto-routing.module';
import {StyleClassModule} from 'primeng/styleclass';
import {DividerModule} from 'primeng/divider';
import {ChartModule} from 'primeng/chart';
import {ButtonModule} from 'primeng/button';
import {ScrollTopModule} from "primeng/scrolltop";
import {GalleriaModule} from "primeng/galleria";
import {ImageModule} from "primeng/image";
import {TabMenuModule} from "primeng/tabmenu";
import {StepsModule} from "primeng/steps";
import {ProjetoComponent} from "../projeto/projeto.component";

@NgModule({
    imports: [
        CommonModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        ButtonModule,
        ScrollTopModule,
        GalleriaModule,
        ImageModule,
        TabMenuModule,
        StepsModule,
        ProjetoRoutingModule

    ],
    declarations: [ProjetoComponent]
})
export class ProjetoModule { }

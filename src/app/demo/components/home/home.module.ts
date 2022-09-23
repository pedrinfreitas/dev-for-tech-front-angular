import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {StyleClassModule} from 'primeng/styleclass';
import {DividerModule} from 'primeng/divider';
import {ChartModule} from 'primeng/chart';
import {ButtonModule} from 'primeng/button';
import {HeaderComponent} from './header/header.component';
import {ScrollTopModule} from "primeng/scrolltop";
import {GalleriaModule} from "primeng/galleria";
import {ImageModule} from "primeng/image";
import {TabMenuModule} from "primeng/tabmenu";
import {StepsModule} from "primeng/steps";
import {HomeComponent} from "./home.component";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        ButtonModule,
        ScrollTopModule,
        GalleriaModule,
        ImageModule,
        TabMenuModule,
        StepsModule,

    ],
    declarations: [HomeComponent, HeaderComponent]
})
export class HomeModule { }

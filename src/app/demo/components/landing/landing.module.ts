import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingRoutingModule} from './landing-routing.module';
import {LandingComponent} from './landing.component';
import {StyleClassModule} from 'primeng/styleclass';
import {DividerModule} from 'primeng/divider';
import {ChartModule} from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {FocoComponent} from "./components/foco/foco.component";
import {NiveisEnsinoComponent} from "./components/niveis-ensino/niveis-ensino.component";
import {ScrollTopModule} from "primeng/scrolltop";
import {WelcomeComponent} from "./components/welcome/welcome.component";
import {GalleriaModule} from "primeng/galleria";

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        ScrollTopModule,
        GalleriaModule
    ],
    declarations: [LandingComponent, FocoComponent, NiveisEnsinoComponent, WelcomeComponent]
})
export class LandingModule { }

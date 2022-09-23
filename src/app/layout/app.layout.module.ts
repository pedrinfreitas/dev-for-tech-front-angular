import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {BadgeModule} from 'primeng/badge';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {SidebarModule} from 'primeng/sidebar';
import {SplitButtonModule} from 'primeng/splitbutton';

import {AppFooterComponent} from './components/footer/app.footer.component';
import {AppLayoutComponent} from './app.layout.component';
import {AppMenuComponent} from './components/menu/app.menu.component';
import {AppMenuitemComponent} from './components/menu/app.menuitem.component';
import {AppSidebarComponent} from './components/sidebar/app.sidebar.component';
import {AppTopBarComponent} from './components/topbar/app.topbar.component';
import {AppConfigModule} from './config/config.module';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        AppConfigModule,
        SplitButtonModule,
    ],
    exports: [AppLayoutComponent],
})
export class AppLayoutModule {}

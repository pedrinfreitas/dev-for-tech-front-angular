import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {AddressService} from './demo/service/address.service';
import {httpInterceptorProviders} from './demo/service/auth/auth-interceptor';
import {CountryService} from './demo/service/country.service';
import {CustomerService} from './demo/service/customer.service';
import {EventService} from './demo/service/event.service';
import {IconService} from './demo/service/icon.service';
import {NodeService} from './demo/service/node.service';
import {PhotoService} from './demo/service/photo.service';
import {ProductService} from './demo/service/product.service';
import {StudentService} from './demo/service/students.service';
import {AppLayoutModule} from './layout/app.layout.module';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        StudentService,
        AddressService,
        httpInterceptorProviders

    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

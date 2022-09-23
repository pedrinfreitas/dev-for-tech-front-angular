import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {TeachersComponent} from './teachers.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: TeachersComponent }]),
    ],
    exports: [RouterModule],
})
export class TeachersRoutingModule {}

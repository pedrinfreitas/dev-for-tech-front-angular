import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ClassroomsComponent} from './classrooms.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ClassroomsComponent }]),
    ],
    exports: [RouterModule],
})
export class ClassroomsRoutingModule {}

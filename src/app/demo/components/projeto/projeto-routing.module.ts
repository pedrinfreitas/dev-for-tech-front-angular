import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProjetoComponent} from "../projeto/projeto.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ProjetoComponent },
    ])],
    exports: [RouterModule]
})
export class ProjetoRoutingModule { }

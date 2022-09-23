import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {NotfoundComponent} from './demo/components/notfound/notfound.component';
import {AuthOffGuard} from './demo/service/auth/auth-off.guard';
import {AuthGuard} from './demo/service/auth/auth.guard';
import {AppLayoutComponent} from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    loadChildren: () =>
                        import('./demo/components/landing/landing.module').then(
                            (m) => m.LandingModule
                        ),
                },
                {
                    path: 'admin',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'teachers',
                            loadChildren: () =>
                                import(
                                    './demo/components/teachers/teachers.module'
                                ).then((m) => m.TeachersModule),
                        },
                        {
                            path: 'students',
                            loadChildren: () =>
                                import(
                                    './demo/components/students/students.module'
                                ).then((m) => m.StudentsModule),
                        },
                        {
                            path: 'classrooms',
                            loadChildren: () =>
                                import(
                                    './demo/components/classrooms/classrooms.module'
                                ).then((m) => m.ClasroomsModule),
                        },
                    ],
                    canActivate: [AuthOffGuard],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                    canActivate: [AuthGuard],
                },

                { path: 'pages/notfound', component: NotfoundComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { StudentService } from './../../service/students.service';
import { TeacherService } from './../../service/teachers.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
    constructor(
        public layoutService: LayoutService,
        private studentService: StudentService,
        private teacherService: TeacherService
    ) {}

    qtdStudents?: number = 0;
    qtdTeachers?: number = 0;

    ngOnInit() {
        this.studentService
            .getQtdeStudents()
            .pipe(take(1))
            .subscribe((e) => (this.qtdStudents = e));

        this.teacherService
            .getQtdeTeachers()
            .pipe(take(1))
            .subscribe((e) => (this.qtdTeachers = e));
    }

    ngOnDestroy() {}
}

import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';

import {ITeachers} from "../teachers/teachers.model";
import {AddressService, IAddress} from "../../service/address.service";
import {TeacherService} from "../../service/teachers.service";
import {finalize, take} from "rxjs";

@Component({
    templateUrl: './teachers.component.html',
    providers: [MessageService],
})
export class TeachersComponent implements OnInit {
    teacherDialog: boolean = false;

    deleteTeacherDialog: boolean = false;

    deleteTeachersDialog: boolean = false;

    teachers: ITeachers[] = [];

    teacher: ITeachers = {};

    selectedTeachers: ITeachers[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    mostraLoading: boolean = false;

    address: IAddress = {};

    checked: boolean = false;

    constructor(
        private teacherService: TeacherService,
        private addressService: AddressService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.getTeachers();

        this.cols = [
            { field: 'name', header: 'Nome' },
            { field: 'email', header: 'E-mail' },
            { field: 'phone', header: 'Celular' },
            { field: 'salary', header: 'Salario' },
            { field: 'cep', header: 'CEP' },
        ];
    }

    getTeachers() {
        this.teacherService
            .getTeachers()
            .pipe(
                take(1),
                finalize(() => (this.mostraLoading = false))
            )
            .subscribe((data) => (this.teachers = data));
    }

    openNew() {
        this.teacher = {};
        this.submitted = false;
        this.teacherDialog = true;
    }

    editTeacher(teacher: ITeachers) {
        this.teacherDialog = true;
        this.teacher = { ...teacher };
    }

    deleteTeacher(teacher: ITeachers) {
        this.deleteTeacherDialog = true;
        this.teacher = { ...teacher };
    }


    confirmDelete() {
        if (this.teacher.id) {
            this.teacherService.deleteTeachers(+this.teacher.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Professor Deletado.',
                        life: 3000,
                    });
                    this.getTeachers();
                    this.deleteTeacherDialog = false;
                    this.teacher = {};
                },
                error: (err) => {
                    console.error(err);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Ops...',
                        detail: 'Algo deu errado',
                        life: 3000,
                    });
                },
                complete: () => console.info('complete'),
            });
        }
    }

    hideDialog() {
        this.teacherDialog = false;
        this.submitted = false;
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getCEPAddress(cep: string) {
        const cepFormat = /^[0-9]{5}-[0-9]{3}$/.test(cep);

        if (cep?.length === 9 && cepFormat) {
            this.addressService
                .buscarPorCep(cep)
                .pipe(take(1))
                .subscribe((data) => {
                    console.log(data);
                    this.teacher.city = data.localidade;
                    this.teacher.street = data.logradouro;
                    this.teacher.state = data.uf;
                    this.teacher.country = 'Brasil';
                });
        }
    }

    onSubmit(teacher: ITeachers): void {

        this.submitted = true;

        if (this.teacher.id) {
            this.teacherService.updateTeachers(this.teacher).subscribe({
                next: () => this.onSuccess('Professor editado com sucesso'),
                error: (err) => this.onError(err),
                complete: () => console.info('complete'),
            });
        } else {
            this.teacherService.createTeachers(teacher).subscribe({
                next: () => this.onSuccess('Professor criado com sucesso.'),
                error: (err) => this.onError(err),
                complete: () => console.info('complete'),
            });
        }
    }

    onSuccess(status: string) {
        this.messageService.add({
            severity: 'success',
            summary: 'Sucesso!',
            detail: status,
            life: 3000,
        });
        this.getTeachers();
        this.teacherDialog = false;
        this.teacher = {};
    }

    onError(err: any) {
        console.error(err);
        this.messageService.add({
            severity: 'error',
            summary: 'Ops...',
            detail: 'Algo deu errado',
            life: 3000,
        });
    }
}

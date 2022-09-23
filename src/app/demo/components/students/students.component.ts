import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {Table} from 'primeng/table';
import {finalize, take} from 'rxjs';

import {AddressService, IAddress} from './../../service/address.service';
import {StudentService} from './../../service/students.service';
import {IStudents} from './students.model';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss'],
    providers: [MessageService],
})
export class StudentsComponent implements OnInit {
    studentDialog: boolean = false;

    deleteStudentDialog: boolean = false;

    deleteStudentsDialog: boolean = false;

    students: IStudents[] = [];

    student: IStudents = {};

    selectedStudents: IStudents[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    mostraLoading: boolean = false;

    address: IAddress = {};

    constructor(
        private studentService: StudentService,
        private addressService: AddressService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.getStudents();

        this.cols = [
            { field: 'name', header: 'Nome' },
            { field: 'email', header: 'E-mail' },
            { field: 'phone', header: 'Celular' },
            { field: 'fees', header: 'Mensalidade' },
            { field: 'cep', header: 'CEP' },
        ];
    }

    getStudents() {
        this.studentService
            .getStudents()
            .pipe(
                take(1),
                finalize(() => (this.mostraLoading = false))
            )
            .subscribe((data) => (this.students = data));
    }

    openNew() {
        this.student = {};
        this.submitted = false;
        this.studentDialog = true;
    }

    // deleteSelectedStudents() {
    //     this.deleteStudentsDialog = true;
    // }

    editStudent(student: IStudents) {
        this.student = { ...student };
        this.studentDialog = true;
    }

    deleteStudent(student: IStudents) {
        this.deleteStudentDialog = true;
        this.student = { ...student };
    }

    // confirmDeleteSelected() {
    //     this.deleteStudentsDialog = false;
    //     this.students = this.students.filter(
    //         (val) => !this.selectedStudents.includes(val)
    //     );
    //     this.messageService.add({
    //         severity: 'success',
    //         summary: 'Successful',
    //         detail: 'Products Deleted',
    //         life: 3000,
    //     });
    //     this.selectedStudents = [];
    // }

    confirmDelete() {
        if (this.student.id) {
            this.studentService.deleteStudents(+this.student.id).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Aluno Deletado.',
                        life: 3000,
                    });
                    this.getStudents();
                    this.deleteStudentDialog = false;
                    this.student = {};
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
        this.studentDialog = false;
        this.submitted = false;
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.students.length; i++) {
    //         if (this.students[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    // createId(): string {
    //     let id = '';
    //     const chars =
    //         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }

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
                    this.student.city = data.localidade;
                    this.student.street = data.logradouro;
                    this.student.state = data.uf;
                    this.student.country = 'Brasil';
                });
        }
    }

    onSubmit(student: IStudents): void {

        this.submitted = true;

        if (student.id) {
            this.studentService.updateStudents(student).subscribe({
                next: () => this.onSuccess('Aluno editado com sucesso'),
                error: (err) => this.onError(err),
                complete: () => console.info('complete'),
            });
        } else {
            this.studentService.createStudents(student).subscribe({
                next: () => this.onSuccess('Aluno criado com sucesso.'),
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
        this.getStudents();
        this.studentDialog = false;
        this.student = {};
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

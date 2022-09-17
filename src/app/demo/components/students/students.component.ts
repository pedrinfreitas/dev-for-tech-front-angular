import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize, take } from 'rxjs';

import { AddressService, IAddress } from './../../service/address.service';
import { StudentService } from './../../service/students.service';
import { IStudents } from './students.model';

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

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    mostraLoading: boolean = false;

    address: IAddress = {};

    constructor(
        private studentService: StudentService,
        private addressService: AddressService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.studentService
            .getStudents()
            .pipe(
                take(1),
                finalize(() => (this.mostraLoading = false))
            )
            .subscribe((data) => (this.students = data));
        //.then((data) => (this.products = data));

        console.log(this.students);

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' },
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' },
        ];
    }

    openNew() {
        this.student = {};
        this.submitted = false;
        this.studentDialog = true;
    }

    deleteSelectedStudents() {
        this.deleteStudentsDialog = true;
    }

    editStudent(student: IStudents) {
        this.student = { ...student };
        this.studentDialog = true;
    }

    deleteStudent(student: IStudents) {
        this.deleteStudentDialog = true;
        this.student = { ...student };
    }

    confirmDeleteSelected() {
        this.deleteStudentsDialog = false;
        this.students = this.students.filter(
            (val) => !this.selectedStudents.includes(val)
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
        });
        this.selectedStudents = [];
    }

    confirmDelete() {
        this.deleteStudentDialog = false;
        this.students = this.students.filter(
            (val) => val.id !== this.student.id
        );
        this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Product Deleted',
            life: 3000,
        });
        this.student = {};
    }

    hideDialog() {
        this.studentDialog = false;
        this.submitted = false;
    }

    saveStudent() {
        this.submitted = true;

        if (this.student.name?.trim()) {
            if (this.student.id) {
                this.students[this.findIndexById(this.student.id)] =
                    this.student;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000,
                });
            } else {
                this.student.id = this.createId();
                console.log(this.student);

                this.students.push(this.student);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000,
                });
            }

            this.students = [...this.students];
            this.studentDialog = false;
            this.student = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.students.length; i++) {
            if (this.students[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }

    getCEPAddress(cep: string) {
        const cepFormat = /^[0-9]{5}-[0-9]{3}$/.test(cep);
        console.log(cep);
        console.log(cepFormat);

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
}

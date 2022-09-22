import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { AuthService } from '../../../service/auth/auth.service';
import { PlatformDetectorService } from './../../../service/platform-detector/platform-detector.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    providers: [MessageService],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    @ViewChild('usernameInput') usernameInput: ElementRef<HTMLInputElement>;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        public layoutService: LayoutService,
        private authService: AuthService,
        private messageService: MessageService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService
    ) {}

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.loginForm.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }
        const { username, password } = this.loginForm.value;

        this.authService.authenticate(username, password).subscribe({
            next: () => this.onSuccess(),
            error: () => this.onError(),
            complete: () => console.info('complete'),
        });
    }

    onSuccess() {
        this.messageService.add({
            severity: 'success',
            summary: 'Login realizado com sucesso!',
            detail: 'aguarde o redirecionamento.',
            life: 3000,
        });
        setTimeout(() => {
            this.router.navigate(['admin']);
        }, 2000);
    }

    onError() {
        this.messageService.add({
            severity: 'error',
            summary: 'Credenciais invalidas',
            detail: 'E-mail ou senha invalido',
            life: 3000,
        });
        this.onReset();
    }

    onReset(): void {
        this.submitted = false;
        this.loginForm.reset();
        this.platformDetectorService.isPlatformBrowser() &&
            this.usernameInput.nativeElement.focus();
    }
}

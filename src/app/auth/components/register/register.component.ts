import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from "@angular/forms";
import {LoginRequest} from "../../interfaces/login-request.interface";
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder);
  formRegister: FormGroup;

  constructor() {

    this.formRegister = this.formBuilder.group({
      identityDocument: ['', [Validators.required, Validators.minLength(6)]],
      fullName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required, Validators.minLength(6)]],

      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    const passwordHash = this.formRegister.get('passwordHash')?.value;
    const confirmPassword = this.formRegister.get('confirmPassword')?.value;
    this.passwordMatchValidator(passwordHash, confirmPassword);

    if (this.formRegister.valid) {
      // Mapear el formulario a LoginRequest
      const loginRequest: LoginRequest = {
        identityDocument: this.formRegister.get('identityDocument')?.value || '',
        fullName: this.formRegister.get('fullName')?.value || '',
        lastName: this.formRegister.get('lastName')?.value || '',
        email: this.formRegister.get('email')?.value || '',
        passwordHash: this.formRegister.get('passwordHash')?.value || ''
      };

      console.log('LoginRequest mapeado:', loginRequest);
      // Aquí puedes enviar el loginRequest a tu servicio de autenticación
    } else {
      console.log('Formulario inválido');
    }
  }

  passwordMatchValidator(passwordHash: string, confirmPassword: string): void{
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/;

    if (!passwordRegex.test(passwordHash)) {
      this.formRegister.get('passwordHash')?.setErrors({ invalidPassword: true });
    } else {
      this.formRegister.get('passwordHash')?.setErrors(null);
    }

    if (passwordHash !== confirmPassword) {
      this.formRegister.get('confirmPassword')?.setErrors({ notEqual: true });
    } else {
      this.formRegister.get('confirmPassword')?.setErrors(null);
    }
  }

}


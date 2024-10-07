import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserRequest} from "../interfaces/user-request.interface";
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2'

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
  private userService = inject(UserService);
  private router = inject(Router);

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
  registerUser() {
    const passwordHash = this.formRegister.get('passwordHash')?.value;
    const confirmPassword = this.formRegister.get('confirmPassword')?.value;
    this.passwordMatchValidator(passwordHash, confirmPassword);

    if (this.formRegister.valid) {
      // Mapear el formulario a LoginRequest
      const userRequest: UserRequest = {
        identityDocument: this.formRegister.get('identityDocument')?.value || '',
        fullName: this.formRegister.get('fullName')?.value || '',
        lastName: this.formRegister.get('lastName')?.value || '',
        email: this.formRegister.get('email')?.value || '',
        passwordHash: this.formRegister.get('passwordHash')?.value || ''
      };

      console.log('LoginRequest mapeado:', userRequest);
      // Aquí puedes enviar el loginRequest a tu servicio de autenticación
      this.userService.registerUser(userRequest)
        .subscribe({
          next:() => {
            this.registerUserSuccess()
            this.router.navigate(['/auth/login'])
          },
          error:(message)=>{
            this.registerUserFailed();
          }
        })
    } else {
      this.infoIncomplete();
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

  registerUserFailed(){
    Swal.fire({
      icon: "error",
      title: "Lamentamos informarle que el registro ha fallado. Por favor, verifique los datos ingresados y vuelva a intentarlo",
      showConfirmButton: false,
      timer: 5000
    });
}

  registerUserSuccess(){
    Swal.fire({
      icon: "success",
      title: "Su registro se ha completado exitosamente",
      showConfirmButton: false,
      timer: 3000
    });
  }

  infoIncomplete(){
    Swal.fire({
      icon: "warning",
      title: "Por favor valida que todos los campos estén diligenciados",
      showConfirmButton: false,
      timer: 5000
    });
  }
}


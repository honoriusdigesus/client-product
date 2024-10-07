import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../user/services/user.service";
import Swal from "sweetalert2";
import {LoginService} from "../services/login.service";
import {LoginRequest} from "../interfaces/login-request.interface";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);
  formLogin: FormGroup;


  login(){
    if(this.formLogin.valid){
      const loginRequest: LoginRequest = {
        email: this.formLogin.get('email')?.value || '',
        password: this.formLogin.get('password')?.value || ''
      }
      this.infoIncomplete();
      this.loginService.login(loginRequest)
        .subscribe({
          next:() => {
            this.loginSuccess();
            this.router.navigate(['/product']);
          },
          error:(message) => {
            this.loginFailed();
          }
        });
    }
  }


  constructor() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginFailed(){
    Swal.fire({
      icon: "error",
      title: "Lamentamos informarle que el registro ha fallado. Por favor, verifique los datos ingresados y vuelva a intentarlo",
      showConfirmButton: false,
      timer: 5000
    });
  }

  loginSuccess(){
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

/*
*
*
    const passwordHash = this.formRegister.get('passwordHash')?.value;
    const confirmPassword = this.formRegister.get('confirmPassword')?.value;
    this.passwordMatchValidator(passwordHash, confirmPassword);

    if (this.formRegister.valid) {
      // Mapear el formulario a LoginRequest
      const userRequest: UserRequest = {}
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
*
* **/

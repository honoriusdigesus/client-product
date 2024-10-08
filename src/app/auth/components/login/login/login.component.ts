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
          error:(error) => {
            console.log('Error en login: ', error);
            this.loginFailed();
          }
        });
    }
    else {
      this.infoIncomplete();
      console.log('Formulario inválido');
    }
  }


  constructor() {
    this.formLogin = this.formBuilder.group({
      email: ['jaramillo@gmail.com', [Validators.required, Validators.email]],
      password: ['Salo1207*', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginFailed(){
    Swal.fire({
      icon: "error",
      title: "Lo sentimos, no se pudo iniciar sesión. Por favor, revise sus credenciales e intente de nuevo.",
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

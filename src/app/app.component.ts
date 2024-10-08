import {computed, effect, inject} from '@angular/core';
import { Component } from '@angular/core';
import {Router, RouterOutlet } from '@angular/router';
import { LoginService } from './auth/components/login/services/login.service';
import {AuthStatus} from "./auth/components/login/interfaces/auth-status.enum";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private loginService = inject(LoginService);
  private router = inject(Router);


  public finishAuthCheck = computed<boolean>(()=>{
    if (this.loginService.authStatus() === AuthStatus.checking) {
      return false;
    }
    return true;
  })

  public loginStatusChangeEffect = effect(()=>{
    switch( this.loginService.authStatus() ) {

      case AuthStatus.checking:
        return;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/product');
        return;

      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  })

}

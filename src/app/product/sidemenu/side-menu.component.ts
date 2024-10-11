import {Component, computed, inject} from '@angular/core';
import {LoginService} from "../../auth/components/login/services/login.service";

@Component({
  selector: 'product-sidemenu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  roles: any[] = [];
  users: any[] = [];
  products: any[] = [];

  private loginService = inject(LoginService);
  public readonly user = computed(() => this.loginService.currentUser());

  onLogout(){
    this.loginService.onLogout();
  }

  constructor() {
  }


}

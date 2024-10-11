import {computed, inject} from '@angular/core';
import { Component } from '@angular/core';
import {LoginService} from "../../../auth/components/login/services/login.service";
import {JsonPipe} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {SideMenuComponent} from "../../sidemenu/side-menu.component";

@Component({
  selector: 'app-product-layout',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink,
    RouterOutlet,
    SideMenuComponent
  ],
  templateUrl: './product-layout.component.html',
  styleUrl: './product-layout.component.css'
})
export class ProductLayoutComponent {
  private loginService = inject(LoginService);
  public user = computed(() => this.loginService.currentUser());



}

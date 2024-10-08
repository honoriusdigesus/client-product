import {computed, inject} from '@angular/core';
import { Component } from '@angular/core';
import {LoginService} from "../../../auth/components/login/services/login.service";
import {JsonPipe} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-product-layout',
  standalone: true,
  imports: [
    JsonPipe,
    RouterLink
  ],
  templateUrl: './product-layout.component.html',
  styleUrl: './product-layout.component.css'
})
export class ProductLayoutComponent {
  private loginService = inject(LoginService);
  public user = computed(() => this.loginService.currentUser());



}

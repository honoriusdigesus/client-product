import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environment/environments";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../interfaces/login-request.interface";
import {Observable} from "rxjs";
import {LoginResponse} from "../interfaces/login-response.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  login(userLogin: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/Api/Login/Auth`, userLogin);
  }

  constructor() { }
}

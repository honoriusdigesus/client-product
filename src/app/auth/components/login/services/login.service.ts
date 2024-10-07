import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../../environment/environments";
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../interfaces/login-request.interface";
import {catchError, Observable, tap, throwError} from "rxjs";
import {LoginResponse} from "../interfaces/login-response.interface";
import {AuthStatus} from '../interfaces/auth-status.enum';
import {UserLoginResponse} from "../interfaces/user-login-response.interface";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<UserLoginResponse | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  login(userLogin: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.baseUrl}/Api/Login/Auth`, userLogin)
      .pipe(
        tap(({user, token}) => {
          this._currentUser.set(user);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', token);
        }),
        //Todo: Errores
        catchError(
          (err) => {
            this._authStatus.set(AuthStatus.notAuthenticated);
            return throwError(()=>err.error.message);
          }
        )
      );
  }

  constructor() { }
}

import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../../environment/environments";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "../interfaces/login-request.interface";
import {catchError, map, Observable, of, tap, throwError} from "rxjs";
import {LoginResponse} from "../interfaces/login-response.interface";
import {AuthStatus} from '../interfaces/auth-status.enum';
import {UserLoginResponse} from "../interfaces/user-login-response.interface";
import {CheckResponse} from "../interfaces/check-response.interface";
import {routes} from "../../../../app.routes";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  private _currentUser = signal<UserLoginResponse | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());



  login(userLogin: LoginRequest): Observable<LoginResponse>{
    const urlAuth = `${this.baseUrl}/Api/Login/Auth`;
    return this.http.post<LoginResponse>(urlAuth, userLogin)
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

  checkAuthStatus(): Observable<boolean>{
    const  urlCheck = `${this.baseUrl}/Api/Login/ValidateToken`;
    const tokenStorage = localStorage.getItem('token');
    if (!tokenStorage) {
      this._authStatus.set(AuthStatus.notAuthenticated);
      return of(false);
    }

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${tokenStorage}`);

    return this.http.post<CheckResponse>(urlCheck,{}, {headers})
      .pipe(
        map((response)=>{
          this._currentUser.set(response);
          this._authStatus.set(AuthStatus.authenticated);
          localStorage.setItem('token', tokenStorage);
          return true
        }),
        catchError(()=>{
          this._authStatus.set(AuthStatus.notAuthenticated);
          return of(false);
        })
      )
  }

  onLogout(){
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    localStorage.removeItem('token');
  }

  constructor() {
    this.checkAuthStatus().subscribe();
  }
}

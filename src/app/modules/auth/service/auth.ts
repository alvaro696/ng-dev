import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  /*  private http;

   constructor(private _http: HttpClient) {
     this.http = _http;
   } */

  private http = inject(HttpClient);
  public register(data:{fullName: string; email: string; password: string; phone: string}) {
    this.http.post('https://reqres.in/api/register', data);
  }
}

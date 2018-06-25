import { throwError,  Observable } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { IUser } from "../model/user";
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlF6QkdSalF5UTBSQ1JEQkNSVFpFTURNeFJUZzVNVEpETWpNMU5EVTBNRFEzUWtKRU9USkdRZyJ9.eyJpc3MiOiJodHRwczovL3Byb3llY3RvYXBwLmF1dGgwLmNvbS8iLCJzdWIiOiJRbXF3UEw1ZnRwekxBOEdsdzkwSkNqOEFTaWVacDQyREBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9wcm95ZWN0b2FwcC5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTUyNjQyOTk2MCwiZXhwIjoxNTI2NTE2MzYwLCJhenAiOiJRbXF3UEw1ZnRwekxBOEdsdzkwSkNqOEFTaWVacDQyRCIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.SEcHIpn3dHxLV_zq_F8YoGExsiiHlamy-BS0f33nmqi68FX3Qh3ACfo_EmfQTSVJwC5uFVg7-O7fSfR_RBTj5K_C2f25MgzAwnHEFgiqp8tr7MysRZw4yBIEeccpTrnBhxd3bFCqWC9WdsOpx5-VlroTRPMNwwZmnTdE-ghQeRMBP4zVCzOJRR5pJcpWGEwWpa8BmJfyIMcuMQgOTw7vdzTk2g1HeN1KGr8d0ZENZJcGeJOb0jwzMFKleN94GMkMcHfTn6wRfz4nzRwOaKo7Wi7uU8vU9V_rL2kxD9UNQ3fHtsRRD5tB2C9PMvLveKG5i8WeaUevwra35qIsIDD8Zw'
  })
};

@Injectable()
export class UserService {
  users: IUser[];
  constructor(
    private _http: HttpClient) { }

  get(): Observable<any> {
    let url="/api/users";
    return this._http.get<any>(url, httpOptions)
      .pipe(
        tap(data => console.log('server data:', data)),
        catchError(this.handleError('get','url'))
      );
  }

  post(model: any): Observable<any> {
    let url="/api/user";
      return this._http.post<any>(url, model, httpOptions)
        .pipe(
          tap(data => console.log('server data:', data)),
          catchError(this.handleError('post','url'))
        );
  }

  put(id: string, model: IUser): Observable<any> {
      let url="/api/user/"+id;
      console.log(url);
      console.log(model);
      delete model._id;
      return this._http.put(url, model, httpOptions)
        .pipe(
          tap(data => console.log('server data:', data)),
          catchError(this.handleError('put','url'))
          );
  }

  delete(id: string): Observable<any> {
    let url="/api/user/"+id;
      return this._http.delete(url,httpOptions)
        .pipe(
          tap(data => console.log('server data:', data)),
          catchError(this.handleError('delete','url'))
        );
  }

  // private handleError(error: HttpResponse<any>) {
  //     console.error(error);
  //     return observableThrowError(error.json().error || 'Server error');
  // }

  private handleError(operation: String, url: String) {
    return (err: any) => {
      let errMsg = `error in ${operation}() retrieving ${url}`;
      console.log(`${errMsg}:`, err)
      if(err instanceof HttpErrorResponse) {
        // you could extract more info about the error if you want, e.g.:
        console.log(`status: ${err.status}, ${err.statusText}`);
        // errMsg = ...
      }
      return Observable.throw(errMsg);
    }
  }



}

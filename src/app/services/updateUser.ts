import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { ChartModel } from 'src/_interfaces/chart.model';
import { UserModel } from 'src/_interfaces/usermodel';

@Injectable({
  providedIn: 'root',
})
export default class UpdateUser {
  constructor(private http: HttpClient) {}

  updateUser = (userName: string) => {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const json = JSON.stringify(userName);

    this.http
      .post(`${environment.apiURL}/api/user/upd`, json, {
        headers: headers,
      })
      .subscribe((data) => {
        console.log('updated ' + data);
      });
  };
}

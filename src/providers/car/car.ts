import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Car } from '../../models/car/car';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type':'application/json' })
}
/*
  Generated class for the CarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CarProvider {

  private url = 'http://10.11.6.111:3000/api/cars';

  constructor(public http: HttpClient) {}

  public getCar(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.url}/${id}`);
  }
  public createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.url, car, httpOptions);
  }
}

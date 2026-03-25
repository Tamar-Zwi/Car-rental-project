import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  url: string = 'http://localhost:53191/api/car';

  constructor(private http: HttpClient) {}

  // פונקציה לשליפת כל הרכבים מהשרת
  getAllCars(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/getallcars'); 
  }
}
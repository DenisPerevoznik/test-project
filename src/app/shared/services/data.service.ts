import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  public loadFile() {
    return this.http.get('assets/house_prices.csv',
      {responseType: 'arraybuffer'})
      .pipe(map((file: any) => new Blob([file], { type: 'application/csv'})));
  }
}

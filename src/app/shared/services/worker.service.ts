import { Injectable } from '@angular/core';
import {interval} from "rxjs";
import {SwUpdate} from "@angular/service-worker";
import * as XLSX from "xlsx";

@Injectable()
export class WorkerService {

  constructor(sw: SwUpdate) {
    interval(3600).subscribe(() => {
      sw.checkForUpdate();
    });

    sw.available.subscribe((event: any) => {
      sw.activateUpdate()
        .then(() => document.location.reload());
    });

    sw.activated.subscribe((ev) => {
      console.log('Previous version: ', ev.previous);
      console.log('Current version: ', ev.current);
    });
  }
}

import { Injectable, EventEmitter } from '@angular/core';
import { LoadingData } from '../../model/loading-model';

@Injectable({
  providedIn: 'root'
})

export class LoadingService {

  loadingFlag: EventEmitter<LoadingData> = new EventEmitter<LoadingData>();

  constructor() { }

  showLoading() {
    this.loadingFlag.emit({
      type: 'SHOW_LOADING'
    });
  }

  hideLoading() {
    this.loadingFlag.emit({
      type: 'HIDE_LOADING'
    });
  }


}

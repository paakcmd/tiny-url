import { Component, OnInit } from '@angular/core';
import { LoadingData } from '../model/loading-model';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.less']
})
export class LoadingComponent implements OnInit {

  loadingData: LoadingData;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.loadingFlag.subscribe((data: LoadingData) => {
      if (data.type !== 'HIDE_LOADING') {
        this.loadingData = data;
      } else {
        this.loadingData = null;
      }
    });
  }

}

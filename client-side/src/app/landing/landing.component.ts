import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading/loading.service';
import { UrlService } from '../services/url/url.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less'],
  animations: [
    trigger('showHideErr', [
      state('showErr', style({
        opacity: 1
      })),
      state('hideErr', style({
        display: 'none',
        opacity: 0
      })),
      transition('showErr => hideErr', [
        animate('1s')
      ]),
      transition('hideErr => showErr', [
        animate('0s')
      ]),
    ]),
    trigger('showHide', [
      state('show', style({
        height: '30px',
        opacity: 1
      })),
      state('hide', style({
        height: '10px',
        opacity: 0
      })),
      transition('show => hide', [
        animate('0.5s')
      ]),
      transition('hide => show', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class LandingComponent implements OnInit {
  url: string = '';
  expire: number;
  result: string = '';
  showErrorBar: boolean = false;
  showExpiration: boolean = false;
  errorText: string = '';

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingService,
    private urlService: UrlService
  ) {

  }

  ngOnInit() {
    this.errorHandler();
  }

  errorHandler() {
    if (this.route.snapshot.queryParamMap.get('msg_key')) {
      const errorMsg = this.route.snapshot.queryParamMap.get('msg_key');
      this.errorText = this.errorMessageLookup(errorMsg);
      this.showError();
    }
  }

  errorMessageLookup(msg_key) {
    const hashTable = {
      invalid_param: 'The shorturl is invalid',
      not_found: 'Cannot find url related to this shortUrl',
      expired: 'The input shorturl is expired',
      invalid_url: 'Invalid URL',
      generic_error: 'Generic error'
    }

    const msg = hashTable[msg_key] || 'Generic error';

    return msg;
  }

  onCopy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.result;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    alert('Copied to the clipboard');
  }

  showError() {
    this.showErrorBar = true;
    setTimeout(()=> {
      this.showErrorBar = false;
    }, 5000)
  }

  setExpiration() {
    this.showExpiration = !this.showExpiration;
  }

  validateUrl(val) {
    return /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm.test(val)
  }

  onSubmit() {
    if (!this.validateUrl(this.url)) {
      this.errorText = this.errorMessageLookup('invalid_url');
      this.showError();
      return
    }



    this.loading.showLoading();
    const expireTime = this.expire && this.showExpiration ?  this.expire : -1;

    this.urlService.generateShortenUrl(this.url, expireTime).subscribe(
      (res: any) => {
        const currentLocation = window.location.origin;
        this.result = `${currentLocation}/${res.data.urlId}`;
        this.loading.hideLoading();
      },
      err => {
        this.loading.hideLoading();
        this.errorText = this.errorMessageLookup(err.error.error.msg_key);
        this.showError();
      }
    )
  }

}

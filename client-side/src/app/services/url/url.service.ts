import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  postUrl = '/api/url/generate';
  getUrl = '/api/url/'
  constructor(private http: HttpClient) { }

  generateShortenUrl(url, expire) {
    return this.http.post(this.postUrl, { url, expire })
  }

  getFullUrl(urlId) {
    const newUrl = this.getUrl + urlId
    return this.http.get(newUrl);
  }
}

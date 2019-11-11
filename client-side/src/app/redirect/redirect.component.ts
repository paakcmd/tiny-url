import { Component, OnInit } from '@angular/core';
import { UrlService } from '../services/url/url.service';
import { LoadingService } from '../services/loading/loading.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.less']
})
export class RedirectComponent implements OnInit {

  constructor(
    private loading: LoadingService,
    private urlService: UrlService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loading.showLoading();
    this.urlService.getFullUrl(id).subscribe(
      (result: any) => {
        let fullUrl = result.data.url;
        if (/http/.test(fullUrl)) {
          window.location.href = fullUrl;
        } else {
          window.location.href = 'http://'.concat(fullUrl);
        }
        this.loading.hideLoading();


      },
      err => {
        this.loading.hideLoading();
        this.router.navigate([''],{
          queryParams: {
            msg_key: err.error.error.msg_key
          }
        })


      }
    )
  }

}

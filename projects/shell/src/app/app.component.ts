import { Component, NgZone } from '@angular/core';
import { AuthLibService } from 'auth-lib';

declare const require: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'shell';
  ngVersion = require('../../../../package.json').dependencies['@angular/core'];

  constructor(private service: AuthLibService, private ngZone: NgZone) {
    // Not necessary anymore, when calling the bootstrap helper with appType: 'shell':
    // shareNgZone(ngZone);
    this.service.login('Max', null);
  }

}


import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { LoadRemoteModuleOptions, loadRemoteModule } from '@angular-architects/module-federation';
import { MicroFrontend } from './microfrontend';
import { take, filter } from 'rxjs/operators';

export type WebComponentWrapperOptions = LoadRemoteModuleOptions & {
    elementName: string;
};

@Component({
  template: '<div #vc></div>',
})
export class WebComponentWrapper implements OnInit, AfterContentInit {

  @ViewChild('vc', { read: ElementRef, static: true })
  vc: ElementRef;

  microFrontend: MicroFrontend | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart),
      take(1),
    ).subscribe(e => {
      this.cleanUp();
    });
  }

  async ngAfterContentInit() {

    const options = this.route.snapshot.data as WebComponentWrapperOptions;
   
    try {
        const element = document.createElement(options.elementName);
        this.vc.nativeElement.appendChild(element);

        this.microFrontend = await loadRemoteModule(options);
        this.microFrontend?.bootstrap();
    }
    catch(error) {
        console.error(error);
    }
  }

  private cleanUp() {
    this.microFrontend?.destroy();
    this.vc.nativeElement.innerHTML = '';
  }

}
import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  ApplicationRef,
  EmbeddedViewRef,
  ElementRef
} from '@angular/core';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private childComponentRef: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  appendComponentTo(child: any, childConfig?: object) {
    this.childComponentRef = this.componentFactoryResolver.resolveComponentFactory(child).create(this.injector);

    // set the inputs for the component programatically
    this.childComponentRef.instance.inputs = childConfig;

    // Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.childComponentRef.hostView);

    // Get DOM element from component
    const childDomElem = (this.childComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Append DOM element to the AppComponent (get it from the Anguar app ref: this.appRef.components[0])
    const appElementRef = this.appRef.components[0].injector.get(ElementRef) as ElementRef;
    appElementRef.nativeElement.appendChild(childDomElem);
  }

  removeComponent() {
    this.appRef.detachView(this.childComponentRef.hostView);
    this.childComponentRef.destroy();
  }
}

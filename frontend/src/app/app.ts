import { Component, signal } from '@angular/core';
import { ProductComponent } from './product/product';
@Component({
selector: 'app-root',
  standalone: true,
  imports: [ProductComponent],
  template: `<app-product></app-product>`
})
export class App {
  protected readonly title = signal('frontend');
}
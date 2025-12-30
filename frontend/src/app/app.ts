import { Component, signal } from '@angular/core';
import { Product } from './product/product';
@Component({
selector: 'app-root',
  standalone: true,
  imports: [Product],
  template: `<app-product></app-product>`
})
export class App {
  protected readonly title = signal('frontend');
}

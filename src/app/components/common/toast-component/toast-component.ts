import { Component, signal } from '@angular/core';
import { ToastService } from '../../../services/toast-service';

@Component({
  selector: 'toast-component',
  imports: [],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css',
})
export class ToastComponent {
  toastMessage = signal<string>('');

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe(message => {
      this.toastMessage.set(message);

    setTimeout(() => this.toastMessage.set(''), 3000);
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loading-overlay" *ngIf="loading$ | async">
      <div class="spinner-container">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Cargando...</span>
        </div>
        <p class="mt-2">Procesando, por favor espere...</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .spinner-container {
      text-align: center;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
  `]
})
export class LoadingSpinnerComponent implements OnInit {
  loading$;

  constructor(private loaderService: LoaderService) {
    this.loading$ = this.loaderService.loading$;
  }

  ngOnInit(): void {}
}

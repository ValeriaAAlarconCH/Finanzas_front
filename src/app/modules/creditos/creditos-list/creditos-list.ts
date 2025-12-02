import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creditos-list',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="container mt-4"><h2>Listado de Créditos</h2></div>`,
})
export class CreditosList {}

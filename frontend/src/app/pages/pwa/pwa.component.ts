import { Component, OnInit, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BaseComponentClass } from '../../core/base-component.class';
import { BackendService } from '../../core/services/backend.service';

@Component({
  selector: 'app-pwa',
  templateUrl: './pwa.component.html',
  styleUrl: './pwa.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PwaComponent extends BaseComponentClass implements OnInit {
  isPwa = signal(false);

  constructor() {
    super(inject(FormBuilder), inject(BackendService));
    this.configForm = this.fb.group({
      database: ['postgresql'],
      cache: [true],
      method: ['gRPC']
    });
  }

  ngOnInit(): void {
    this.checkPwaStatus();
    this.setupOnlineListener();
  }

  private checkPwaStatus(): void {
    // Verifica se está rodando como PWA
    this.isPwa.set(
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
  }

  private setupOnlineListener(): void {
    window.addEventListener('online', () => this.isOnline.set(true));
    window.addEventListener('offline', () => this.isOnline.set(false));
  }
}

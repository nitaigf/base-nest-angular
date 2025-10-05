import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BaseComponentClass } from '../../core/base-component.class';
import { BackendService } from '../../core/services/backend.service';

@Component({
  selector: 'app-ssg',
  templateUrl: './ssg.component.html',
  styleUrl: './ssg.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SsgComponent extends BaseComponentClass {
  constructor() {
    super(inject(FormBuilder), inject(BackendService));
    this.configForm = this.fb.group({
      database: ['postgresql'],
      cache: [true],
      method: ['Microservice']
    });
  }
}

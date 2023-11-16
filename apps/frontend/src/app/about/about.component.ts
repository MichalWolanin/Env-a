import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'env-a-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {}
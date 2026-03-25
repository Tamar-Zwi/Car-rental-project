import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  // מחקנו את CustomerLoginComponent והוספנו את RouterLink
  imports: [RouterOutlet, RouterLink, FormsModule], 
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('cars-app');
}
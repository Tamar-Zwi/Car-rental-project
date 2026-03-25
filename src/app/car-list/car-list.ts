import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarService } from '../services/car';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-list.html',
  styleUrls: ['./car-list.css']
})
export class CarListComponent implements OnInit {
  cars: any[] = []; 
  errorMessage: string = '';
  isLoading: boolean = true; // משתנה שיודע מתי אנחנו עדיין מחכים לשרת

  constructor(
    private carService: CarService, 
    private cdr: ChangeDetectorRef // הזרקנו את מרענן המסך
  ) {}

  ngOnInit() {
    this.carService.getAllCars().subscribe({
      next: (data) => {
        console.log('רכבים מהשרת:', data); // תוכלי לראות בדפדפן (F12) מה בדיוק הגיע
        this.cars = data || []; // במקרה שחזר ריק, נשים מערך ריק
        this.isLoading = false; // סיימנו לטעון!
        this.cdr.detectChanges(); // פקודה למסך להתרענן
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'שגיאה בשליפת רכבים מהשרת. ודא שהשרת (C#) פועל.';
        this.isLoading = false; // סיימנו לטעון (אבל עם שגיאה)
        this.cdr.detectChanges(); // פקודה למסך להתרענן
      }
    });
  }
}
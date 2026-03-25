import { Component, ChangeDetectorRef } from '@angular/core';
import { CustomerService, Customer } from '../services/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // הוספנו את Router לכאן

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './customer-login.html',
  styleUrls: ['./customer-login.css']
})
export class CustomerLoginComponent {
  customerId: number | null = null;
  customer: Customer | null = null;
  error: string | null = null;

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
    private router: Router // הזרקנו את הראוטר כדי שנוכל לנווט איתו
  ) {}

  onLogin() {
    this.error = null;
    this.customer = null;
    
    const id = Number(this.customerId);
    if (!id || isNaN(id)) {
      this.error = 'יש להזין מספר לקוח תקין';
      return;
    }

    this.customerService.getCustomerById(id).subscribe({
      next: (result: any) => {
        // הוספתי הדפסה לקונסול כדי שנוכל לראות מה השרת באמת החזיר
        console.log('תשובת השרת:', result); 

        // בדיקה גמישה יותר: אם חזר משהו, ויש לו שם פרטי או מזהה
        if (result && (result.firstName || result.Id || result.id)) {
          // הלקוח קיים במערכת!
          this.customer = result;
          this.error = null;
          this.cdr.detectChanges();
        } else {
          // הלקוח לא קיים
          this.customer = null;
          this.error = 'לקוח לא נמצא, מעביר מיד לעמוד הרשמה...';
          this.cdr.detectChanges(); 
          
          setTimeout(() => {
            this.router.navigate(['/register']);
          }, 1500);
        }
      },
      error: () => {
        // הלקוח לא קיים (במקרה שהשרת זרק שגיאה)
        this.customer = null;
        this.error = 'לקוח לא נמצא, מעביר מיד לעמוד הרשמה...';
        this.cdr.detectChanges(); 
        
        setTimeout(() => {
          this.router.navigate(['/register']);
        }, 1500);
      }
    });
  }
}
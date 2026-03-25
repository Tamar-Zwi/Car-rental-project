import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService, Customer } from '../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [CommonModule, FormsModule], // ייבוא מודולים לשימוש בטפסים ותנאים
  templateUrl: './register-customer.html',
  styleUrls: ['./register-customer.css']
})
export class RegisterCustomerComponent {
  // יצירת אובייקט ריק של לקוח לפי המודל שיש לך בסרוויס
  newCustomer: Customer = {
    Id: 0,
    firstName: '',
    lastName: '',
    codeCity: 1, // שמתי 1 כברירת מחדל
    email: '',
    numRents: 0,
    codePayment: 1, // שמתי 1 כברירת מחדל
    address: '',
    City: null,
    Payment: null
  };

  message: string = '';
  isSuccess: boolean = false;

  constructor(private customerService: CustomerService, private router: Router) {}

  onRegister() {
    // קריאה לפונקציה שכבר כתבת בסרוויס
    this.customerService.insertNewCustomer(this.newCustomer).subscribe({
      next: (response) => {
        this.isSuccess = true;
        this.message = 'הלקוח נרשם בהצלחה! מיד תועבר להתחברות...';
        
        // המתנה של 2 שניות ואז מעבר אוטומטי לדף ההתחברות
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.isSuccess = false;
        this.message = 'הייתה שגיאה בהרשמה. אנא נסה שנית.';
        console.error(err);
      }
    });
  }
}
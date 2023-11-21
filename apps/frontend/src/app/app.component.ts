import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserService } from './services/user.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'env-a-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Env-a';
  userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    const user = this.userService.getUserFromStorage();
    
    if (!user) {
      const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
      const randomName = `user_${randomNumber}`
      this.userService.createUser(randomName)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(user => {
          this.userService.saveUserToStorage(user);
        });
    }; 
  };
};

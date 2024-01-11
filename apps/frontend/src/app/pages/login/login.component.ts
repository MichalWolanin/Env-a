import { Component, inject } from '@angular/core';
import { Auth, idToken, signInWithPopup } from "@angular/fire/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'env-a-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private auth: Auth = inject(Auth);
  idToken$ = idToken(this.auth);

  constructor() {
    this.idToken$.subscribe((token: string | null) => {
      console.log(token);
    })
  }

  onLoginButtonClock(): void {
      signInWithPopup(this.auth, new GoogleAuthProvider()).then();
  }
}


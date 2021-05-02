import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authState: boolean;

  constructor(private readonly authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((state) => this.authState = state);
  }
}

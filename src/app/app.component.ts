import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ingresoegresoapp';
  ngOnInit() {
    this.authService.initAuthListener();
  }

  constructor(public authService: AuthService) {}
}

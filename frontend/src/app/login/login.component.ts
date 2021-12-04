import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../services/user.service";
import {UserAuthService} from "../services/user-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private _isAuthSuccessful: boolean = true;
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this._isAuthSuccessful = false;
        console.log(error);
      }
    );
  }

  get isAuthSuccessful(): boolean {
    return this._isAuthSuccessful;
  }
}

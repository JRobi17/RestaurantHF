import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {Role} from "../classes/role";
import {User} from "../classes/user";

@Component({
  selector: 'app-create-new-employee',
  templateUrl: './create-new-employee.component.html',
  styleUrls: ['./create-new-employee.component.css']
})
export class CreateNewEmployeeComponent implements OnInit {

  selectedValue!: string
  user: User = new User()
  role: Role = new Role()
  roles!: Role[]
  error: string = ""

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(data => {
      this.roles = data;
    })
  }

  onSubmit() {
    this.role.roleName = this.selectedValue
    this.user.role = this.role
    if (!this.user.userName || !this.user.userFirstName || !this.user.userLastName || !this.user.role) {
      this.error = "Minden adat kitöltése kötelező!"
    } else {
      this.userService.registerNewUser(this.user).subscribe(data => {
        if (data === "Sikeres regisztráció") {
          this.router.navigate(['/employee']);
        } else {
          this.error = data
        }
      })
    }
  }
}

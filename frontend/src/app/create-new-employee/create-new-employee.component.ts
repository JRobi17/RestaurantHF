import {Component, OnInit} from '@angular/core';
import {User} from "../classes/user";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {Role} from "../classes/role";

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

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getAllRoles().subscribe(data => {
      this.roles = data;
    })
  }

  onSubmit() {
    this.role.roleName = this.selectedValue
    this.user.role.add(this.role)
    this.userService.registerNewUser(this.user).subscribe(() => {
      this.router.navigate(['/employee']);
    })

  }
}

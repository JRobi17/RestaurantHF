import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../classes/user";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  users!: User[]
  currentIndex = -1;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })
  }

  deleteUser(userName: string) {
    this.userService.deleteUser(userName).subscribe(data => {
      this.getUsers();
    })
  }
}

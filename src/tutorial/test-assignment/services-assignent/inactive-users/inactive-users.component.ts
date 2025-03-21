import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsersService} from "../users.service";

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit{
  @Output() userSetToActive = new EventEmitter<number>();
  users: string[] = [];

  constructor(private usersService: UsersService) {
  }

  onSetToActive(id: number) {
    this.usersService.setToActive(id);
  }

  ngOnInit(): void {
    this.users = this.usersService.inactiveUsers;
  }
}

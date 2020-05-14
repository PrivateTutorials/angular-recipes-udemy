import {Component, OnInit} from '@angular/core';
import {AccountsService} from "./shared/accounts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.compon.html',
  styleUrls: ['./app.compon.css'],
  // providers: [AccountsService]
})
export class AppCompon implements OnInit{
  accounts: {name: string, status: string}[] = [];

  constructor(private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.accounts = this.accountsService.accounts;
  }
}

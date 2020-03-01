import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {Role} from '../models/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	currentUser: any;
  constructor(private router: Router, private authenticationService: AuthenticationService) { 

   this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
  }

logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }    
    
}

import { Component, ViewChild, OnInit } from '@angular/core';
import {CrudService} from "../services/crud.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

public users: any = []; //declare variable as array

constructor(private crudService: CrudService) { }

ngOnInit() {
	this.getUserDetails();
}

getUserDetails(){
	this.crudService.fetchUserList().subscribe(data =>{
      this.users = data;
      console.log(this.users);
    })
}

deleteRow(id){
	this.crudService.deleteUser(id).subscribe(data =>{
		console.log(data);
      this.getUserDetails();
    })

}
 

}

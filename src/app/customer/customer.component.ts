import { Component, ViewChild, OnInit } from '@angular/core';
import {CrudService} from "../services/crud.service";
import { AlertService } from '../alert//alert.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

public users: any = []; //declare variable as array

options = {
        autoClose: true,
        keepAfterRouteChange: false
    };

constructor(private crudService: CrudService, protected alertService: AlertService) { }

ngOnInit() {
  
  

  this.getUserDetails();
}

getUserDetails(){
	this.crudService.fetchUserList().subscribe(data =>{
      this.users = data;
      //console.log(this.users);
      
    })
}

deleteRow(id){
	this.crudService.deleteUser(id).subscribe(data =>{
		//console.log(data);
      this.getUserDetails();
    })

}
 

}

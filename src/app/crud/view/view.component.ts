import { Component, OnInit } from '@angular/core';
import {CrudService} from "../../services/crud.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

	public employees: any = []; //declare variable as array
	
  constructor(private crudService: CrudService, private router: Router) { }

  ngOnInit() {
  	this.getEmployee();
  }

  getEmployee() {
    this.crudService.getProducts().subscribe(data => {
      console.log(data);
      this.employees = data;
    });
  }
deleteRow(id){
//alert(id);
if(window.confirm('Are sure you want to delete this item ?')){
this.crudService.deleteProduct(id).subscribe(data => {
      //console.log(data);
      this.getEmployee();
      
    });
  }
}


}

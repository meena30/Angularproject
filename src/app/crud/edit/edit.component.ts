import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {CrudService} from "../../services/crud.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

editForm: FormGroup;
  showMsg: boolean = false;
  editID: any;

  constructor(private fb: FormBuilder,private crudService: CrudService,private router: Router,private actRoute: ActivatedRoute) { }

  ngOnInit() {

  	this.editForm = this.fb.group({
      id: [],
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required]
    });

  	this.editID = this.actRoute.snapshot.params['id'];
  	console.log(this.editID);
  	this.crudService.editProduct(this.editID)
      .subscribe( data => {
      	//console.log(data);
		this.editForm.controls['name'].setValue(data['p_name']);
      	this.editForm.controls['desc'].setValue(data['p_description']);
      	this.editForm.controls['price'].setValue(data['p_price']);
        
      });
  }



updateProduct(values){
    const updateData = new FormData();
    updateData.append('id', this.editID);
    updateData.append('name', values.name);
    updateData.append('description', values.desc);
    updateData.append('price', values.price);
    this.crudService.updateProduct(updateData).subscribe(result => {
      this.router.navigate(['view']);
      //this.editForm.reset();
      //this.showMsg= true;
    });
  }


}

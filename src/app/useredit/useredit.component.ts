import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {CrudService} from "../services/crud.service";

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {

  editForm: FormGroup;
  submitted = false;
  
  editID: any;

  constructor(private formBuilder: FormBuilder,private crudService: CrudService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

  		this.editID = this.route.snapshot.params['id'];

  		this.editForm = this.formBuilder.group({
  			firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
            
         });

  		this.editUser(this.editID);

  }

  editUser(id){
  	//console.log(id);

  	this.crudService.editUserData(id).subscribe(data => {
    	//console.log(data);
    	this.editForm.setValue({
	      firstName: data.FirstName,
	      lastName: data.LastName,
	      email: data.Email,
	      password:''
	    });
  	});

  }

onSubmit() {
          this.submitted = true;
		// stop here if form is invalid
          if (this.editForm.invalid) {
            return;
          }
		this.updateUser(this.editForm.value);
    }      

updateUser(value){
	
	//console.log(value);
	
	var formData = new FormData(); // Currently empty
    formData.append('id', this.editID);
    formData.append('fname', value.firstName);
    formData.append('lname', value.lastName);
    formData.append('email', value.email);
    formData.append('password', value.password);
	
	this.crudService.updateUserData(formData).subscribe(data => {
		//console.log(data);
		this.router.navigate(['customer']);
	});

}


}

import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {CrudService} from "../services/crud.service";

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

	registerForm: FormGroup;
    submitted = false;
    

  constructor(private formBuilder: FormBuilder,private crudService: CrudService) { }

  ngOnInit() {
  	this.registerForm = this.formBuilder.group({
  			//title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            acceptTerms: [false, Validators.requiredTrue]
         });
	}

// convenience getter for easy access to form fields
    get f() { 
    return this.registerForm.controls; 

    }

msg: string = null;
showMsg: boolean = false;

onSubmit() {
          this.submitted = true;

          // stop here if form is invalid
          if (this.registerForm.invalid) {
            return;
          }
          

        //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))

        console.log(this.registerForm.value);

      this.crudService.createCustomer(this.registerForm.value).subscribe(result => {

         console.log("user created, ", result);
         console.log(result.fname);
         
         this.msg= result.fname;
         this.showMsg= true;
         this.registerForm.reset();
      
    });

    }
onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }


}

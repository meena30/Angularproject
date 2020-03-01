import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {Role} from '../models/role';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) { 

  	 // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }

  }

  ngOnInit() {

  	this.loginForm = this.formBuilder.group({
  			email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });

      // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    }

	
onSubmit() {
          this.submitted = true;

          // stop here if form is invalid
          if (this.loginForm.invalid) {
            return;
          }
          
		//alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value))

		this.authenticationService.login(this.loginForm.value).subscribe((result:any) => {

        //this.router.navigate([this.returnUrl]);

        if(result.role == Role.Admin){
            this.router.navigate(['dashboard']);
        }
        else{
          this.router.navigate(['/']);
        }
		});
}	


}

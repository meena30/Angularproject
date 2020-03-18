import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {FormGroup,FormControl,FormArray,FormBuilder,Validators} from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
	userDetails : any;
	fileData: File = null;
  previewUrl:any = null;
	fileUploadProgress: string = null;
	uploadedFilePath: string = null;

  profileForm: FormGroup;
  submitted = false;
  uploadResponse;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  minDate: Date;
  maxDate: Date;
  bsValue = new Date();

resultText=[];  
 values:string;  
 count:number=0;  
 errorMsg:string;
 isChecked = false;

 lstBranch : Array<any> = [
    { id:1, name: 'Pear', value: 'pear' },
    { id:2, name: 'Plum', value: 'plum' },
    { id:3, name: 'Kiwi', value: 'kiwi' },
    { id:4, name: 'Apple', value: 'apple' },
    { id:5, name: 'Lime', value: 'lime' }
  ];

  constructor(private formBuilder: FormBuilder,private router: Router, private authenticationService: AuthenticationService, private http: HttpClient) { 

  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  //console.log(localStorage.getItem('currentUser'));
  //this.userDetails = JSON.parse(localStorage.getItem('currentUser'));
  //console.log(this.userDetails.email);

  this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate());

}

ngOnInit() {
  this.profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required], // validation
    //gender: ['male', [Validators.required]], // default selected value
    dob: ['', Validators.required]
    
  });

  //console.log(this.authenticationService.meena)
  //console.log(this.currentUser);

  //this.form = this.formBuilder.group({
      //avatar: ['']
    //});

    this.getProfileDetails(this.currentUser.id);

  }

getProfileDetails(id){
  this.authenticationService.profileList(id).subscribe(
      (res) => {
        this.uploadResponse = res;
        this.previewUrl =''; // empty the preview image
        
      },
      (err) => {  
        console.log(err);
      }
    );

}

onFileSelect(event) {
    if (event.target.files.length > 0) {
      //const file = event.target.files[0];
      //this.form.get('avatar').setValue(file);

      this.fileData = event.target.files[0];
      console.log(this.fileData);
      this.preview();
    }
  }

preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
  }

fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}

imageLoaded() { 
// show cropper 
}
cropperReady() {
        // cropper ready
    }
loadImageFailed() {
        // show message
    }

onClick(){
    const formData = new FormData();
    
    formData.append('avatar', this.fileData); // simple image upload
    //formData.append('file', this.croppedImage); // cropped image call 

    //console.log(this.croppedImage);
    
    this.authenticationService.uploadFile(formData).subscribe(
      (res) => {
        //this.uploadResponse = res;
        //this.previewUrl =''; // empty the preview image
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
}

onChange(branchNamae:string,event) {  
  this.errorMsg="";  
   const checked = event.target.checked;  
  
    if (checked) {  
      this.resultText.push(branchNamae);  
      //alert(this.resultText);
     
       } else {  
         const index = this.resultText.indexOf(branchNamae);  
         this.resultText.splice(index, 1);  
     }  
     this.values=this.resultText.toString();  
     const count=this.resultText.length;  
     this.count=count;  
  }  

onSubmit() {
  this.submitted = true;
  const count=this.resultText.length;  
  
  if(count == 0)  
  {  
    this.isChecked = false;
    this.errorMsg="Select at least one branch";  
  }
  else  
  {  
    this.count=count;
    this.isChecked = true;  
  }   
  
  // stop here if form is invalid
  if (this.profileForm.invalid || this.isChecked === false) {
   return;
  }

  var formData: any = new FormData();
  formData.append("fname", this.profileForm.get('firstName').value);
  formData.append("lname", this.profileForm.get('lastName').value);
  formData.append("gender", this.profileForm.get('gender').value);
  formData.append("dob", this.profileForm.get('dob').value);
  formData.append("branch", this.resultText);

var formField = {
    firstName : this.profileForm.get('firstName').value,
    lastName  : this.profileForm.get('lastName').value,
    gender     : this.profileForm.get('gender').value,
    dob  : this.profileForm.get('dob').value,
    branch : this.resultText
  };

  console.log(formField);

  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileForm.value))
  //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.resultText))
}

  

}

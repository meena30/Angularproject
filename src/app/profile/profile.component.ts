import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
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

  form: FormGroup;
  uploadResponse;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(private formBuilder: FormBuilder,private router: Router, private authenticationService: AuthenticationService, private http: HttpClient) { 

  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  //console.log(localStorage.getItem('currentUser'));
  //this.userDetails = JSON.parse(localStorage.getItem('currentUser'));
  //console.log(this.userDetails.email);

}

ngOnInit() {
  //console.log(this.authenticationService.meena)
  //console.log(this.currentUser.id);

  this.form = this.formBuilder.group({
      avatar: ['']
    });

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

    console.log(this.croppedImage);
    
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


onSubmit() {}

  

}

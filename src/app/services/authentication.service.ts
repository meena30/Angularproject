import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

public url = 'http://localhost/web_api/';

 private currentUserSubject: BehaviorSubject<any>;
 public currentUser: Observable<any>;
public meena :any = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private http: HttpClient) { 
  	this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
}

public get currentUserValue(){
    return this.currentUserSubject.value;
  }


profileList(id){
  return this.http.get(this.url+ 'upload.php?id=' + id);
}

login(data) {
        return this.http.post<any>(this.url + 'login.php', data)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                
                return user;
            }));
}

uploadFile(data){
  return this.http.post<any>(this.url + 'upload.php', data);
}

  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    


}

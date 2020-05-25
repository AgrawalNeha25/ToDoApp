import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'

interface TokenObj{
  token: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  registerMode = false;
  error_occurred = false;
  error_msg;

  authForm = new FormGroup(
    {
      username: new FormControl(''),
      password: new FormControl('')
    }
  )

  constructor(private apiService: ApiService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token')
    if ( mrToken ){
      this.router.navigate(['/tasks'])
    }
    
  }

  saveForm(){
    if ( !this.registerMode ) {
      this.loginUser()
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        result => {
          this.loginUser()
        },
        error => {console.log(error),
        this.errorHandler(error)}
      )
    }
  }

  loginUser(){
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result:TokenObj) => {
        this.cookieService.set('mr-token', result.token)
        this.router.navigate(['/tasks'])
      },
      error => {console.log(error),
      this.errorHandler(error)}
    )
  }

  errorHandler(error){
    this.error_occurred = true;
    this.error_msg = error.error;
  }
  
  AlertClosed(){
    this.error_occurred = false;
  }

}

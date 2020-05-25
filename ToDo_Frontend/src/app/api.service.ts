import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://127.0.0.1:8000/";
  authUrl = "http://127.0.0.1:8000/auth/"
  registerUrl = "http://127.0.0.1:8000/api/users/"

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(private httpclient: HttpClient, private cookieService: CookieService) { }

  getAllTasks(){
    return this.httpclient.get(`${this.baseUrl}api/tasks/`, {headers: this.getAuthHeaders()});
  }

  deleteTask(id: number){
    return this.httpclient.delete(`${this.baseUrl}api/tasks/${id}/`,{headers: this.getAuthHeaders()})
  }

  addTask(name:string, status:boolean, start_time:Date, end_time:Date){
    const body = JSON.stringify({name,status,start_time,end_time})
    return this.httpclient.post(`${this.baseUrl}api/tasks/`,body,{headers:this.getAuthHeaders()})
  }

  updateTask(name:string,status:boolean,start_time:Date,end_time:Date,id:number){
    const body = JSON.stringify({name,status,start_time,end_time})
    return this.httpclient.put(`${this.baseUrl}api/tasks/${id}/`,body,{headers:this.getAuthHeaders()})  
  }

  loginUser(authData){
    const body = JSON.stringify({username:authData.username, password:authData.password});
    return this.httpclient.post(this.authUrl,body,{headers:this.headers})
  }

  registerUser(authData){
    const body = JSON.stringify({username:authData.username, password:authData.password});
    return this.httpclient.post(this.registerUrl,body,{headers:this.headers})
  }

  getAuthHeaders(){
    const token = this.cookieService.get('mr-token')
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    })
  }

}

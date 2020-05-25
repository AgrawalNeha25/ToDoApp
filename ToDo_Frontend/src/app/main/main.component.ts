import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Task } from '../modals/task'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tasks:Task[] = [];
  selectedTask = null;
  editTask = null;
  error_occurred = false;
  error_msg:string;
  dateTime : Date = new Date();


  constructor(private apiservice: ApiService,private cookieService: CookieService, private router: Router, 
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.apiservice.getAllTasks().subscribe(
      (result: Task[]) => {this.tasks = result},
      error => console.log(error)
    )

    setInterval(() => {
      const date = new Date();
      this.updateDate(date);
    }, 1000);

    setInterval(() => {
      this.alertTask();
    }, 60000);
  }

  updateDate(date){
    this.dateTime = date;
  }

  alertTask(){
    for (var task of this.tasks){
      const task_start_time = new Date(task.start_time)
      const task_time_remaining = Math.ceil((task_start_time.getTime() - this.dateTime.getTime())/60000)
      if (task_time_remaining <= 5 && task_time_remaining > 0){
        this.toastr.info(`${task_time_remaining} minutes has been remaining to start the task ${task.name}`)
      }
    }
  }
  
  logoutUser(){
    this.cookieService.delete('mr-token')
    this.router.navigate(['/auth'])
  }

  taskSelected(task){
    this.selectedTask = task;
    this.editTask = null;
  }

  taskEdited(task){
    this.editTask = task;
    this.selectedTask = null;
  }

  taskAdded(){
    this.editTask = {name:'', status:'', start_time:'', end_time:''};
    this.selectedTask = null;
  }

  taskDeleted(task:Task){
    this.apiservice.deleteTask(task.id).subscribe(
      result => {
        this.tasks = this.tasks.filter(tsk => tsk.id !== task.id )
        this.toastr.success("Task has been deleted successfully")
      },
      error => console.log(error)
    )
  }

  createdTask(task:Task){
    this.tasks.push(task)
    this.toastr.success("Task has been added successfully")
    this.editTask = null;
  }

  taskUpdated(task:Task){
    this.apiservice.updateTask(task.name,task.status, task.start_time, task.end_time, task.id).subscribe(
      result => {
        const indx = this.tasks.findIndex(tsk => tsk.id == task.id)
        if ( indx >= 0){
          this.tasks[indx] = task;
          this.toastr.success("Task has been updated successfully")
        }
        this.editTask = null;
      },
      error => {
        console.log("error is", error)
        this.errorHandler(error)
      }
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

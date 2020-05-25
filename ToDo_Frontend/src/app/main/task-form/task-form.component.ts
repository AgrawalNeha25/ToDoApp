import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm;
  id = null;
  status = null;

  @Output() createdTask = new EventEmitter()
  @Output() updatedTask = new EventEmitter()
  @Output() generatedError = new EventEmitter()

  @Input() set task(val){
    this.id = val.id;
    this.status = val.status;
    this.taskForm = new FormGroup({
      name: new FormControl(val.name),
      startTime: new FormControl(val.startTime),
      endTime: new FormControl(val.endTime)
    })
  };

  constructor(private apiservice: ApiService) { }

  ngOnInit(): void {
  }

  saveForm(){
    if (this.id){
      const task = {id: this.id, name: this.taskForm.value.name,
                    status: this.status, start_time: this.taskForm.value.startTime,
                    end_time: this.taskForm.value.endTime}
      this.updatedTask.emit(task)
    } else {
    this.apiservice.addTask(this.taskForm.value.name,false,this.taskForm.value.startTime,this.taskForm.value.endTime).subscribe(
    result => this.createdTask.emit(result),
    error => {
      console.log(error)
      this.generatedError.emit(error)
    }
    )
  } 
  }
}

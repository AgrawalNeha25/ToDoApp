import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  closeResult = '';

  @Input() tasks:any = [];
  @Output() selectTask = new EventEmitter();
  @Output() editedTask = new EventEmitter();
  @Output() addedTask = new EventEmitter();
  @Output() deleted_task = new EventEmitter();
  @Output() statusChangedTask = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
  }

  taskClicked(task){
    this.selectTask.emit(task)
  }

  editTask(task){
    this.editedTask.emit(task)
  }

  addTask(){
    this.addedTask.emit()
  }

  deleteTask(task,modal){
    this.deleted_task.emit(task)
    modal.close('Save click')
  }

  taskStatusChanged(task){
    const current_status = task.status
    task.status = (! current_status)
    this.statusChangedTask.emit(task)
  }

}

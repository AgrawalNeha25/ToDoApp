import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ApiService } from '../api.service';

import { MainComponent } from './main.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskFormComponent } from './task-form/task-form.component';

const routes: Routes = [
  {path:'tasks',component:MainComponent}
];

@NgModule({
  declarations: [MainComponent, TaskListComponent, TaskDetailsComponent, TaskFormComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [ApiService]
})
export class MainModule { }

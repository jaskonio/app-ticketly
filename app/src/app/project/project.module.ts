import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ProjectService } from './services/projects.service';
import { ProjectRoutingModule } from './project-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProjectsListComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    SharedModule
  ],
  providers: [
    ProjectService
  ]
})
export class ProjectModule { }

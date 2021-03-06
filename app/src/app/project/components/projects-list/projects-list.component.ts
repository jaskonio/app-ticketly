import { Component } from '@angular/core';
import { ProjectService } from '../../services/projects.service';
import { Project } from '../../model/projects';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  objectComponent = new Project();
  titleDialog = 'New Proyect';

  constructor(
    public projectService: ProjectService
    ) {
    }
}

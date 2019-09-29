import { Component } from '@angular/core';
import { ProjectService } from '../../services/projects.service';
import { Project } from '../../model/projects';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {
  displayedColumns: string[] = ['name', 'actions'];
  objectComponent = new Project();

  constructor(
    public projectService: ProjectService
    ) {
    }
}

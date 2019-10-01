import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app-ticketly';
  navListOptions = [
    {
      text: 'Index',
      routerLink : '/',
      iconName: 'home'
    },
    {
      text: 'Categories',
      routerLink : '/categories',
      iconName: 'android'
    },
    {
      text: 'Projects',
      routerLink : '/projects',
      iconName: 'view_agenda'
    },
  ];

  toolbarOptions = [
    {
      text: 'Categories',
      routerLink : '/categories',
      iconName: 'android'
    },
    {
      text: 'Projects',
      routerLink : '/projects',
      iconName: 'view_agenda'
    },
  ];
}

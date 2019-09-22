import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../model/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Output() update = new EventEmitter<Category>();
  @Output() delete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  updateCategory() {
    this.update.emit(this.category);
  }

  deleteCategory() {
    console.log('Remove: ' + this.category.id);
    this.delete.emit(this.category.id);
  }
}

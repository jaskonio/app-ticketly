import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../model/responseApi';

@Injectable()
export class CategoryService {

  private urlHost: string;
  constructor(
    private http: HttpClient
    ) {
      this.urlHost = 'http://raspberry:32772/api';
    }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>( this.urlHost + '/category');
  }

  add(newCategory: Category){
    console.log('Add Category', newCategory);
    return this.http.post<ResponseApi>( this.urlHost + '/category', newCategory);
  }

  delete(id: number) {
    console.log('remove Category', id);
    return this.http.delete<ResponseApi>( this.urlHost + '/category/' + id);
  }

  update(category: Category) {
    console.log('Update Category', category);
    return this.http.patch<ResponseApi>( this.urlHost + '/category/' + category.id, category);
  }
}

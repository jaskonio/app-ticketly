import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../../shared/model/responseApi';
import { environment } from 'src/environments/environment';
import { ModelBase } from '../model/modelBase';

@Injectable()
export class ServiceBase {

  public urlHost: string;

  constructor(
    private http: HttpClient,
    private table: string
    ) {
      this.urlHost = environment.baseUrl;
    }

  getAll(): Observable<any[]> {
    console.log('GetAll');
    return this.http.get<any[]>( this.urlHost + this.table);
  }

  add(item: any) {
    console.log('Add', item);
    return this.http.post<ResponseApi>( this.urlHost + this.table, item);
  }

  delete(id: number) {
    console.log('Remove', id);
    return this.http.delete<ResponseApi>( this.urlHost + this.table + '\\' + id);
  }

  update(item: any) {
    console.log('Update', item);
    return this.http.patch<ResponseApi>( this.urlHost + this.table + '\\' + item.id, item);
  }
}

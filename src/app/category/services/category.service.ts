import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBase } from 'src/app/shared/service/serviceBase';

@Injectable()
export class CategoryService extends ServiceBase {

  constructor(
    private webClient: HttpClient
    ) {
    super(webClient, '/category');
    }
}

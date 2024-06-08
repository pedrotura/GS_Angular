import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OceanData } from '../interfaces/oceanData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FilterService {

  private oceanDataUrl = 'https://fiap-3sis-gs-20241.azurewebsites.net/OceanData?pagina=1&qtde=20';

  constructor(private http: HttpClient) { }

  listar():Observable<OceanData[]> {
    return this.http.get<OceanData[]>(this.oceanDataUrl) as Observable<OceanData[]>;
  }

}

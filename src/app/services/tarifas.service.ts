import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Tarifa from '../models/tarifa.model';

@Injectable({
  providedIn: 'root'
})
export class TarifasService {
  private urlbase = 'http://localhost:5201/tarifas/';
  constructor(public httpClient: HttpClient) {}


  public editar(tarifa: Tarifa) {
    return this.httpClient.put<Tarifa>(this.urlbase + 'editar', tarifa);
  }
  public obterValores() {
    return this.httpClient.get<Tarifa>(this.urlbase + 'obterValores');
  }

}

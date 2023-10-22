import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pessoa from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private urlbase = 'http://localhost:5201/pessoa/';
  constructor(public httpClient: HttpClient) {}

  public adicionar(pessoa: Pessoa) {
    return this.httpClient.post<Pessoa>(this.urlbase + 'adicionar', pessoa);
  }
  public atualizar(pessoa: Pessoa) {
    return this.httpClient.put<Pessoa>(this.urlbase + 'atualizar', pessoa);
  }
  public excluir(id: number) {
    return this.httpClient.delete<any>(this.urlbase + 'excluir/' + id);
  }
  public obterPorId(id: number) {
    return this.httpClient.get<Pessoa>(this.urlbase + 'obterporid/' + id);
  }
  public obterTodos() {
    return this.httpClient.get<Pessoa[]>(this.urlbase + 'obter');
  }
  public buscarcep(cep: string) {
    return this.httpClient.get<any>(this.urlbase + 'buscacep/' + cep);
  }
}

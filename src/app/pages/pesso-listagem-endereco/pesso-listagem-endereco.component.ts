import { Component, OnInit } from '@angular/core';
import Pessoa from 'src/app/models/pessoa.model';
import { AlertService } from 'src/app/services/alert.service';
import { PessoaService } from 'src/app/services/pessoa.service';

@Component({
  selector: 'app-pesso-listagem-endereco',
  templateUrl: './pesso-listagem-endereco.component.html',
  styleUrls: ['./pesso-listagem-endereco.component.css'],
})
export class PessoListagemEnderecoComponent implements OnInit {
  public listaPessoas: Pessoa[] = [];
  constructor(
    public pessoaService: PessoaService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    document.title = 'Lista de Pessoas';
    this.obterPessoasApi();
  }
  public obterPessoasApi() {
    this.pessoaService.obterTodos().subscribe((resposta) => {
      if (resposta != null) {
        this.listaPessoas = resposta;
      } else {
        this.alertService.showToastrError('Erro na API');
      }
    }, exception => {
      let mensagemErro = typeof(exception?.error) == "string" ? exception?.error : '';
      this.alertService.showToastrError('Erro na requisição', mensagemErro);
    });
  }
  public confirmarExcluir(id: number) {
    this.alertService.alertConfirm({
      title: 'Atenção',
      text: 'Você deseja realmente excluir o registro?',
      confirmButtonText: 'Sim',
      confirmButtonColor: 'green',
      showCancelButton: true,
      cancelButtonText: 'Não',
      cancelButtonColor: 'red',
      fn: () => {
        this.chamarApiParaExcluir(id);
      },
      fnCancel: () => {
        this.alertService.showToastrInfo('Operação cancelada!');
      },
    });
  }

  private chamarApiParaExcluir(id: number) {
    this.pessoaService.excluir(id).subscribe((resposta) => {
      this.alertService.showToastrSuccess('A pessoa foi excluida');
      this.obterPessoasApi();
    }, exception => {
      let mensagemErro = typeof(exception?.error) == "string" ? exception?.error : '';
      this.alertService.showToastrError('Erro na requisição', mensagemErro);
    });
  }
}

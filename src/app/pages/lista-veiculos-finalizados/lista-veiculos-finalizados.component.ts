import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import Veiculo from 'src/app/models/veiculo.model';
import { AlertService } from 'src/app/services/alert.service';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-lista-veiculos-finalizados',
  templateUrl: './lista-veiculos-finalizados.component.html',
  styleUrls: ['./lista-veiculos-finalizados.component.css'],
})
export class ListaVeiculosFinalizadosComponent implements OnInit {
  @Input() recarregarItensTabela: Subject<any> = null;

  public listafinalizados: Veiculo[] = [];

  constructor(
    public veiculoService: VeiculosService,
    public alertService: AlertService
  ) {}
  public ngOnInit(): void {
    document.title = 'Veiculos Finalizados';
    this.obterVeiculosFinalizadosDaApi();

    if (this.recarregarItensTabela != null) {
      this.recarregarItensTabela.subscribe(
        (resposta) => {
          this.obterVeiculosFinalizadosDaApi();
        },
        (exception) => {
          let mensagemErro =
            typeof exception?.error == 'string' ? exception?.error : '';
          this.alertService.showToastrError('Erro na requisição', mensagemErro);
        }
      );
    }
  }
  public obterVeiculosFinalizadosDaApi() {
    this.veiculoService.obterTodosQueJaSairam().subscribe(
      (resposta) => {
        if (resposta != null) {
          this.listafinalizados = resposta;
        } else {
          this.alertService.showToastrError('Erro na API');
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
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
    this.veiculoService.excluir(id).subscribe(
      (resposta) => {
        this.alertService.showToastrSuccess('Registro excluido');
        this.obterVeiculosFinalizadosDaApi();
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
}

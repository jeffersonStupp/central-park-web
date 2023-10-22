import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import Pessoa from 'src/app/models/pessoa.model';
import Veiculo from 'src/app/models/veiculo.model';
import { AlertService } from 'src/app/services/alert.service';
import { VeiculosService } from 'src/app/services/veiculos.service';

@Component({
  selector: 'app-lista-veiculos-estacionados',
  templateUrl: './lista-veiculos-estacionados.component.html',
  styleUrls: ['./lista-veiculos-estacionados.component.css'],
})
export class ListaVeiculosEstacionadosComponent implements OnInit {
  @ViewChild('placaInput', { static: false }) placaInput: ElementRef;

  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public recarregarItensTabela: Subject<any> = new Subject<any>();
  public listaestacionados: Veiculo[] = [];
  public placa: string;

  constructor(
    public veiculoService: VeiculosService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    document.title = 'Veiculos Estacionados';
    this.obterVeiculosEstavionadosDaApi();
  }

  public obterVeiculosEstavionadosDaApi() {
    this.veiculoService.obterTodosQueNaoSairam().subscribe(
      (resposta) => {
        if (resposta != null) {
          this.listaestacionados = resposta;
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

  public confirmarSaida(veiculo: Veiculo) {
    this.alertService.alertConfirm({
      title: 'Atenção',
      text: 'Quer confirmar a saida do veiculo?',
      confirmButtonText: 'Sim',
      confirmButtonColor: 'green',
      showCancelButton: true,
      cancelButtonText: 'Não',
      cancelButtonColor: 'red',
      fn: () => {

        this.chamarApiParaSair(veiculo);
      },
      fnCancel: () => {
        this.alertService.showToastrInfo('Operação cancelada!');
      },
    });
  }

  private chamarApiParaSair(veiculo: Veiculo) {
    this.veiculoService.saida(veiculo).subscribe(
      (resposta) => {
        this.alertService.showToastrSuccess('Saída efetuada');
        this.obterVeiculosEstavionadosDaApi();
        this.recarregarItensTabela.next({});
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }

  public confirmarEntrada() {
    const placa: string = this.placaInput.nativeElement.value;

    // if (placa.length < 8) {
    //   this.alertService.showToastrError('Insira uma placa válida');
    //   return;
    // }

    let veiculo: Veiculo = new Veiculo();

    this.alertService.alertConfirm({
      title: 'Atenção',
      text: 'Quer confirmar a entrada do veiculo?',
      confirmButtonText: 'Sim',
      confirmButtonColor: 'green',
      showCancelButton: true,
      cancelButtonText: 'Não',
      cancelButtonColor: 'red',
      fn: () => {
        this.chamarApiParaEntrada(placa);
        this.placaInput.nativeElement.value = ' ';
      },
      fnCancel: () => {
        this.alertService.showToastrInfo('Operação cancelada!');
      },
    });
  }

  private chamarApiParaEntrada(placa: string) {
    let placaModel = {placa:placa}
    this.veiculoService.entrada(placaModel).subscribe(
      (resposta) => {
        this.alertService.showToastrSuccess('Entrada efetuada');
        this.obterVeiculosEstavionadosDaApi();

        this.recarregarItensTabela.next({});
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }
}

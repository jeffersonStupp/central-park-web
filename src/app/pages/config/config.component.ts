import { MoneyFormatPipe } from './../../pipes/money-format.pipe';
import { TarifasService } from './../../services/tarifas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Tarifa from 'src/app/models/tarifa.model';
import { AlertService } from 'src/app/services/alert.service';
import { AutenticacaoService } from 'src/app/services/autenticacao.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public autenticacaoService: AutenticacaoService,
    public tarifaService: TarifasService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    document.title = 'Edicão';
    this.chamarApiParaObterPorId(this.id);

    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;

    if (this.formulario.invalid) {
      return;
    }

    let tarifa: Tarifa = new Tarifa(this.formulario.getRawValue());

    this.chamarApiParaEditarTarifa(tarifa);
  }

  public inicializarConfigForm(): void {
    this.formulario = this.formBuilder.group({
      id: [0],
      dataDeInicio: [null, [Validators.required]],
      dataDeFim: [null, [Validators.required]],
      valorTarifa: [null, [Validators.required]],
      valorAdicional: [null, [Validators.required]],
      quantidadeDeVagas: [null, [Validators.required]],
    });
  }
  public chamarApiParaObterPorId(id: number): void {
    this.tarifaService.obterValores().subscribe(
      (resposta) => {
        const valorTarifa = this.formatarDecimal(resposta.valorTarifa);
        const valorAdicional = this.formatarDecimal(resposta.valorAdicional);
        

        if (resposta != null) {
          this.formulario.patchValue(resposta);
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }

  public chamarApiParaEditarTarifa(tarifa: Tarifa) {
    this.tarifaService.editar(tarifa).subscribe(
      (resposta) => {
        if (resposta != null) {
          this.alertService.showToastrSuccess('Tarifa atualizado');
          this.router.navigate(['/veiculos/entrada']);
        } else {
          this.alertService.showToastrError('Erro ao alterar');
        }
      },
      (exception) => {
        let mensagemErro =
          typeof exception?.error == 'string' ? exception?.error : '';
        this.alertService.showToastrError('Erro na requisição', mensagemErro);
      }
    );
  }

  public formatarDecimal(valor: number): string {
    return valor.toFixed(2);
  }

  public voltar(mensagem: string) {
    this.alertService.showToastrInfo(mensagem);
  }
}

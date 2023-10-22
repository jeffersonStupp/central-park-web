import { AlertService } from './../../services/alert.service';
import { PessoaService } from './../../services/pessoa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Pessoa from 'src/app/models/pessoa.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  public formulario: FormGroup;
  public formSubmetido: boolean = false;
  public id: number = null;

  constructor(
    public FormBuilder: FormBuilder,
    public router: Router,
    public activateRouter: ActivatedRoute,
    public pessoaService: PessoaService,
    public alertService: AlertService
  ) {}

  public ngOnInit(): void {
    this.id = this.activateRouter.snapshot.params['id'];

    if (this.id == null) {
      document.title = 'cadastro';
    } else {
      document.title = 'edicão';
      this.chamarApiParaObterPessoaPorId(this.id);
    }
    this.inicializarConfigForm();
  }

  public submeterForm(): void {
    this.formSubmetido = true;

    if (this.formulario.invalid) {
      return;
    }

    let pessoa: Pessoa = new Pessoa(this.formulario.getRawValue());

    if (this.id == null) {
      this.chamarApiAdicionar(pessoa);
    } else {
      this.chamarApiAtualizar(pessoa);
    }

    // let jsonTexto = JSON.stringify(this.formulario.getRawValue());
    // alert(jsonTexto);
  }

  private inicializarConfigForm(): void {
    this.formulario = this.FormBuilder.group({
      id: [0],
      nome: [
        null,
        [
          Validators.required,
          Validators.maxLength(200),
          Validators.minLength(3),
        ],
      ],
      datanascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required, Validators.maxLength(14)]],
      rg: [null ], 
      email: [
        null,
        [Validators.email, Validators.required, Validators.maxLength(200)],
      ],
      telefone: [null, [Validators.maxLength(30)]],
      rua: [null, [Validators.required]],
      numero: [null],
      cep: [null],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      estado: ['Escolha um estado', [Validators.required]],
    });
  }
  public chamarApiAdicionar(Pessoa: Pessoa) {
    this.pessoaService.adicionar(Pessoa).subscribe((resposta) => {
      if (resposta != null) {
        this.alertService.showToastrSuccess('pessoa cadastrada');

        this.router.navigate(['/pessoa/listagem']);
      } else {
        this.alertService.showToastrError('erro ao cadastrar');
      }
    }, exception => {
      let mensagemErro = typeof(exception?.error) == "string" ? exception?.error : '';
      this.alertService.showToastrError('Erro na requisição', mensagemErro);
    });
  }
  public chamarApiAtualizar(Pessoa: Pessoa) {
    this.pessoaService.atualizar(Pessoa).subscribe((resposta) => {
      if (resposta != null) {
        this.alertService.showToastrSuccess('pessoa atualizada');
        this.router.navigate(['/pessoa/listagem']);
      } else {
        this.alertService.showToastrError('erro ao atualizar');
      }
    }, exception => {
      let mensagemErro = typeof(exception?.error) == "string" ? exception?.error : '';
      this.alertService.showToastrError('Erro na requisição', mensagemErro);
    });
  }
  public chamarApiParaObterPessoaPorId(id: number): void {
    this.pessoaService.obterPorId(id).subscribe((resposta) => {
      if (resposta != null) {
        this.formulario.patchValue(resposta);
      }
    }, exception => {
      let mensagemErro = typeof(exception?.error) == "string" ? exception?.error : '';
      this.alertService.showToastrError('Erro na requisição', mensagemErro);
    });
  }

  public aoAlterarCep(): void {
    let cep: string = this.formulario.controls['cep'].value;

    if (cep.length == 8) {
      this.chamarbuscacep(cep);
    }
  }

  public chamarbuscacep(cep: string): void {
    this.pessoaService.buscarcep(cep).subscribe((resposta) => {
      this.formulario.patchValue(resposta);

      //alert(JSON.stringify(resposta));

      this.formulario.controls['rua'].setValue(resposta.enderecoLogradouro);
      this.formulario.controls['bairro'].setValue(resposta.bairro);
      this.formulario.controls['cidade'].setValue(resposta.localidade);
      this.formulario.controls['bairro'].setValue(resposta.bairro);
      this.formulario.controls['estado'].setValue(resposta.uf);
    });
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
  HttpClientModule,
} from '@angular/common/http';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';

import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { PessoListagemComponent } from './pages/pesso-listagem/pesso-listagem.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { CpfPipe } from './pipes/cpf.pipe';
import { TelefonePipe } from './pipes/telefone.pipe';
import { PessoListagemEnderecoComponent } from './pages/pesso-listagem-endereco/pesso-listagem-endereco.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioListagemComponent } from './pages/usuario-listagem/usuario-listagem.component';
import { UsuarioCadastroComponent } from './pages/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLogadoGuard } from './guards/usuario-logado.guards';
import { AuthInterceptor } from './interceptors/requisicao.interceptor';
import { MoneyFormatPipe } from './pipes/money-format.pipe';

import { ListaVeiculosEstacionadosComponent } from './pages/lista-veiculos-estacionados/lista-veiculos-estacionados.component';
import { ListaVeiculosFinalizadosComponent } from './pages/lista-veiculos-finalizados/lista-veiculos-finalizados.component';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { ConfigComponent } from './pages/config/config.component';
import { ModalModule } from 'ngx-bootstrap/modal';



@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    BarraSuperiorComponent,
    PessoListagemComponent,
    CadastroComponent,
    ValidatorComponent,
    CpfPipe,
    TelefonePipe,
    PessoListagemEnderecoComponent,
    DateFormatPipe,
    LoginComponent,
    UsuarioListagemComponent,
    UsuarioCadastroComponent,
    ListaVeiculosEstacionadosComponent,
    ListaVeiculosFinalizadosComponent,
    DateTimeFormatPipe,
    ConfigComponent,
    MoneyFormatPipe,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [
    UsuarioLogadoGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

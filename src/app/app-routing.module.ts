import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPrincipalComponent } from './pages/menu-principal/menu-principal.component';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { PessoListagemComponent } from './pages/pesso-listagem/pesso-listagem.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PessoListagemEnderecoComponent } from './pages/pesso-listagem-endereco/pesso-listagem-endereco.component';
import { LoginComponent } from './pages/login/login.component';
import { UsuarioListagemComponent } from './pages/usuario-listagem/usuario-listagem.component';
import { UsuarioCadastroComponent } from './pages/usuario-cadastro/usuario-cadastro.component';
import { UsuarioLogadoGuard } from './guards/usuario-logado.guards';

import { ListaVeiculosEstacionadosComponent } from './pages/lista-veiculos-estacionados/lista-veiculos-estacionados.component';
import { ConfigComponent } from './pages/config/config.component';

const routes: Routes = [
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [UsuarioLogadoGuard],
    component: BarraSuperiorComponent,
    children: [
      { path: 'principal', component: MenuPrincipalComponent },
      {
        path: 'usuario',
        children: [
          { path: 'listagem', component: UsuarioListagemComponent },
          { path: 'cadastro', component: UsuarioCadastroComponent },
          { path: 'cadastro/:id', component: UsuarioCadastroComponent },
          { path: 'config', component: ConfigComponent },
        ],
      },
      {
        path: 'pessoa',
        children: [
          { path: 'listagem', component: PessoListagemComponent },
          {
            path: 'listagem-endereco',
            component: PessoListagemEnderecoComponent,
          },
          { path: 'cadastro', component: CadastroComponent },
          { path: 'cadastro/:id', component: CadastroComponent },
        ],
      },
      {
        path: 'veiculos',
        children: [
          { path: 'entrada', component: ListaVeiculosEstacionadosComponent },
        ],
      },
    ],
  },

  { path: '**', redirectTo: '/principal', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

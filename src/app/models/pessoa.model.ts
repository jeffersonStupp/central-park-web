export default class Pessoa {
  id: number;
  nome: string;
  datanascimento: Date;
  cpf: string;
  rg: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  constructor(obj?: any) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }
}

export default class Tarifa {
  id: number;
  dataDeInicio: Date;
  dataDeFim: Date;
  valorTarifa: number;
  valorAdicional: number;
  quantidadeDeVagas: number;

  constructor(obj?: any) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }
}

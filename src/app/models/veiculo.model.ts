export default class Veiculo {
  id: number;
  placa: string;
  horaEntrada: Date;
  horaSaida: Date;
  pessoa: number;

  constructor(obj?: any) {
    if (obj != null) {
      Object.assign(this, obj);
    }
  }
}

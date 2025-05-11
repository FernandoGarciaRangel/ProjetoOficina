import ModelError from "/model/ModelError.js";

 export default class Cliente {
  
   
   constructor(cpf, nome, telefone) {
    this.setCpf(cpf);
    this.setNome(nome);
    this.setTelefone(telefone);
  }

  setCpf(cpf) {
    Cliente.validarCpf(cpf)
    this.cpf = cpf;
  }

  setNome(nome) {
    Cliente.validarNome(nome)
    this.nome = nome;
  }

  setTelefone(telefone) {
    Cliente.validarTelefone(telefone)
    this.telefone = telefone;
  }

  
  // Getters para as propriedades
  getCpf() {
    return this.cpf;
  }

  getNome() {
    return this.nome;
  }

  getTelefone() {
    return this.telefone;
  }
  

  static validarNome(nome) {
    if(nome == null || nome == "" || nome == undefined)
      throw new ModelError("O Nome do Cliente não pode ser nulo!");
    if (nome.length > 40) 
      throw new ModelError("O Nome do Cliente deve ter até 40 caracteres!");
    const padraoNome = /[A-Z][a-z] */;
    if (!padraoNome.test(nome)) 
      throw new ModelError("O Nome do Cliente só pode conter letras !");
  }

  static validarCpf(strCpf) {
    let soma;
    let resto;
    let i;

    soma = 0;
    strCpf = strCpf.replace(".", "");
    strCpf = strCpf.replace(".", "");
    strCpf = strCpf.replace("-", "");

    if (strCpf == "00000000000") 
      throw new ModelError("O CPF não apresenta o formato 999.999.999-00");

    for (i = 1; i <= 9; i++)
      soma = soma + parseInt(strCpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCpf.substring(9, 10)))
      throw new ModelError("O CPF não foi digitado corretamente");

    soma = 0;
    for (i = 1; i <= 10; i++)
      soma = soma + parseInt(strCpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(strCpf.substring(10, 11))) 
      throw new ModelError("O CPF não foi digitado corretamente");
  }

  static validarTelefone(telefone) {
    if(telefone == null || telefone == "" || telefone == undefined)
      throw new ModelError("O Telefone do Cliente não pode ser nulo!");

    const padraoTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    if (!padraoTelefone.test(telefone)) 
      throw new ModelError("O Telefone do Cliente não foi preenchido corretamente!");
  }
}

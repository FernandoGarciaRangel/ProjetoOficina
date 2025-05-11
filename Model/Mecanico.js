import ModelError from "/model/ModelError.js";

class Mecanico {
    constructor(matr, nome) {
      this.setMatricula(matr);
      this.setNome(nome);
    }
  
    setMatr(matr) {
        Mecanico.validarMatricula(matr);
        this.matr = matr
    }
  
    setNome(nome) {
      Mecanico.validarNome(nome)
      this.nome = nome;
    }

    getMatr() {
        return this.matr
    }

    getNome() {
        return this.nome
    }

    static validarMatricula(matr) {
        if(matr == null || matr == "" || matr == undefined)
          throw new ModelError("A matrícula do Mecânico não pode ser nula!");
        const padraoMatricula = /[0-9]/;
        if (!padraoMatricula.test(matr))
          throw new ModelError("A matrícula do Mecânico deve ser composta somente por dígitos");
        if (matr.length < 3 || matr.length > 3)
            throw new ModelError("A matrícula deve conter até 3 caracteres!")
      }

    static validarNome(nome) {
        // Verificar se o nome é uma string
        if (nome == null || nome == "" || nome == undefined) {
            throw new ModelError("O nome do Mecânico não pode ser nula!");
        }

        // Verificar se o nome tem mais de 1 caractere
        if (typeof nome !== "string") {
            throw new ModelError("O nome do Mecânico precisa  ser uma String!");
        }

        // Verificar se o nome contém números ou símbolos usando expressão regular
        const regex = /^[A-Za-zÀ-ÿ]+$/;  // Expressão regular para letras apenas (incluindo acentos)
        if (!regex.test(nome)) {
            throw new ModelError("O nome não pode conter números ou símbolos!"); 
        }
    }

  }
  
<template>
  <div class="form-group">
    <label class="black" for="nome">{{questionText}}</label>
    <input
      type="text"
      class="form-control"
      id="cep"
      :placeholder="getPlaceHolder"
      v-model="cep"
      v-on:keyup.enter="enterCep"
      v-on:blur="enterCep"
    />

    <div v-show="showEnd">
      <input
        v-focus
        ref="logradouro"
        class="form-control endereco"
        placeholder="Logradouro"
        v-model="logradouro"
        type="text"
        v-on:keyup="allKeys"
      />
      <input
        v-focus
        ref="numero"
        class="form-control endereco"
        placeholder="Número"
        v-model="numero"
        type="text"
        v-mask="'####'"
        v-on:keyup="allKeys"
      />
      <input
        v-focus
        ref="complemento"
        class="form-control endereco"
        placeholder="Complemento"
        v-model="complemento"
        type="text"
        v-on:keyup="allKeys"
      />
      <input
        v-focus
        ref="bairro"
        class="form-control endereco"
        placeholder="Bairro"
        v-model="bairro"
        type="text"
        v-on:keyup="allKeys"
      />
      <input
        v-focus
        ref="municipio"
        class="form-control endereco"
        placeholder="Município"
        v-model="municipio"
        type="text"
        v-on:keyup="allKeys"
      />
      <input
        v-focus
        ref="uf"
        class="form-control endereco"
        placeholder="UF"
        v-model="uf"
        type="text"
        v-on:keyup="allKeys"
      />
    </div>
  </div>
</template>

<script>
import { utils } from "../../services/Survey.js";
const U = new utils();

import { mask } from "vue-the-mask";

export default {
  name: "Survey-Adress",
  data: () => ({
    qtAnwser: "",
    dataOk: false,
    showEnd: false,
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    municipio: "",
    uf: ""
  }),
  directives: {
    mask,
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  mounted() {
   if (this.$store.getters.answerValue(this.questionId)) {          
       
       var Answer = JSON.parse(this.$store.getters.answerValue(this.questionId));
       
       if(Answer.cep)
           this.cep = Answer.cep;
       
       if(Answer.logradouro)
           this.logradouro = Answer.logradouro;        
       
       if(Answer.numero)
           this.numero = Answer.numero;
       
       if(Answer.complemento)
           this.complemento = Answer.complemento;
       
       if(Answer.bairro)
           this.bairro = Answer.bairro;
       
       if(Answer.municipio)
           this.municipio = Answer.municipio;
       
       if(Answer.uf)
           this.uf = Answer.uf;
       
       this.showEnd = true;
       
      }




    this.focusInput();
  },
  updated() {
    this.focusInput();
  },
  props: {
    questionText: { type: String },
    questionId: { type: Number }
  },
  methods: {
    focusInput() {
      this.$refs.fc.$el.focus();
    },
    mountAnswer() {
      this.qtAnwser = "{";
      this.qtAnwser += '"cep":"' + this.cep + '",';
      this.qtAnwser += '"logradouro":"' + this.logradouro + '",';

        if (!this.numero)
            this.numero = "";

        this.qtAnwser += '"numero":' + this.numero + ",";

        if (!this.complemento)
            this.complemento = "";
      this.qtAnwser += '"complemento":"' + this.complemento + '",';
      this.qtAnwser += '"bairro":"' + this.bairro + '",';
      this.qtAnwser += '"municipio":"' + this.municipio + '",';
      this.qtAnwser += '"uf":"' + this.uf + '"';
      this.qtAnwser += "}";
    },
    allKeys() {
      //montar a resposta
      this.mountAnswer();
      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
    },
    enterCep() {
      this.showEnd = true;
      U.getCep(this.cep).then(
        datacep => {
          if (datacep.complemento)
            this.logradouro =
              datacep.logradouro + "(" + datacep.complemento + ")";
          else this.logradouro = datacep.logradouro;

          (this.bairro = datacep.bairro), (this.municipio = datacep.localidade);
          this.uf = datacep.uf;

          this.mountAnswer();
          this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
        },
        err => {
          alert(err);
        }
      );

      //this.$emit('QuestionAnwered', this.qtAnwser, this.questionId );
    }
  }
};
</script>

<style scoped>
/* .question .form-group > label {
  font-size: 1.25rem;
  letter-spacing: -0.48px;
  font-weight: bold;
}
.question .form-group input {
  border: none;
  border-left: 2px solid #038835 !important;
  font-size: 1.5rem;
  margin: 1rem 0 0;
}

.question .form-group input::placeholder {
  font-weight: lighter;
}

.question .form-group .endereco {
  font-size: 1rem;
  font-weight: bold;
}

.question .form-group input:focus {
  border: none !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255) !important;
  border-left: 2px solid #038835 !important;
}
.question form .btn-primary {
  width: 50% !important;
  display: inline-block !important;
}
.question form .instrucao {
  display: inline-block;
}

.q-title {
  font-size: 21px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #40424a;
}

.q-text-answer {
  width: 351px;
  height: 40px;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: normal;
  color: #40424a;
}

.q-text-answer .text-style-1 {
  color: #bf9f61;
} */
</style>
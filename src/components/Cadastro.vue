<template>
  <div class="home">
    <HeaderGlobal :secondaryHeader="false" />
    <div class="logo-bg" />
    <!-- Page Content -->
    <div class="container-fluid">
      <div class="container container-content border-left-light pt-md-5 pb-5">
        <div class="row">
          <div class="col-lg-6 pl-md-5 pr-md-0 px-5">
            <h1 class="white extra-bold mt-4 mb-4">É hora de entrar em campo.</h1>
            <h4
              class="white mt-4 mb-4"
            >Confirme seus dados para participar dessa experiência incrível conosco.</h4>
          </div>
          <div class="question col-lg-6 pt-2 pt-lg-4 pl-md-5 pr-md-0 px-5">
            <vs-alert
              v-if="errors.length"
              class="mb-5 mt-2"
              :active="inputInvalid"
              ref="alertErrors"
            >
              <h5>
                <strong>Por favor:</strong>
              </h5>
              <ul class="common-list">
                <li v-for="error in errors" :key="error.questid">{{ error.msg }}</li>
              </ul>
            </vs-alert>
            <div class="form-group mb-5 mb-md-0">
              <label class="form-group has-float-label">
                <input
                  type="text"
                  id="nome"
                  placeholder=" "
                  v-model="nome"
                  class="form-control fcmobile"
                  ref="nameInput"
                />
                <span for="name" class="white">Nome</span>
              </label>
            </div>
            <div class="form-group my-5 my-md-0">
              <label class="form-group has-float-label">
                <input
                  type="text"
                  id="sobreNome"
                  placeholder=" "
                  v-model="sobreNome"
                  class="form-control fcmobile"
                  ref="nameInput"
                />
                <span for="name" class="white">Sobrenome</span>
              </label>
            </div>
            <div class="form-group my-5 my-md-0">
              <label class="form-group has-float-label">
                <input
                  type="text"
                  id="rg"
                  placeholder="xx.xxx.xxx-x"
                  v-model="rg"
                  class="form-control fcmobile"
                  ref="rgInput"
                />
                <span for="rg" class="white">RG</span>
              </label>
            </div>
            <div class="form-group my-5 my-md-0">
              <label class="form-group has-float-label">
                <input
                  type="text"
                  id="cpf"
                  placeholder="xxx.xxx.xxx-xx"
                  v-model="cpf"
                  class="form-control fcmobile"
                  v-mask="'###.###.###-##'"
                  ref="cpfInput"
                />
                <span for="cpf" class="white">CPF</span>
              </label>
            </div>
            <div class="form-group my-5 my-md-0">
              <label class="form-group has-float-label">
                <input
                  type="tel"
                  id="phone"
                  placeholder="(xx)9xxxx-xxxx"
                  v-model="phone"
                  class="form-control fcmobile"
                  v-mask="['(##) ####-####', '(##) #####-####']"
                  ref="phoneInput"
                />
                <span for="phone" class="white">Celular</span>
              </label>
            </div>
            <div class="form-group my-5 my-md-0">
              <label class="form-group has-float-label">
                <input
                  type="email"
                  id="email"
                  placeholder="nome@email.com.br"
                  v-model="email"
                  class="form-control fcmobile"
                  ref="emailInput"
                />
                <span for="email" class="white">E-mail</span>
              </label>
            </div>
            <button
              class="btn btn-primary btn-block mt-5 mb-4 text-center py-3 text-uppercase"
              v-on:click="checkForm"
            >Gerar Voucher</button>
          </div>
        </div>
      </div>
    </div>
    <FooterGlobal :secondaryFooter="false" />
  </div>
</template>

<script>
import HeaderGlobal from "./HeaderGlobal.vue";
import FooterGlobal from "./FooterGlobal.vue";
import { mask } from "vue-the-mask";

import { Guest } from "../em1click/SmartSurvey.js";
const g = new Guest();

export default {
  name: "Home",
  components: {
    HeaderGlobal,
    FooterGlobal
  },
  data: () => ({
    nome: "",
    sobreNome: "",
    rg: "",
    cpf: "",
    phone: "",
    email: "",
    errors: [],
    qtErros: 0
  }),
  directives: { mask },

  computed: {
    inputInvalid() {
      if (this.qtErros == 0) return false;
      else return true;
    }
  },

  created() {
    if (this.$store.state.guestData.nome)
      this.nome = this.$store.state.guestData.nome;

    if (this.$store.state.guestData.sobreNome)
      this.sobreNome = this.$store.state.guestData.sobreNome;
  },
  methods: {
    submit() {
      //this.$router.push("home");
    },
    updateGuestData(gdata) {
      g.UpdateGuest(gdata).then(
        ret => {
          if (ret) {
            this.$router.push("Voucher");
          }
        },
        err => alert(err)
      );
    },
    checkForm() {
      this.errors = [];

      if (!this.nome) {
        this.ErrorOccured("Informe seu Nome.", 1);
      }

      if (!this.sobreNome) {
        this.ErrorOccured("Informe seu sobreNome.", 2);
      }

      if (!this.rg) {
        this.ErrorOccured("Informe seu RG.", 3);
      }

      if (!this.cpf) {
        this.ErrorOccured("Informe seu CPF.", 4);
      } else {
        if (!this.TestaCPF(this.cpf))
          this.ErrorOccured("Verifique, CPF Inválido", 4);
      }

      if (!this.phone) {
        this.ErrorOccured("Informe seu número de celular.", 5);
      } else {
        if (!this.TestaPhone(this.phone)) {
          this.ErrorOccured("Verifique, número de celular inválido.", 5);
        }
      }

      if (!this.email) {
        this.ErrorOccured("Informe seu E-mail.", 6);
      } else {
        if (!this.TestaEmail(this.email))
          this.ErrorOccured("Verifique, E-mail Inválido", 6);
      }

      var ok = false;

      if (this.errors) {
        if (this.errors.length == 0) ok = true;
      } else {
        ok = true;
      }

      if (ok) {
        this.$router.push("Voucher");
        // if (this.$store.state.guestData.nome) {
        //   var payload = {
        //     id: this.$store.state.guestData.id,
        //     cpf: this.cpf,
        //     rg: this.rg,
        //     nome: this.nome,
        //     sobreNome: this.sobreNome,
        //     Celular: this.phone,
        //     email: this.email
        //   };
        //   this.$store.commit("SET_GuestData", payload);
        //   this.updateGuestData(payload);
        // }
      } else window.scrollTo(0, 0);
      //e.preventDefault();
    },
    ErrorOccured(value, id) {
      var payload = { questid: id, msg: value };

      if (this.errors) {
        var found = false;
        for (var i = 0; i < this.errors.length; i++) {
          if (this.errors[i].questid == id) {
            this.errors[i] = payload;
            found = true;
          }
        }
        if (!found) {
          this.errors.push(payload);
          this.qtErros++;
        }
      } else {
        this.qtErros++;
        this.errors.push(payload);
      }
    },
    TestaCPF: function(strCPF) {
      var Soma;
      var Resto;
      Soma = 0;
      strCPF = strCPF.replace(/[^\d]/g, "");
      if (strCPF == "00000000000") return false;
      if (strCPF == "11111111111") return false;
      if (strCPF == "22222222222") return false;
      if (strCPF == "33333333333") return false;
      if (strCPF == "44444444444") return false;
      if (strCPF == "55555555555") return false;
      if (strCPF == "66666666666") return false;
      if (strCPF == "77777777777") return false;
      if (strCPF == "88888888888") return false;
      if (strCPF == "99999999999") return false;
      var i;
      for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10))) return false;

      Soma = 0;
      for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;

      if (Resto == 10 || Resto == 11) Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11))) return false;
      return true;
    },
    TestaRG: function(rg) {
      // value = document.getElementById("cpf").value;
      let strRG = rg.replace(/[^\d]/g, "");
      if (strRG == "000000000") return false;
      if (strRG == "111111111") return false;
      if (strRG == "222222222") return false;
      if (strRG == "333333333") return false;
      if (strRG == "444444444") return false;
      if (strRG == "555555555") return false;
      if (strRG == "666666666") return false;
      if (strRG == "777777777") return false;
      if (strRG == "888888888") return false;
      if (strRG == "999999999") return false;

      var re = /^[0-9]{2}.[0-9]{3}.[0-9]{3}-[0-9]{1}$/;
      if (re.test(rg)) {
        return true;
      } else {
        // form.cpf.focus();
        return false;
      }
    },
    TestaEmail: function(rg) {
      var rgRegex = /\S+@\S+\.\S+/;
      if (rgRegex.test(rg)) {
        return true;
      } else {
        // form.cpf.focus();
        return false;
      }
    },

    TestaPhone: function(cel) {
      var celRegex = /(0?[1-9]{2})*\D*(9)\D?(\d{4})+\D?(\d{4})\b/;
      if (celRegex.test(cel)) {
        return true;
      } else {
        // form.cpf.focus();
        return false;
      }
    }
  }
};
</script>

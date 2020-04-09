<template>
  <div class="home">
    <HeaderGlobal :secondaryHeader="false" />
    <div class="logo-bg" />
    <div class="container-fluid">
      <div class="container container-content border-left-light pt-md-5 pb-5">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="white extra-bold mt-4 mt-lg-5 mb-3">:(</h1>
            <h2 class="white extra-bold mt-4 mt-lg-5 mb-3">Que pena!</h2>
            <h5 class="mt-2 pb-lg-5 white bold">Contamos com você em uma próxima oportunidade!</h5>
          </div>
        </div>
      </div>
    </div>
    <FooterGlobal />
  </div>
</template>

<script>
import HeaderGlobal from "./HeaderGlobal.vue";
import FooterGlobal from "./FooterGlobal.vue";
import { mask } from "vue-the-mask";

export default {
  name: "Cancel",
  components: {
    HeaderGlobal,
    FooterGlobal
  },
  data: () => ({
    name: "",
    rg: "",
    cpf: "",
    phone: "",
    email: "",
    errors: [],
    qtErros: 0,
    surv: {}
  }),

  directives: { mask },

  computed: {
    inputInvalid() {
      if (this.qtErros == 0) return false;
      else return true;
    }
  },

  methods: {
    submit() {
      this.$router.push("home");
    },
    checkForm: function(e) {
      this.errors = [];

      if (!this.name) {
        this.ErrorOccured("Informe seu Nome.", 1);
        // this.$refs["nameInput"].focus();
      } else {
        if (this.name.length <= 10) {
          this.ErrorOccured("Nome deve conter ao menos 10 caracteres.", 1);
          // this.$refs["nameInput"].focus();
        }
      }

      if (!this.rg) {
        this.ErrorOccured("Informe seu RG.", 2);
        // this.$refs["rgInput"].focus();
      } else {
        if (!this.TestaRG(this.rg)) {
          this.ErrorOccured("Verifique, RG Inválido", 2);
          // this.$refs["rgInput"].focus();
        }
      }

      if (!this.cpf) {
        this.ErrorOccured("Informe seu CPF.", 3);
        // this.$refs["cpfInput"].focus();
      } else {
        if (!this.TestaCPF(this.cpf))
          this.ErrorOccured("Verifique, CPF Inválido", 3);
        // this.$refs["cpfInput"].focus();
      }

      if (!this.phone) {
        this.ErrorOccured("Informe seu número de celular.", 4);
      } else {
        if (!this.TestaPhone(this.phone)) {
          this.ErrorOccured("Verifique, número de celular inválido.", 4);
        }
      }

      if (!this.email) {
        this.ErrorOccured("Informe seu E-mail.", 5);
        // this.$refs["emailInput"].focus();
      } else {
        if (!this.TestaEmail(this.email))
          this.ErrorOccured("Verifique, E-mail Inválido", 5);
        // this.$refs["emailInput"].focus();
      }

      if (this.errors.length) {
        return false;
      } else {
        // if (!this.$store.state.TermsAccepted) {
        //   window.scrollTo(0, 0);
        //   this.popupPrivActive = true;
        // } else this.submit();
        // alert("feito");
        this.$router.push("finalsurvey");
      }
      e.preventDefault();
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
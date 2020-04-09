<template>
  <div class="home">
    <HeaderGlobal :secondaryHeader="false" />
    <div class="logo-bg" />
    <!-- Page Content -->
    <div class="container-fluid">
      <div class="container container-content border-left-light pt-md-5 pb-4">
        <div class="row">
          <div class="col-lg-6 pl-md-5 pr-md-0 px-5">
            <!-- <h3 class="extra-bold mt-4 mb-4">Olá, {{guestName}}</h3> -->
            <h2 class="extra-bold mt-4 mb-4">Olá</h2>
            <h4 class="light t-1">Obrigado por estar conosco na Sala Raí.</h4>
            <h4
              class="light t-1"
            >Gostaríamos muito de saber como foi a sua experiência, para que possamos estar cada vez mais juntos.</h4>
          </div>

          <div class="col-lg-6 pt-2 pl-md-5 pr-md-0 px-5">
              <h4 class="extra-bold mt-3 mb-2 pr-lg-3 mr-lg-5">
                  O papo é bem rápido e leva menos de 1 minuto.
              </h4>
              <h6 class="mt-0 white small mb-4">Só precisamos validar rapidamente os seus dados.</h6>
              <!--
    <form @submit="checkForm" novalidate="true">
                  -->
              <div>
                  <vs-alert class="mb-3 mt-2"
                            color="#ffffff"
                            :active="inputInvalid">
                      <!--bf9f61-->
                      <b>Por favor:</b>
                      <ul class="common-list">
                          <li v-for="error in errors" :key="error.questid">{{ error.msg }}</li>
                      </ul>
                  </vs-alert>

                  <div class="form-group mb-5 mb-md-0">
                      <label class="form-group has-float-label">
                          <input type="text"
                                 id="nome"
                                 placeholder=" "
                                 v-model="nome"
                                 class="form-control fcmobile"
                                 ref="nameInput" />
                          <span for="name" class="white">Nome</span>
                      </label>
                  </div>
                  <div class="form-group my-5 my-md-0">
                      <label class="form-group has-float-label">
                          <input type="text"
                                 id="sobreNome"
                                 placeholder=" "
                                 v-model="sobreNome"
                                 class="form-control fcmobile"
                                 ref="nameInput" />
                          <span for="name" class="white">Sobrenome</span>
                      </label>
                  </div>
                  <div class="form-group my-5 my-md-0">
                      <label class="form-group has-float-label">
                          <input type="text"
                                 id="rg"
                                 placeholder="xx.xxx.xxx-x"
                                 v-model="rg"
                                 class="form-control fcmobile"
                                 ref="rgInput" />
                          <span for="rg" class="white">RG</span>
                      </label>
                  </div>
                  <div class="form-group my-5 my-md-0">
                      <label class="form-group has-float-label">
                          <input type="text"
                                 id="cpf"
                                 placeholder="xxx.xxx.xxx-xx"
                                 v-model="cpf"
                                 class="form-control fcmobile"
                                 v-mask="'###.###.###-##'"
                                 ref="cpfInput" />
                          <span for="cpf" class="white">CPF</span>
                      </label>
                  </div>
                  <div class="form-group my-5 my-md-0">
                      <label class="form-group has-float-label">
                          <input type="tel"
                                 id="phone"
                                 placeholder="(xx)9xxxx-xxxx"
                                 v-model="phone"
                                 class="form-control fcmobile"
                                 v-mask="['(##) ####-####', '(##) #####-####']"
                                 ref="phoneInput" />
                          <span for="phone" class="white">Celular</span>
                      </label>
                  </div>
                  <div class="form-group my-5 my-md-0">
                      <label class="form-group has-float-label">
                          <input type="email"
                                 id="email"
                                 placeholder="nome@email.com.br"
                                 v-model="email"
                                 class="form-control fcmobile"
                                 ref="emailInput" />
                          <span for="email" class="white">E-mail</span>
                      </label>
                  </div>

                  <!-- <button type="submit" class="btn btn-primary mt-4 mb-4 transparent">Quero fazer parte</button> -->
                  <button type="submit"
                          class="btn btn-primary btn-block mt-4 mb-2"
                          ref="btnStart" v-on:click="checkForm">
                      {{ btnMes }}
                  </button>

                  </div>
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

import { Survey } from "../services/Survey.js";
const s = new Survey();

import { Guest } from "../em1click/SmartSurvey.js";
const g = new Guest();

    import { mask } from "vue-the-mask";
export default {
  name: "Home",
  components: {
    HeaderGlobal,
    FooterGlobal
  },
  data: () => ({
    btnMes: "Quero responder",
    nome: "",
    sobreNome: "",
    rg: "",
    cpf: "",
    phone: "",
    email: "",
    errors: [],
      qtErros: 0,
    surv: {}
  }),
  directives: { mask },
  created() {},
  mounted() {},
  watch: {},
 computed: {
    inputInvalid() {
      if (this.qtErros == 0) return false;
      else return true;
    }
  },
 methods: {
    submit() {
      //this.$router.push("home");
    },
    
    checkForm() {
      this.errors = [];
        this.qtErros = 0;

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

        if (this.errors)
        {
            if (this.errors.length == 0)
                ok = true;
        }
        else
        {
        ok = true;
        }
        
      if (ok) {
        var payload = {
            cpf: this.cpf,
            rg: this.rg,
            nome: this.nome,
            sobreNome: this.sobreNome,
            celular: this.phone,
            email: this.email
          };
          
          this.$store.commit("SET_GuestData", payload);
           g.UpdateGuest(payload).then(ret => {
               if (ret) { //atualizamos os dados do convidado e chamamos o survey                   
                         s.Start(this.cpf, this.phone).then(
                            ret => {
                              this.$store.commit("SET_SurveyStruct", ret.surveyStruct);
                              this.$store.commit("SET_Req", 0);
                              this.$store.commit("SET_Chapter", 0);
                              this.$store.commit("SET_SurveyUserId", ret.userSurveyId);
                              this.$store.commit("SET_UserId", this.cpf);
                              this.$store.commit("SET_LastReq", 0);
                              this.$store.commit("SET_LastChapter", 0);                
                              this.surv = ret;          
                              this.$router.push("survey");
                            },
                            err => alert(err)
                          );
                        }
                    },
                err => this.ErrorOccured(err.msg, 10)   
            );                    
      }
      else window.scrollTo(0, 0);
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

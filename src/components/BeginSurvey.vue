<template>
  <div class="BeginSurvey">
    <div class="balls"></div>
    <HeaderGlobal :secondaryHeader="false" />
    <!-- Page Content -->
    <div class="container-fluid">
      <div class="container container-content border-left-light pt-3 pb-3 pb-md-5 pt-md-5">
        <div class="row mt-md-3">
          <div class="col-lg-6 pl-md-5 pr-md-0 px-5">
            <h2
              class="white extra-bold"
            >É hora de mostrar por que você merece essa camisa de titular.</h2>
          </div>
          <div class="col-lg-6 pl-md-5 pr-md-0 px-5">
            <div class="row">
              <div class="col-12">
                <h4 class="text-primary bold pr-md-5 pt-2">
                  <strong>Conte mais sobre você!</strong>
                </h4>
                <p class="white light t-1">
                  O jogo é rápido e vai durar no máximo 10 minutos. Além disso, a cada etapa cumprida, você
                  <strong>concorrerá a prêmios especiais.</strong>
                </p>
                <p class="white light t-1">
                  E
                  <strong>todos</strong> que chegarem ate o final, concorrerão a
                  <strong>uma camisa oficial do Moleque Travesso</strong>. 👍
                </p>
              </div>
              <div class="col-12 col-lg-6">
                <button
                  type="submit"
                  class="btn btn-primary btn-block my-3"
                  v-on:click="submit"
                >Iniciar</button>
              </div>
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

export default {
  name: "BeginSurvey",
  components: {
    HeaderGlobal,
    FooterGlobal
  },
  data: () => ({
    qtSomos: 0
  }),
  created() {
    this.$gtag.event("BeginSurvey", { method: "Google" });
    this.getNSurvey();
  },
  methods: {
    submit() {
      this.$router.push("survey");
    },
    getNSurvey() {
      //GetData(SurveyId)
      s.GetData().then(
        ret => {
          if (ret) {
            this.qtSomos = ret;
            this.$store.commit("SET_QtUsers", this.qtSomos);
          }
        },
        err => alert(err)
      );
    }
  }
};
</script>
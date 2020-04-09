<template>
  <div class="survey secondary bg-white">
    <HeaderGlobal :secondaryHeader="true" v-if="!popupPrivActive" />
    <div class="logo-bg" />
    <!-- Page Content Desktop -->
    <div class="container-fluid">
      <div class="container container-content border-left-light pt-5 pb-5">
        <div class="row">
          <div class="col-md-6 offset-md-3 text-center pl-md-5 pr-md-0 px-5">
            <!--<div class="col-lg-6 pl-5 text-center">-->
            <div class="text-center">
              <img
                src="static/assets/img/fim-de-jogo.png"
                class="img-fluid w-md-25 img-center px-4 px-lg-0 pt-2"
                alt="Fim de jogo"
              />
              <h2 class="text-secondary extra-bold mt-5">Fim de jogo!</h2>
              <h5 class="text-secondary extra-bold mb-4">Apita o árbitro</h5>
              <hr />
              <h3 class="text-black bold pb-1 mt-4">
                Obrigado,
                <span class="extra-bold">{{nome}}</span>
              </h3>
              
            </div>
            <h4 class="text-black mb-4">
              <strong>Agradecemos muito a sua presença e o seu tempo para responder nossa pesquisa.</strong>
            </h4>                          
          </div>
        </div>
      </div>
    </div>

    <FooterGlobal :secondaryFooter="true" />
  </div>
</template>

<script>
import FooterGlobal from "./FooterGlobal";
import HeaderGlobal from "./HeaderGlobal";

export default {
  name: "SurveyFinal",
  data: () => ({
    qtSomos: 0
  }),
  components: {
    FooterGlobal,
    HeaderGlobal
        },

  computed: {
    userId() {
      return this.$store.state.userId;
    },
      nome() {

      var n = this.$store.state.guestData.nome;
      return n;
    },
    sobreNome() {
      var n = this.$store.state.guestData.sobreNome;
      return n;
    }
  },
  created() {
    this.$gtag.event("FinalSurvey", { method: "Google" });
  },
  methods: {
  }
};
</script>

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
                <span class="extra-bold">Marcela.</span>
              </h3>
              <!-- <a
                href="http://portuguesasantista.eusoutorcedor.com.br"
                class="btn btn-primary btn-block mt-4 mb-2 py-3"
                target="_blank"
              >ASSOCIE-SE</a>-->
            </div>
            <h4 class="text-black mb-4">
              <strong>Agradecemos muito a sua presença e o seu tempo para responder nossa pesquisa.</strong>
            </h4>
            <!-- <social-sharing
              url="https://juventus.fanbase.com.br/"
              title="#JUVENTUSDIGITAL"
              description="O Juventus quer conhecer você! Entre em campo com a gente, ganhe descontos e concorra a vários prêmios."
              quote="O Juventus quer conhecer você! Entre em campo com a gente, ganhe descontos e concorra a vários prêmios."
              hashtags="JUVENTUSDIGITAL,Juventus,fanbase"
              twitter-user
              inline-template
              class="text-center"
            >
              <div>
                <network network="facebook">
                  <a href="#">
                    <img src="static/assets/img/ic-fb.png" class="mr-4" alt="Facebook" />
                  </a>
                </network>
                <network network="whatsapp">
                  <a href="#">
                    <img src="static/assets/img/ic-wp.png" class="img-fluid" alt="WhatsApp" />
                  </a>
                </network>
              </div>
            </social-sharing>-->
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
import { Survey } from "../services/Survey.js";
const s = new Survey();
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
      var n = this.fillString("<@RQ:101@>");
      return n;
    },
    sobreNome() {
      var n = this.fillString("<@RQ:102@>");
      return n;
    }
  },
  created() {
    this.$gtag.event("FinalSurvey", { method: "Google" });
  },
  methods: {
    fillString(s) {
      if (s.includes("<@") && s.includes("@>")) {
        var s1 = s.split("<@");
        var s2 = s1[1].split("@>");
        var s3 = s2[0].split(":");
        var rid = s3[1];
        var value = this.$store.state.answers[rid];
        s = s1[0] + value + s2[1];
      }
      return s;
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

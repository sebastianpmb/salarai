<template>
  <div>
    <nav
      class="navbar navbar-expand-lg static-top border-bottom-light"
      v-bind:class="{'navbar-dark' : !this.secondaryHeader}"
    >
      <div class="container border-left-light px-lg-0 py-1">
        <div class="col-12 col-md-3 text-center px-lg-5 px-4 mb-4 mb-lg-0">
          <a class="navbar-brand pt-4 pt-md-2 mr-0 px-5 px-md-0" href="index.html">
            <img
              :src="[!this.secondaryHeader ? 'static/assets/img/logo.png' : 'static/assets/img/logo-secondary.png']"
              class="px-3 px-lg-0 py-2"
              alt="Cadastra Portuguesa Santista"
              height="80"
            />
          </a>
        </div>
        <div class="d-none d-sm-block">
          <div class="pull-right pt-2">
            <img
              :src="[!this.secondaryHeader ? 'static/assets/img/logo-livip.png' : 'static/assets/img/logo-livip-secondary.png']"
              class
              alt="Já somos"
              height="23"
            />
          </div>
          <div class="pull-right pt-2 mr-2">
            <p v-bind:class="[!this.secondaryHeader ? 'text-white' : 'text-black']">
              <small>Powered by</small>
            </p>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { Survey } from "../services/Survey.js";
const s = new Survey();

export default {
  name: "HeaderGlobal",
  props: {
    secondaryHeader: { type: Boolean }
  },
  data: () => ({
    qtSomos: 0
  }),
  created() {
    this.getNSurvey();
  },
  computed: {
    showSomos: function() {
      if (this.qtSomos == 0) return false;
      else return true;
    }
  },
  methods: {
    getNSurvey() {
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
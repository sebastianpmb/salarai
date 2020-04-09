<template>
  <footer>
    <div class="container-fluid footer content-desktop border-top-light">
      <div class="container footer border-left-light py-lg-3">
        <div class="row">
          <div class="d-block d-md-none col-4 offset-4 col-lg-12 offset-lg-0 pb-3 pl-4">
            <div class="patrocinadores pt-md-5">
              <p
                class="light float-left ml-md-4 pl-md-3 mt-1"
                v-bind:class="[
                  !this.secondaryFooter ? 'text-white' : 'text-black'
                ]"
              >
                <small>Powered by</small>
              </p>
              <img
                class="float-left ml-lg-2 pt-lg-1"
                alt="Livip"
                :src="[
                  !this.secondaryFooter
                    ? 'static/assets/img/logo-livip.png'
                    : 'static/assets/img/logo-livip-secondary.png'
                ]"
                height="30"
              />
            </div>
          </div>
          <div class="text-center col-12 py-3 pl-4">
            <div
              class="d-inline pt-md-5"
              v-bind:class="[
                  !this.secondaryFooter ? 'text-white' : 'text-black'
                ]"
            >
              <span class="align-bottom">
                <small>© copyright 2020 Livip</small>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { Survey } from "../services/Survey.js";
const s = new Survey();
export default {
  name: "FooterGlobal",
  props: {
    secondaryFooter: { type: Boolean }
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

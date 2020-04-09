<template>
  <div class="sur-qtext">
    <p class="q-title">{{questionText}}</p>

    <div
      class="q-buttonlist-answer border"
      vs-align="center"
      vs-type="flex"
      vs-justify="space-around"
    >
      <vs-button
        vs-type="flex"
        vs-justify="center"
        v-for="opt in options"
        v-bind:key="opt.value"
        type="flat"
        class="btnOtionList border-right"
        v-on:click="ChooseOption(opt.text)"
      >{{ opt.text }}</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Survey-Button-List",
  data: () => ({
    qtAnwser: "",
    dataOk: false,
    show: false
  }),
  props: {
    questionText: { type: String },
    questionId: { type: Number },
    options: []
  },

  methods: {
    showList() {
      this.show = true;
    },
    ChooseOption(opt) {
      this.qtAnwser = opt;
      this.enterKey();
    },
    enterKey() {
      this.$emit("QuestionAnwered", this.qtAnwser, this.questionId);
    }
  }
};
</script>

<style scoped>
/* .icon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfe2e6;
  color: #dfe2e6;
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

.q-buttonlist-answer {
  //width: 360px;
  //height: 40px;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: normal;
  color: #40424a;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
}

.q-buttonlist-answer .btnOtionList {
  display: inline-block;
  border-left: thick solid #ff0000;
}

.q-buttonlist-answer .btnOtionList2 {
  display: inline-block;
  border-left: thick solid #ff0000;
  width: auto;
}
.q-text-answer .text-style-1 {
  color: #bf9f61;
} */
</style>
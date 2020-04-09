<template>
  <div class="form-group">
    <label class="black">{{ questionText }}</label>
    <div class="q-yesno-answer">
      <vs-button
        :type="getBtnType('Sim')"
        ref="opcao1"
        class="btnOtion btn-block mb-2"
        v-on:click="ChooseOption('Sim')"
        >Sim</vs-button
      >
      <vs-button
        :type="getBtnType('Não')"
        ref="opcao1"
        class="btnOtion btn-block mb-2"
        v-on:click="ChooseOption('Não')"
        >Não</vs-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Survey-Yes-No",
  data: () => ({
    qtAnwser: "",
    dataOk: false,
    show: false
  }),

  props: {
    questionText: { type: String },
    questionId: { type: Number }
  },

  mounted: function() {
    this.qtAnwser = this.$store.getters.answerValue(this.questionId);
  },
  methods: {
    getBtnType(val) {
      if (this.qtAnwser == val) return "filled";
      else return "border";
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
/* .btnOtion {
  width: 189px;
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

.q-list-answer {
  width: 351px;
  height: 40px;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: normal;
  color: #40424a;
  display: inline-block;
  vertical-align: middle;
}

.q-text-answer .text-style-1 {
  color: #bf9f61;
} */
</style>

<template>
  <div class="form-group">
    <label class="black" for="nome">{{questionText}}</label>
    <input
      type="text"
      class="form-control"
      ref="txtdata"
      id="data"
      placeholder="DD/MM/AAAA"
      v-model="qtAnwser"
      v-on:blur="enterKey"
      v-on:keyup="allKeys"
      v-mask="'##/##/####'"
    />
    <!--v-on:keyup.enter="enterKey"-->
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  name: "Survey-Date-Text",
  data: () => ({
    qtAnwser: "",
    dataOk: false
  }),
  directives: { mask },
  props: {
    questionText: { type: String },
    questionId: { type: Number }
  },
  mounted() {
    this.qtAnwser = this.$store.getters.answerValue(this.questionId);
  },
  methods: {
    allKeys() {
      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
    },
    enterKey() {
      if (this.isValidate(this.qtAnwser))
        this.$emit("QuestionAnwered", this.qtAnwser, this.questionId);
      else {
        this.$emit("ErrorOccured", "Data Inválida.", this.questionId);
        //this.$refs.txtdata.focus()
      }
    },
    isValidate: function(dateStr) {
      var s = dateStr.split("/");
      if (s[2] < 1900 || s[2] > 2010) {
        return false;
      } else {
        var d = new Date(+s[2], s[1] - 1, +s[0]);
        if (Object.prototype.toString.call(d) === "[object Date]") {
          if (
            !isNaN(d.getTime()) &&
            d.getDate() == s[0] &&
            d.getMonth() == s[1] - 1
          ) {
            return true;
          } else return false;
        }
      }
    }
  }
};
</script>

<style scoped>
/* .q-title {
  font-size: 21px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #40424a;
}

.q-text-answer {
  width: 351px;
  height: 40px;
  font-size: 24px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.08;
  letter-spacing: normal;
  color: #40424a;
}

.q-text-answer .text-style-1 {
  color: #bf9f61;
} */
</style>
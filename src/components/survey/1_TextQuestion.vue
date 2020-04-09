<template>
  <div class="form-group">
    <label class="black" for="nome">{{questionText}}</label>
    <input
      type="text"
      class="form-control"
      id="nome"
      :placeholder="getPlaceHolder"
      v-model="qtAnwser"
      v-on:keyup.enter="enterKey"
      v-on:keyup="allKeys"
    />
  </div>
</template>

<script>
export default {
  name: "Survey-Question-Text",
  data: () => ({
    qtAnwser: "",
    dataOk: false
  }),
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {
    getPlaceHolder() {
      if (this.placeHolder) return this.placeHolder;
      else return "Digite sua resposta aqui";
    }
  },
  mounted: function() {
    /*
            if (this.$store.state.answers[this.questionId]) {
                if (this.$store.state.answers[this.questionId] != "") {
                    alert(this.$store.state.answers[this.questionId]);
                    this.qtAnwser = this.$store.state.answers[this.questionId];
                    alert(this.qtAnwser);
                }
            } */

    //this.setAnwser(this.questionId);

    this.qtAnwser = this.$store.getters.answerValue(this.questionId);

    this.focusInput();
  },
  created() {},
  updated() {
    this.focusInput();
  },
  props: {
    questionText: { type: String },
    questionId: { type: Number },
    placeHolder: { type: String }
  },
  methods: {
    focusInput() {
      this.$refs.fc.$el.focus();
    },
    allKeys() {
      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
    },
    enterKey() {
      this.$emit("QuestionAnwered", this.qtAnwser, this.questionId);
    }
  }
};
</script>


<style scoped>
</style>
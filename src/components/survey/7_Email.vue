<template>
  <div class="form-group">
    <label class="black" for="nome">{{ questionText }}</label>
    <input
      type="text"
      class="form-control"
      id="Email"
      name="Email"
      :placeholder="getPlaceHolder"
      v-model="qtAnwser"
      v-on:keyup.enter="enterKey"
      v-on:keyup="allKeys"
    />

    <div
      class="q-buttonlist-answer mt-3"
      vs-align="center"
      vs-type="flex"
      vs-justify="space-around"
      v-show="showOptions"
    >
      <vs-button
        vs-type="flex"
        vs-justify="center"
        v-for="(opt, index) in optionsBase1"
        v-bind:key="index"
        type="flat"
        class="btnOtionList"
        v-on:click="chooseOption(opt)"
        >{{ opt }}</vs-button
      >
    </div>
  </div>
</template>

<script>
/*
 import { Survey } from "../../../services/Survey.js";
 const s = new Survey;
 */

export default {
  name: "Survey-Question-Text",
  data: () => ({
    qtAnwser: "",
    dataOk: false,
    showOptions: false,
    optionsBase1: [
      "@gmail.com",
      "@yahoo.com",
      "@outlook.com",
      "@me.com",
      ".com.br",
      ".com"
    ],
    optionsBase2: [".com.br", ".com"],
    options: []
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
  mounted() {
    this.qtAnwser = this.$store.getters.answerValue(this.questionId);
    this.focusInput();
  },
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
    validEmail: function(email) {
      // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;

      if (email.length >= 5) {
        if (email.includes("@") && email.includes(".")) return true;
      } else return false;
    },
    allKeys() {
      if (this.qtAnwser)
        this.$emit("AnswerChanged", this.qtAnwser, this.questionId);

      this.showOptions = true;
    },

    allKeys1() {
      if (this.qtAnwser)
        if (this.qtAnwser.length >= 1) {
          this.options = [];
          if (this.qtAnwser.includes("@")) {
            for (var j = 0; j < this.optionsBase1.length; j++)
              this.options.push(this.qtAnwser.trim() + this.optionsBase1[j]);
          } else {
            for (var i = 0; i < this.optionsBase2.length; i++)
              this.options.push(this.qtAnwser.trim() + this.optionsBase2[i]);
            for (i = 0; i < this.optionsBase1.length; i++)
              this.options.push(this.qtAnwser.trim() + this.optionsBase1[i]);
          }

          this.showOptions = true;
        }

      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
    },
    enterKey() {
      if (this.validEmail(this.qtAnwser))
        this.$emit("QuestionAnwered", this.qtAnwser, this.questionId);
      else this.$emit("ErrorOccured", "Email inválido.", this.questionId);
    },
    chooseOption(text) {
      this.qtAnwser = this.qtAnwser + text;
      this.showOptions = false;
      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
    }
  }
};
</script>

<style scoped></style>

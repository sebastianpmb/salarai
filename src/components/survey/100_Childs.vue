<template>
  <div class="sur-qtext">
    <p class="q-title extra-bold">{{ questionText }}</p>

    <vs-row class vs-align="center" vs-justify="space-between">
      <vs-button
        vs-type="flex"
        vs-justify="center"
        v-for="opt in options"
        v-bind:key="opt.value"
        type="flat"
        class="btnOtionList"
        v-on:click="ChooseOption(opt.value)"
        >{{ opt.text }}</vs-button
      >
    </vs-row>

    <div
      v-show="showChilds"
      class="mt-3 py-3 border-top navegation-orientation"
    >
      <vs-row
        vs-justify="flex-start"
        vs-type="flex"
        v-for="(ans, index) in l"
        v-bind:key="index"
        class="mb-3"
      >
        <vs-button
          :type="getBtnType('F', index)"
          ref="F"
          class="btnOtion btn-orientation mb-2"
          v-on:click="ClickF(index)"
          >F</vs-button
        >
        <vs-button
          :type="getBtnType('M', index)"
          ref="m"
          class="btnOtion btn-orientation mb-2 mx-3"
          v-on:click="ClickM(index)"
          >M</vs-button
        >
        <vs-select
          :color="'#038835'"
          class="selectExample"
          v-model="n[index]"
          width="100px"
        >
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in optIdade"
          />
        </vs-select>
      </vs-row>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Survey-childs",
  data: () => ({
    optIdade: [
      { text: "Idade", value: 0 },
      { text: "1", value: 1 },
      { text: "2", value: 2 },
      { text: "3", value: 3 },
      { text: "4", value: 4 },
      { text: "5", value: 5 },
      { text: "6", value: 6 },
      { text: "7", value: 7 },
      { text: "8", value: 8 },
      { text: "9", value: 9 },
      { text: "10", value: 10 },
      { text: "11", value: 11 },
      { text: "12", value: 12 },
      { text: "13", value: 13 },
      { text: "14", value: 14 },
      { text: "15", value: 15 },
      { text: "16", value: 16 },
      { text: "17", value: 17 },
      { text: "18", value: 18 },
      { text: "19", value: 19 },
      { text: "20", value: 20 },
      { text: "Acima de 20", value: 21 }
    ],
    qtAnwser: "",
    dataOk: false,
    showChilds: false,
    cep: "",
    numero: 0,
    complemento: "",
    bairro: "",
    municipio: "",
    uf: "",
    qtChilds: 3,
    m1: 0,
    f2: 0,
    l: [],
    m: [],
    f: [],
    n: []
  }),
  watch: {
    n: function() {
      this.MountAnswer();
      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  mounted() {
    this.focusInput();
  },
  updated() {
    this.focusInput();
  },
  props: {
    questionText: { type: String },
    questionId: { type: Number },
    options: []
  },
  computed: {
    maxChilds: function() {
      return this.qtChilds;
    }
  },
  methods: {
    remountList() {
      this.l = [];
      for (var i = 0; i < this.qtChilds; i++) this.l.push("");
    },
    getBtnType: function(mf, index) {
      var st = "";
      if (mf == "M") {
        if (this.m) {
          if (this.m[index]) {
            if (this.m[index] == "X") st = "filled";
            else st = "border";
          } else st = "border";
        } else st = "border";
      } else {
        if (this.f) {
          if (this.f[index]) {
            if (this.f[index] == "X") st = "filled";
            else st = "border";
          } else st = "border";
        } else st = "border";
      }

      return st;
    },
    ClickM(index) {
      this.f[index] = "";
      this.m[index] = "X";
      this.MountAnswer();
      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
      this.remountList();
    },
    ClickF(index) {
      this.f[index] = "X";
      this.m[index] = "";
      this.MountAnswer();
      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
      this.remountList();
    },
    ChangeIdade() {
      this.MountAnswer();
      this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
    },
    MountAnswer() {
      this.qtAnwser = this.qtChilds + ";";
      for (var i = 0; i < this.qtChilds; i++) {
        if (this.m[i]) {
          if (this.m[i] == "X")
            this.qtAnwser = this.qtAnwser + "m:" + this.n[i] + ";";
          else this.qtAnwser = this.qtAnwser + "f:" + this.n[i] + ";";
        } else this.qtAnwser = this.qtAnwser + "f:" + this.n[i] + ";";
      }
    },
    focusInput() {
      this.$refs.fc.$el.focus();
    },
    ChooseOption1(opt) {
      this.qtAnwser = opt;
      if (opt == 0) this.enterKey();
      else {
        this.qtChilds = opt;

        for (var i = 0; i < opt; i++) {
          this.n.push(0);
          this.m.push(false);
          this.f.push(false);
        }

        this.showChilds = true;
      }
    },
    ChooseOption(opt) {
      if (opt == 0) {
        this.qtAnwser = opt;
        this.enterKey();
      } else {
        this.qtChilds = opt;
        this.l = [];
        this.n = [];
        this.m = [];
        this.f = [];

        for (var i = 0; i < opt; i++) {
          this.l.push("");
          this.n.push(0);
          this.m.push("");
          this.f.push("");
        }

        this.showChilds = true;
      }
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
/* .selectExample {
  margin: 10px;
} 
.con-select-example {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.con-select .vs-select {
  width: 100%;
}
@media (max-width: 550px) {
  .con-select {
    flex-direction: column;
  }
  .con-select .vs-select {
    width: 100%;
  }
}

.btnOtion {
  width: 40px;
}

.inp {
  background-color: white;
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
}*/
</style>

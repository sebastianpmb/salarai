<template>
  <div>
    <div class="form-group">
      <label class="black" for="nome">{{ questionText }}</label>
      <p class="observation">{{ questionObs }}</p>
      <input
        type="text"
        class="form-control"
        :placeholder="getPlaceHolder"
        v-model="qtAnwser"
        v-on:click="showList"
        v-show="showInput"
      />
      <!--v-on:keydown="allKeys"-->
    </div>

    <span></span>

    <div
      class="q-buttonlist-selected"
      vs-align="center"
      vs-type="flex"
      vs-justify="space-around"
      v-show="showSelected"
    >
      <div v-for="(opt, index) in answerList" v-bind:key="index" class="align-middle">
        <vs-icon
          icon="done"
          :color="'#038835'"
          v-on:click="removeOption(opt)"
          class="align-middle iconDeselect"
        ></vs-icon>
        <!--<vs-button :color="'#bf9f61'" type="flat" class="align-middle">{{ opt}}</vs-button>-->
        <label :color="'#038835'">{{ opt }}</label>
      </div>
    </div>

    <div class="sur-qtext">
      <!--
        <div>
            <vs-row v-for="(n,index) in answerList" v-bind:key="index">
                <vs-button  :color="'#bf9f61'" type="border" ref="'opt_' + n" class="btnOtion mb-2 " v-on:click="ChooseOption(opt.value)">{{n}}</vs-button>
            </vs-row>
        </div>

                    <vs-icon icon="details" v-on:click="showList" width="80%"></vs-icon>
      -->
      <div v-show="show" class="pt-2">
        <vs-row v-for="(opt, index) in list" v-bind:key="opt.value">
          <vs-button
            :type="getBtnType(opt.text)"
            :ref="'btn_' + index"
            class="btnOtion btn-block mb-2"
            v-on:click="ChooseOption(opt.text, $event)"
          >{{ opt.text }}</vs-button>
        </vs-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";

export default {
  name: "Survey-Input-List",
  data: () => ({
    qtAnwser: "",
    dataOk: false,
    show: false,
    showInput: true,
    list: [],
    answerList: [],
    nMax: 1,
    nselected: 0
  }),
  directives: { mask },
  props: {
    questionText: { type: String },
    questionObs: { type: String },
    questionId: { type: Number },
    options: [],
    config: { type: String }
  },
  computed: {
    showSelected: function() {
      if (this.nselected > 0) return true;
      else return false;
    },
    getPlaceHolder() {
      if (this.placeHolder) return this.placeHolder;
      else return "Digite aqui";
    }
  },
  watch: {
    qtAnwser() {
      this.allKeys();
    }
  },
  created() {
    this.showInput = true;
    this.show = false;

    if (this.config) {
      if (this.config.includes("noinput")) {
        this.showInput = false;
        this.show = true;
      }

      if (this.config.includes("n:")) {
        var opts = this.config.split(";");
        for (var i = 0; i < opts.length; i++) {
          if (opts[i].includes("n:")) {
            var r = opts[i].split(":");
            if (r[1] == "x") this.nMax = this.options.length;
            else this.nMax = r[1];
          }
        }
      }
    }
    // this.answerList = new Array(this.nMax);

    //Verificar respostas anteriores:

    if (this.$store.getters.answerValue(this.questionId)) {
      var Anwser = this.$store.getters.answerValue(this.questionId);
      this.answerList = [];
      var s = Anwser.split(";");
      if (s.length == 1) {
        this.answerList.push(s[0]);
        this.nselected++;
      }
      for (i = 0; i < s.length - 1; i++) {
        this.answerList.push(s[i]);
        this.nselected++;
      }
      this.multiSelectChanged();
      this.show = true;
    } else this.list = this.options;
  },
  methods: {
    getBtnType: function(value) {
      //alert(value);
      if (this.answerList.length != 0) {
        if (this.answerList.includes(value)) return "filled";
        else {
          return "border";
        }
      } else {
        return "border";
      }
    },
    allKeys() {
      this.list = [];
      //filtrar a lista
      for (var i = 0; i < this.options.length; i++) {
        //if (this.options[i].text.toUpperCase().startsWith(this.qtAnwser.toUpperCase().trim()))
        if (!this.answerList.includes(this.options[i].text))
          if (
            this.options[i].text
              .toUpperCase()
              .includes(this.qtAnwser.toUpperCase().trim())
          )
            this.list.push(this.options[i]);
      }
      //this.show = true;
      //this.$emit("AnswerChanged", this.qtAnwser, this.questionId);
    },
    mountAnswer: function() {
      var resp = "";
      for (var i = 0; i < this.answerList.length; i++) {
        resp = resp + this.answerList[i] + ";";
      }
      return resp;
    },
    removeOption(opt) {
      var ln = [];
      //somente remontamos a lista
      for (var i = 0; i < this.answerList.length; i++) {
        if (this.answerList[i] != opt) ln.push(this.answerList[i]);
      }

      this.answerList = ln;
      this.multiSelectChanged();

      this.nselected--;
      var resp = this.mountAnswer();
      this.$emit("AnswerChanged", resp, this.questionId);
    },

    multiSelectChanged() {
      this.list = [];
      //somente remontamos a lista
      for (var i = 0; i < this.options.length; i++) {
        if (!this.answerList.includes(this.options[i].text))
          this.list.push(this.options[i]);
      }
    },

    showList() {
      this.show = true;
    },
    CheckEscape(value) {
      var escape = false;
      if (this.config.includes("escape:")) {
        var opts = this.config.split(";");

        for (var i = 0; i < opts.length; i++) {
          if (opts[i].includes("escape:")) {
            var r = opts[i].split(":");
            if (r[1].includes(value)) escape = true;
          }
        }
      }
      return escape;
    },
    ChooseOption(opt, event) {
      if (this.nMax == 1 || this.CheckEscape(opt)) {
        if (this.showInput) this.show = false;
        this.qtAnwser = opt;
        this.answerList = [];
        this.answerList.push(opt);

        this.$emit("QuestionAnwered", this.qtAnwser, this.questionId);
      } else {
        var resp = "";
        if (this.nselected <= this.nMax) {
          this.nselected++;
          this.answerList.push(opt);
          resp = this.mountAnswer();
          this.multiSelectChanged();
          if (this.nselected == this.nMax) {
            this.$emit("QuestionAnwered", resp, this.questionId);
          } else {
            this.$emit("AnswerChanged", resp, this.questionId);
          }
        } else {
          //    this.multiSelectChanged();
          event.stopPropagation();
        }
      }
    }
  }
};
</script>

<style scoped>
/* .question .form-group > label {
  font-size: 1.25rem;
  letter-spacing: -0.48px;
  font-weight: bold;
}
.question .form-group input {
  border: none;
  border-left: 2px solid #038835 !important;
  font-size: 1.5rem;
  margin: 1rem 0 0;
}
.question .form-group input:focus {
  border: none !important;
  box-shadow: 0 0 0 0.2rem rgba(255, 255, 255) !important;
  border-left: 2px solid #038835 !important;
}
.question form .btn-primary {
  width: 50% !important;
  display: inline-block !important;
}
.question form .instrucao {
  display: inline-block;
}

.iconx {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: solid 1px #dfe2e6;
  color: #dfe2e6;
}

.btnOtion {
  width: 100%;
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
  color: #038835;
} */
</style>

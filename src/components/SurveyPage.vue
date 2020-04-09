<template>
  <div class="survey secondary bg-white">
    <!-- Navigation -->
    <HeaderGlobal :secondaryHeader="true" />
    <div class="logo-bg" />
    <div v-if="fimChap">
      <div class="container-fluid congratulations content-desktop">
        <div class="container container-content border-left-light pt-5 pb-5">
          <div class="row">
            <div class="col-lg-6 px-5">
              <!-- <img :src="getImage" class="img-fluid w-25 img-center pt-5" />-->
              <h2 class="text-secondary extra-bold pt-3">{{ endName }}</h2>
              <p class="light">{{ endTitle }}</p>
            </div>
            <div class="col-lg-6 py-3 px-5">
              <div class="row">
                <div class="col-12">
                  <div class="progress">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style="width:100%;"
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <p class="percent mb-4 text-secondary">100% Completo</p>
                  <p class="bold mt-3">{{ endMsg }}</p>
                </div>
                <div class="col-12 col-md-6 offset-md-3">
                  <!-- <button type="submit" class="btn btn-primary mt-5 mb-1">Quero ir para as finais</button> -->
                  <button
                    type="button"
                    class="btn btn-secondary btn-block mt-5 mb-1"
                    v-on:click="continueToNextChap"
                  >Continuar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container-fluid container-content question content-desktop">
        <div class="container border-left-light py-2 py-lg-5">
          <div class="row">
            <div class="col-lg-6 pl-lg-5 pr-lg-4 mt-lg-5">
              <h4 class="bold t-1">
                {{ chapTitle }}
                <p class="light">{{ chapSubTitle }}</p>
              </h4>
              <h3 class="text-secondary extra-bold">{{ chapName }}</h3>
              <p>{{ chapMsg }}</p>
              <div id="pbbar" />
              <div class="progress mb-3">
                <div
                  class="progress-bar"
                  role="progressbar"
                  :style="progressStyle"
                  :aria-valuenow="percentDone"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <p class="percent d-inline text-secondary">{{ percentDone }}% Completo</p>
              <p class="pull-right mb-2 small">
                <button
                  class="btn btn-secondary px-2 pt-0 pb-1"
                  v-on:click="gonext"
                  v-show="showNextReq"
                >
                  <small>avançar →</small>
                </button>
              </p>
              <p class="pull-right mr-3">
                <button
                  class="btn btn-secondary px-2 pt-0 pb-1"
                  v-on:click="goback"
                  v-show="showPrevReq"
                >
                  <small>← voltar</small>
                </button>
              </p>
              <h2 class="text-black extra-bold mt-5">{{ reqText }}</h2>
            </div>

            <div class="col-lg-6 pt-5 px-lg-5">
              <div class="row">
                <div class="col-12 question-navegation">
                  <h4 class="extra-bold text-secondary mb-0">Resposta:</h4>
                  <vs-alert v-if="errors.length" class="mb-3 mt-2" :active="inputInvalid">
                    <b>Aviso do VAR:</b>
                    <ul class="common-list">
                      <li v-for="error in errors" :key="error.questid">{{ error.msg }}</li>
                    </ul>
                  </vs-alert>
                  <div v-if="hasMandatory">
                    <div>
                      <questionYesNo
                        :questionText="mandatorytext"
                        :questionId="mandatoryid"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        :key="mandatoryid"
                      ></questionYesNo>
                    </div>
                    <div v-show="showReqs">
                      <div v-for="quest in filteredQuestions" v-bind:key="quest.id">
                        <questionText
                          v-if="quest.type == 1"
                          :questionText="quest.text"
                          :questionId="quest.id"
                          :placeHolder="quest.placeHolder"
                          @QuestionAnwered="QuestionAnwered"
                          @AnswerChanged="AnswerChanged"
                          :key="quest.id"
                        ></questionText>
                        <questionDate
                          v-if="quest.type == 2"
                          :questionText="quest.text"
                          :questionId="quest.id"
                          @QuestionAnwered="QuestionAnwered"
                          @AnswerChanged="AnswerChanged"
                          @ErrorOccured="ErrorOccured"
                          :key="quest.id"
                        ></questionDate>
                        <questionList
                          v-if="quest.type == 3"
                          :questionText="quest.text"
                          :questionObs="quest.obs"
                          :questionId="quest.id"
                          :options="quest.options"
                          :config="quest.config"
                          @QuestionAnwered="QuestionAnwered"
                          @AnswerChanged="AnswerChanged"
                          :key="quest.id"
                        ></questionList>
                        <questionYesNo
                          v-if="quest.type == 4"
                          :questionText="quest.text"
                          :questionId="quest.id"
                          @QuestionAnwered="QuestionAnwered"
                          @AnswerChanged="AnswerChanged"
                          :key="quest.id"
                        ></questionYesNo>
                        <questionButtonList
                          v-if="quest.type == 5"
                          :questionText="quest.text"
                          :questionId="quest.id"
                          :options="quest.options"
                          @QuestionAnwered="QuestionAnwered"
                          @AnswerChanged="AnswerChanged"
                          :key="quest.id"
                        ></questionButtonList>
                        <questionAddress
                          v-if="quest.type == 6"
                          :questionText="quest.text"
                          :questionId="quest.id"
                          :options="quest.options"
                          @QuestionAnwered="QuestionAnwered"
                          @AnswerChanged="AnswerChanged"
                          :key="quest.id"
                        ></questionAddress>
                        <questionEmail
                          v-if="quest.type == 7"
                          :questionText="quest.text"
                          :questionId="quest.id"
                          :placeHolder="quest.placeHolder"
                          @QuestionAnwered="QuestionAnwered"
                          @AnswerChanged="AnswerChanged"
                          @ErrorOccured="ErrorOccured"
                          :key="quest.id"
                        ></questionEmail>
                        <questionChilds
                          v-if="quest.type == 100"
                          :questionText="quest.text"
                          :questionId="quest.id"
                          :options="quest.options"
                          @QuestionAnwered="QuestionAnwered"
                          @AnswerChanged="AnswerChanged"
                          :key="quest.id"
                        ></questionChilds>
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div v-for="quest in currentReq.questions" v-bind:key="quest.id">
                      <questionText
                        v-if="quest.type == 1"
                        :questionText="quest.text"
                        :questionId="quest.id"
                        :placeHolder="quest.placeHolder"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        :key="quest.id"
                      ></questionText>
                      <questionDate
                        v-if="quest.type == 2"
                        :questionText="quest.text"
                        :questionId="quest.id"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        @ErrorOccured="ErrorOccured"
                        :key="quest.id"
                      ></questionDate>
                      <questionList
                        v-if="quest.type == 3"
                        :questionText="quest.text"
                        :questionObs="quest.obs"
                        :questionId="quest.id"
                        :options="quest.options"
                        :config="quest.config"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        :key="quest.id"
                      ></questionList>
                      <questionYesNo
                        v-if="quest.type == 4"
                        :questionText="quest.text"
                        :questionId="quest.id"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        :key="quest.id"
                      ></questionYesNo>
                      <questionButtonList
                        v-if="quest.type == 5"
                        :questionText="quest.text"
                        :questionId="quest.id"
                        :options="quest.options"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        :key="quest.id"
                      ></questionButtonList>
                      <questionAddress
                        v-if="quest.type == 6"
                        :questionText="quest.text"
                        :questionId="quest.id"
                        :options="quest.options"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        :key="quest.id"
                      ></questionAddress>
                      <questionEmail
                        v-if="quest.type == 7"
                        :questionText="quest.text"
                        :questionId="quest.id"
                        :placeHolder="quest.placeHolder"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        @ErrorOccured="ErrorOccured"
                        :key="quest.id"
                      ></questionEmail>
                      <questionChilds
                        v-if="quest.type == 100"
                        :questionText="quest.text"
                        :questionId="quest.id"
                        :options="quest.options"
                        @QuestionAnwered="QuestionAnwered"
                        @AnswerChanged="AnswerChanged"
                        :key="quest.id"
                      ></questionChilds>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-md-6 offset-md-3">
                  <!-- <button type="submit" class="btn btn-primary d-flex mt-5 mb-5">Ok</button> -->
                  <!-- Descomentar linha abaixo -->
                  <!-- <div v-if="getShowBtnOk"> -->
                  <!-- Descomentar linha acima -->
                  <div>
                      <div class="form-group">                         
                          <button type="button"
                                  class="btn btn-secondary btn-block mt-5 mb-5"
                                  v-on:click="submit"
                                  v-show="getShowBtnOk"
                                  >
                              Avançar
                          </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <FooterGlobal :secondaryFooter="true" />
  </div>
</template>

<script>
import QT from "./survey/1_TextQuestion.vue";
import QD from "./survey/2_DateQuestion.vue";
import IL from "./survey/3_InputListQuestion.vue";
import QYN from "./survey/4_YesNoQuestion.vue";
import BTL from "./survey/5_ButtonListQuestion.vue";
import ADR from "./survey/6_Address.vue";
import EMAIL from "./survey/7_Email.vue";
import CHILDS from "./survey/100_Childs.vue";
import CC from "./survey/ChapCard.vue";
import ECC from "./survey/EndChapCard.vue";
import FooterGlobal from "./FooterGlobal";
import HeaderGlobal from "./HeaderGlobal";
import preventBack from "vue-prevent-browser-back";

import { Survey } from "../services/Survey.js";
const s = new Survey();

export default {
  mixins: [preventBack],
  name: "SurveyPage",
  data: () => ({
    ansChanged: false,
    currentChapter: {},
    currentReq: {},
    chapId: 0,
    percent: 0.0,
    percentChap: 0.0,
    mudouChap: false,
    fimChap: false,
    fimSurvey: false,
    answerData: [],
    errors: [],
    qtErros: 0,
    mandatoryid: 0,
    mandatorytext: 0,
    hasMandatory: false,
    showReqs: false,
    showBtnOk: false,
    qtUsers: 0,
    showNextReq: true,
    showPrevReq: true
  }),
  components: {
    questionButtonList: BTL,
    questionYesNo: QYN,
    questionText: QT,
    questionDate: QD,
    questionList: IL,
    questionAddress: ADR,
    questionEmail: EMAIL,
    questionChilds: CHILDS,
    "chap-card": CC,
    "endchap-card": ECC,
    FooterGlobal,
    HeaderGlobal
  },
  computed: {
    reqText() {
      return this.currentReq.text;
    },
    inputInvalid() {
      /*
                 var ok = false;
                 if (this.errors) {
                    if (this.errors.length > 0)
                        ok = true;
                return ok;
                }*/

      if (this.qtErros == 0) return false;
      else return true;
    },
    getShowBtnOk() {
      return this.showBtnOk;
    },
    filteredQuestions() {
      var fq = [];
      for (var m = 0; m < this.currentReq.questions.length; m++) {
        if (!this.currentReq.questions[m].mandatoryReq) {
          fq.push(this.currentReq.questions[m]);
        }
      }
      return fq;
    },
    sstruct: function() {
      return this.currentChapter;
    },
    getImage: function() {
      var s = "static/assets/img/" + this.currentChapter.id + ".png";
      return s;
    },
    chapName: function() {
      var s = "";
      if (this.currentChapter.name)
        s = this.fillString(this.currentChapter.name);
      return s;
    },
    chapTitle: function() {
      var s = "";
      if (this.currentChapter.title)
        s = this.fillString(this.currentChapter.title);
      return s;
    },
    chapSubTitle: function() {
      var s = "";
      if (this.currentChapter.subTitle)
        s = this.fillString(this.currentChapter.subTitle);
      return s;
    },
    chapMsg: function() {
      var s = "";
      if (this.currentChapter.introMessage)
        s = this.fillString(this.currentChapter.introMessage);
      return s;
    },
    endName: function() {
      var s = "";
      if (this.currentChapter.endLabel)
        s = this.fillString(this.currentChapter.endLabel);
      return s;
    },
    endTitle: function() {
      var s = "";
      if (this.currentChapter.endTitle)
        s = this.fillString(this.currentChapter.endTitle);
      return s;
    },
    endSubTitle: function() {
      var s = "";
      if (this.currentChapter.endSubTitle)
        s = this.fillString(this.currentChapter.endSubTitle);
      return s;
    },
    endMsg: function() {
      var s = "";
      if (this.currentChapter.endMessage)
        s = this.fillString(this.currentChapter.endMessage);
      return s;
    },
    progressStyle: function() {
      var p = 0;
      if (this.percent > 100) p = 100;
      else p = this.percent;

      return "width: " + p + "%;";
    },
    percentDone: function() {
      if (this.percent > 100) return 100;
      else return this.percent;
    },
    progressStyleCap: function() {
      var p = 0;
      if (this.percentChap > 100) p = 100;
      else p = this.percentChap;

      return "width: " + p + "%;";
    },
    percentCap: function() {
      if (this.percentChap > 100) return 100;
      else return this.percentChap;
    }
  },

  created() {
    //this.$gtag.event("Survey", { method: "Google" });

    //this.qtUsers = this.$store.state.qtUsers;

    this.getChapter();
    if (this.$store.state.startNextReq) {
      this.nextReq(true);
      this.$store.commit("SET_StarNextReq", false);
    }

    this.showBtnOk = false;
    if (this.currentReq.config)
      if (this.currentReq.config.includes("btnok")) {
        this.showBtnOk = true;
      }
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
    ErrorOccured(value, id) {
      var payload = { questid: id, msg: value };
      if (this.errors) {
        var found = false;
        for (var i = 0; i < this.errors.length; i++) {
          if (this.errors[i].questid == id) {
            this.errors[i] = payload;
            found = true;
          }
        }
        if (!found) {
          this.errors.push(payload);
          this.qtErros++;
        }
      } else {
        this.qtErros++;
        this.errors.push(payload);
      }
    },
    RemoveError(id) {
      if (this.errors)
        for (var i = 0; i < this.errors.length; i++) {
          if (this.errors[i].questid == id) {
            this.errors.splice(i, 1);
            this.qtErros--;
          }
        }

      if (this.errors.length == 0) {
        this.errors = [];
        this.qtErros = 0;
      }
    },
    AnswerChanged(value, id) {
      this.ansChanged = true;
      var payload = { questid: id, value: value };
      this.RemoveError(id);
      this.$store.commit("SET_Answer", payload);
    },
    QuestionAnwered(value, id) {
      this.ansChanged = true;
      if (this.hasMandatory) {
        if (id == this.mandatoryid) {
          if (value == "Sim") this.showReqs = true;
          else this.showReqs = false;
        }
      }

      this.RemoveError(id);

      var payload = { questid: id, value: value };
      this.$store.commit("SET_Answer", payload);

      if (this.hasMandatory) {
        if (id == this.mandatoryid) {
          if (value != "Sim") this.saveAnswers();
        } else {
          //aqui
          if (this.checkReqComplete()) this.saveAnswers();
        }
      } else {
        if (this.checkReqComplete()) this.saveAnswers();
      }
    },
    goback() {
      this.prevReq();
    },
    gonext() {
      if (this.checkReqComplete()) {
        if (this.ansChanged) {
          this.submit();
        } else {
          this.nextReq(true);
        }
      }
    },
    submit() {
      //verificar se todo o quesito foi respondido
      if (this.checkReqComplete()) {
        if (this.qtErros == 0) this.saveAnswers();
      } else {
        if (this.fimChap) window.scrollTo(0, 0);
        else {
          var element = document.getElementById("pbbar");
          element.scrollIntoView();
        }

        window.scrollTo(0, 0);
      }
    },
    checkReqComplete: function() {
      var ok = false;
      var qtOk = 0;

      //se mandatoryreq e nao, ok
      var manswer = this.$store.getters.answerValue(this.mandatoryid);

      if (this.hasMandatory && manswer == "Não") {
        ok = true;
      } else {
        for (var i = 0; i < this.currentReq.questions.length; i++) {
          var qid = this.currentReq.questions[i].id;
          //const countAnwsers = this.$store.state.answers.filter(item => item.questid === qid).length
          if (this.$store.state.answers[qid]) {
            if (this.$store.state.answers[qid] != "") qtOk++;
            else {
              this.ErrorOccured(
                "Responder: " + this.currentReq.questions[i].text,
                qid
              );
            }
          } else {
            this.ErrorOccured(
              "Responder:" + this.currentReq.questions[i].text,
              qid
            );
          }
        }

        if (qtOk == this.currentReq.questions.length) {
          ok = true;
          this.qtErros = 0;
          this.errors = [];
        }
      }
      return ok;
    },
    saveAnswers() {
      var ans = [];
      for (var i = 0; i < this.currentReq.questions.length; i++) {
        var pid = this.currentReq.questions[i].id;

        if (this.$store.state.answers[pid]) {
          ans.push({
            questionId: pid,
            answer: this.$store.state.answers[pid]
          });
        }
      }
      s.SaveAnswers(
        this.$store.state.surveyUserId,
        this.$store.state.currentReq,
        this.$store.state.currentChapter,
        ans
      ).then(
        ret => {
          if (ret) {
            this.nextReq(false);
          }
        },
        err => alert(err)
      );
    },
    saveAnswer() {
      s.AddAnswer(this.$store.state.surveyUserId, 1, this.answerData[0]).then(
        ret => {
          if (ret) {
            this.answerData = [];
            this.nextReq(false);
          }
        },
        err => alert(err)
      );
    },
    checkMandatory() {
      this.hasMandatory = false;
      this.showReqs = false;
      for (var m = 0; m < this.currentReq.questions.length; m++) {
        if (this.currentReq.questions[m].mandatoryReq) {
          this.mandatoryid = this.currentReq.questions[m].id;
          this.mandatorytext = this.currentReq.questions[m].text;
          this.hasMandatory = true;
          break;
        }
      }

      if (this.hasMandatory) {
        var manswer = this.$store.getters.answerValue(this.mandatoryid);
        if (manswer == "Sim") {
          this.showReqs = true;
        }
      }
    },
    continueToNextChap() {
      this.nextChapter();
      this.percent = 0;
      this.fimChap = false;
      this.mudouChap = !this.mudouChap;
      this.errors = [];
      this.inputInvalid = false;
    },
    checkCond(cond, valToCheck, valueCond) {
      var resp = false;
      var values;
      var resps;
      var i;
      var r;

      if (cond == "=|") {
        resp = true;
        values = valueCond.split("/#");
        resps = valToCheck.split(";");
        for (r = 0; r < resps.length; r++) {
          for (i = 0; i < values.length; i++) {
            if (resps[r] != values[i]) resp = false;
          }
        }
      }

      if (cond == "!&") {
        resp = true;
        values = valueCond.split("/#");
        resps = valToCheck.split(";");
        for (r = 0; r < resps.length; r++) {
          for (i = 0; i < values.length; i++) {
            if (resps[r] == values[i]) resp = false;
          }
        }
      }

      if (cond == "=") {
        if (valToCheck == valueCond) resp = true;
      }

      if (cond == "!") {
        if (valToCheck != valueCond) resp = true;
      }

      return resp;
    },
    prevReq() {
      var i;
      var skip = false;
      var inicio = 0;
      var changedCap = false;
      this.showBtnOk = false;
      this.errors = [];
      this.inputInvalid = false;
      //verificar se estamos no inicio do cápitulo
      var ii;
      for (ii = this.currentChapter.requirements.length - 1; ii >= 0; ii--) {
        var cc = this.currentChapter.requirements[ii];
        if (cc.id == this.currentReq.id) {
          // achei o req
          var nex = this.currentChapter.requirements[ii - 1];
          if (!nex) {
            //inicio do capitulo

            if (this.currentChapter.id > 1) {
              var c = this.$store.state.surveyStruct.chapters;
              this.currentChapter = c[this.currentChapter.id - 2];
              inicio = this.currentChapter.requirements.length - 1;
              this.chapId = this.currentChapter.id;
              this.$store.commit("SET_Chapter", this.currentChapter.id);
              this.currentReq = this.currentChapter.requirements[
                this.currentChapter.requirements.length - 1
              ];
              changedCap = true;
            }
          } else {
            inicio = ii;
            break;
          }
        }
      }

      if (inicio == 0) inicio = this.currentChapter.requirements.length - 1;

      for (i = inicio; i >= 0; i--) {
        var r = this.currentChapter.requirements[i];

        if (
          (r.id = this.currentReq.id) ||
          (r.id < this.currentReq.id && skip) ||
          changedCap
        ) {
          var nextr;

          if (changedCap) {
            changedCap = false;
            nextr = r;
          } else {
            nextr = this.currentChapter.requirements[i - 1];
          }

          skip = false;

          if (nextr.config) {
            //Check skip
            if (nextr.config.includes("skip")) {
              //procurar o skip dentro do config
              var cnf = nextr.config.split(";");
              for (var ci = 0; ci < cnf.length; ci++) {
                if (cnf[ci].includes("skip")) {
                  var cond = cnf[ci].split(",");
                  var reqid = cond[1];
                  // 1: numero da pergunta, 2: condição 3: valor
                  if (this.$store.state.answers[reqid]) {
                    var val = this.$store.state.answers[reqid];
                    skip = this.checkCond(cond[2], val, cond[3]);
                  }
                  break;
                }
              }
            }
          }

          this.currentReq = nextr;
          this.$store.commit("SET_Req", this.currentReq.id);

          if (this.chapId == 1) if (i == 1) this.showPrevReq = false;

          if (!skip) break;
        }
      }

      this.checkMandatory();
      this.showBtnOk = false;

      if (this.currentReq.config)
        if (this.currentReq.config.includes("btnok")) {
          this.showBtnOk = true;
        }

      this.ansChanged = false;
      this.showNextReq = true;
    },
    nextReq(nav) {
      var i;
      var skip = false;
      this.showBtnOk = false;
      this.errors = [];
      this.inputInvalid = false;

      for (i = 0; i < this.currentChapter.requirements.length; i++) {
        var r = this.currentChapter.requirements[i];
        if (r.id == this.currentReq.id || (r.id > this.currentReq.id && skip)) {
          if (i + 1 == this.currentChapter.requirements.length) {
            const s = this.$store.state.surveyStruct;
            var c = s.chapters;

            if (nav) {
              //Se for o último capitulo deixar.
              if (this.currentChapter.id == c.length) {
                this.fimSurvey = true;
              } else {
                this.fimChap = false;
                this.nextChapter();
                break;
              }
            } else this.fimChap = true;
          } else {
            var nextr = this.currentChapter.requirements[i + 1];
            skip = false;
            if (nextr.config) {
              if (nextr.config.includes("skip")) {
                //procurar o skip dentro do config
                var cnf = nextr.config.split(";");
                for (var ci = 0; ci < cnf.length; ci++) {
                  if (cnf[ci].includes("skip")) {
                    // 1: numero da pergunta, 2: condição 3: valor
                    var cond = cnf[ci].split(",");
                    var reqid = cond[1];
                    if (this.$store.state.answers[reqid]) {
                      var val = this.$store.state.answers[reqid];
                      skip = this.checkCond(cond[2], val, cond[3]);
                    }
                    break;
                  }
                }
              }
            }
            if (!skip) {
              this.showPrevReq = true;
              this.currentReq = nextr;
              this.$store.commit("SET_Req", this.currentReq.id);
              if (this.currentReq.id > this.$store.state.lastReq) {
                this.$store.commit("SET_LastReq", this.currentReq.id);
                this.percent = Math.ceil(
                  ((i + 1) / this.currentChapter.requirements.length) * 100
                );
              }
              break;
            }
          }
        }
      }

      if (this.fimSurvey) {
        this.$router.push("finalsurvey");
      }

      this.checkMandatory();

      this.showBtnOk = false;
      if (this.currentReq.config)
        if (this.currentReq.config.includes("btnok")) {
          this.showBtnOk = true;
        }

      if (this.fimChap) {
        this.$router.push("finalsurvey");
      } else {
        if (!nav) {
          var element = document.getElementById("pbbar");
          element.scrollIntoView();
        }
      }
    },
    getChapter() {
      const s = this.$store.state.surveyStruct;
      var c = s.chapters;
      if (this.$store.state.currentChapter == 0) {
        this.currentChapter = c[0];
        this.$store.commit("SET_Chapter", c[0].id);
        this.chapId = c[0].id;
        this.currentReq = this.currentChapter.requirements[0];
        this.percent = 0;
        this.percentChap = 0;
        this.showPrevReq = false;
      } else {
        var i;
        for (i = 0; i < c.length; i++) {
          if (c[i].id == this.$store.state.currentChapter) {
            this.currentChapter = c[i];
            this.chapId = this.currentChapter.id;
            break;
          }
        }
        //get the requirement

        this.percentChap = Math.ceil(((i + 1) / c.length) * 100);

        if (this.$store.state.currentReq == 0) {
          if (this.currentChapter.requirements != null) {
            this.currentReq = this.currentChapter.requirements[0];
            this.$store.commit("SET_Req", this.currentReq.id);
            this.$store.commit("SET_LastReq", this.currentReq.id);
            this.showPrevReq = false;
          }
          this.percent = 0;
        } else {
          for (i = 0; i < this.currentChapter.requirements.length; i++) {
            if (
              this.currentChapter.requirements[i].id ==
              this.$store.state.currentReq
            ) {
              this.currentReq = this.currentChapter.requirements[i];
              this.showPrevReq = true;
              this.percent = Math.ceil(
                ((i + 1) / this.currentChapter.requirements.length) * 100
              );
              break;
            }
          }
        }
      }

      this.checkMandatory();

      this.showBtnOk = false;

      if (this.currentReq.config)
        if (this.currentReq.config.includes("btnok")) {
          this.showBtnOk = true;
        }
      window.scrollTo(0, 0);
    },
    nextChapter() {
      const s = this.$store.state.surveyStruct;
      var c = s.chapters;
      for (var i = 0; i < c.length; i++) {
        if (c[i].id == this.$store.state.currentChapter) {
          //verifica se acabou
          if (i + 1 == c.length) {
            this.fimSurvey = true;
            this.percentChap = 100;
          } else {
            this.currentChapter = c[i + 1];
            this.chapId = this.currentChapter.id;
            this.$store.commit("SET_Chapter", this.currentChapter.id);
            if (this.currentChapter != null) {
              this.currentReq = this.currentChapter.requirements[0];
              this.$store.commit("SET_Req", this.currentReq.id);
            }

            this.percentChap = Math.ceil(((i + 1) / c.length) * 100);
          }
          break;
        }
      }

      if (this.fimSurvey) {
        this.$router.push("finalsurvey");
        window.scrollTo(0, 0);
      } else {
        this.checkMandatory();

        this.showBtnOk = false;
        if (this.currentReq.config)
          if (this.currentReq.config.includes("btnok")) {
            this.showBtnOk = true;
          }
        window.scrollTo(0, 0);
      }
    }
  }
};
</script>

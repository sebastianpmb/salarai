import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/* eslint-disable */

export default new Vuex.Store({

    state: {    
        guestData: {},
        surveyStruct: {},
        currentChapter: 0,
        currentReq: 0,
        lastReq: 0,
        startNextReq: false,
        surveyUserId: "",
        TermsAccepted: false,
        qtUsers: 0,
        userId: "",
        answers:[]
  },
    mutations: {
        SET_GuestData(state, g) {
            state.guestData = g;
        },
        SET_QtUsers(state, v) {
            state.qtUsers = v;
        },
        SET_UserId(state, v) {
            state.userId = v;
        },
        SET_StarNextReq(state, v) {             
            state.startNextReq = v;            
        },
        SET_TermsAccepted(state, v) {
            state.TermsAccepted = v;
        },

        SET_Answer(state, v) {
            state.answers[v.questid] = v.value;
        },
        SET_SurveyUserId(state, s) {
            state.surveyUserId = s;
        },
        SET_SurveyStruct(state, s) {
            state.surveyStruct = s;
        },
        SET_Chapter(state, val) {
            state.currentChapter = val;
        },
        SET_Req(state, val) {
            state.currentReq = val;
        },        
        SET_LastReq(state, val) {
            state.lastReq = val;
        }        
  },  
  actions: {
  	
  },
  getters:{    
      answerValue: (state) => (qId) => {
          return state.answers[qId];
      }
  }
})

//export default store

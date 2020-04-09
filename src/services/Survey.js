/// <reference path="../fanbase/Config.js" />
import { baseDomain, baseEnv, baseSurveyID } from "../fanbase/Config.js";

import axios from "axios";

const baseUrl = `${baseDomain}/${baseEnv}`;

export class Users {
  constructor() {}

  login(user, pwd) {
    return new Promise((resolve, reject) => {
      const cmd = `${baseUrl}/Login?User=${user}&Pwd=${pwd}`;
      axios.get(cmd).then(
        r => {
          if (r.data.header.codigo == 1) {
            resolve(true);
          } else {
            reject(r.data.header.msg);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }
}

export class Survey {
  constructor() {}

  Start(Cpf, Mobile) {
    return new Promise((resolve, reject) => {
      const cmd = `${baseUrl}/Start`;

      axios
        .post(cmd, { cpf: Cpf, mobile: Mobile, surveyID: baseSurveyID })
        .then(
          r => {
            if (r.data.header.codigo == 1) {
              resolve(r.data.data);
            } else {
              reject(r.data.header.msg);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }

    End(userSurveyId) {
        return new Promise((resolve, reject) => {
            const cmd = `${baseUrl}/EndSurvey?surveyId=${userSurveyId}`;

            axios
                .post(cmd)
                .then(
                    r => {
                        if (r.data.header.codigo == 1) {
                            resolve(r.data.data);
                        } else {
                            reject(r.data.header.msg);
                        }
                    },
                    err => {
                        reject(err);
                    }
                );
        });
    }

  CheckStart(Cpf) {
    return new Promise((resolve, reject) => {
      const cmd = `${baseUrl}/CheckStart`;
      var Mobile = "";
      axios
        .post(cmd, { cpf: Cpf, mobile: Mobile, surveyID: baseSurveyID })
        .then(
          r => {
            if (r.data.header.codigo == 1) {
              resolve(r.data.data);
            } else {
              reject(r.data.header.msg);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }

  GetData() {
    return new Promise((resolve, reject) => {
      const cmd = `${baseUrl}/datas/${baseSurveyID}`;
      axios.get(cmd).then(
        r => {
          if (r.data.header.codigo == 1) {
            resolve(r.data.data);
          } else {
            reject(r.data.header.msg);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  }

  AddAnswer(userSurveyId, questionId, answer) {
    return new Promise((resolve, reject) => {
      const cmd = `${baseUrl}/Answer`;

      axios
        .post(cmd, {
          userSurveyId: userSurveyId,
          questionId: questionId,
          answer: answer
        })
        .then(
          r => {
            if (r.data.header.codigo == 1) {
              resolve(r.data.header.msg);
            } else {
              reject(r.data.header.msg);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }

  SaveAnswers(userSurveyId, req, chap, answers) {
    return new Promise((resolve, reject) => {
      const cmd = `${baseUrl}/saveanswers`;

      axios
        .post(cmd, {
          userSurveyId: userSurveyId,
          req: req,
          chap: chap,
          answers: answers
        })
        .then(
          r => {
            if (r.data.header.codigo == 1) {
              resolve(r.data.header.msg);
            } else {
              reject(r.data.header.msg);
            }
          },
          err => {
            reject(err);
          }
        );
    });
  }
}

export class utils {
  constructor() {}

  getCep(cep) {
    return new Promise((resolve, reject) => {
      if (cep.length == 8) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(
          response => {
            resolve(response.data);
          },
          error => {
            reject(error);
          }
        );
      }
    });
  }
}

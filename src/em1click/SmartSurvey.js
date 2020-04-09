import { baseDomain, baseEnv } from "../fanbase/Config.js";

import axios from "axios";

const baseUrl = `${baseDomain}/${baseEnv}`;

export class utils {
  constructor() {}

  getCep(cep) {
    return new Promise((resolve, reject) => {
      if (cep.length == 8) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then(
          (response) => {
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
      }
    });
  }
}

export class Guest {
  constructor() {}

  GetData(gid) {
    return new Promise((resolve, reject) => {
      const cmd = `${baseUrl}/guest/${gid}`;
      axios.get(cmd).then(
        (r) => {
          if (r.data.header.codigo == 1) {
            resolve(r.data.data);
          } else {
            reject(r.data.header.msg);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  UpdateGuest(gdata) {
    return new Promise((resolve, reject) => {
      const cmd = `${baseUrl}/guest`;     
      axios
        .post(cmd, {
          Id: gdata.id,
          Cpf: gdata.cpf,
          Rg: gdata.rg,
          Nome: gdata.nome,
          SobreNome: gdata.sobreNome,
          Celular: gdata.celular,
          Email: gdata.email,
        })
        .then(
          (r) => {
            if (r.data.header.codigo == 1) {
              resolve(r.data.header.msg);
            } else {
              reject(r.data.header.msg);
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }
}

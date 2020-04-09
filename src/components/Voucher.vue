<template>
  <div class="home">
    <HeaderGlobal :secondaryHeader="false" />
    <div class="logo-bg" />
    <div class="container-fluid">
      <div class="container container-content border-left-light pt-md-5 pb-5">
        <div class="row">
          <div class="col-lg-5 pl-md-5 pr-md-0 px-5">
            <h4 class="white bold pt-3">Convidado (a):</h4>
            <div class="white my-3">
              <!-- <p class="extra-bold">{{ nome }}</p> -->
              <!-- <p class="extra-bold">{{ sobreNome }}</p> -->
              <!-- <p class="extra-bold">RG: {{ rg }}</p> -->
              <!--<p class="light">{{userId}}</p>-->
              <!-- <h3 class="yellow extra-bold">{{ userId }}</h3> -->
            </div>
            <h4 class="white bold py-2 my-4 border-bottom border-top">São Paulo FC x Santos FC</h4>
            <p class="white">📅 20/02/2020</p>
            <p class="white">🕓 20:30h</p>
            <p class="white border-bottom pb-4">🚩 Estádio do Morumbi</p>

            <p class="white">
              <strong>Apresente este voucher na estrada do próprio camarote.</strong>
            </p>
          </div>
          <div class="col-lg-6 offset-lg-1 pt-2 pl-md-5 pr-md-0 px-5">
            <p class="white">
              Dirija-se até o portão 17 do Estádio do Morumbi localizado na
              Avenida Giovanni Gronchi e siga até a 2º entrada dos camarotes
              (entrada 17b). Lá, haverá uma recepcionista que indicará a entrada
              da Sala Raí. A recepcionista fará o check-in e entregará os
              ingressos para entrada no Camarote, mediante apresentação de um
              documento original com foto.
            </p>
            <p class="white">
              O horário de abertura da Sala Raí não segue o mesmo horário de
              abertura dos portões do Estádio do Morumbi. Receberemos os
              convidados sempre uma hora antes do jogo e o Estádio do Morumbi
              não possui estacionamento.
            </p>
            <p class="white">
              Ah! E já íamos nos esquecendo: no Morumbi, não é permitida a
              entrada com uniformes de outros clubes que não o São Paulo FC, bem
              como bandeiras, camisas, boné, mochila ou qualquer item que tenha
              o símbolo de outro time.
            </p>
            <p class="white">Uma excelente experiência para vocês!</p>
          </div>
        </div>
      </div>
    </div>
    <FooterGlobal />
  </div>
</template>

<script>
import HeaderGlobal from "./HeaderGlobal.vue";
import FooterGlobal from "./FooterGlobal.vue";

export default {
  name: "SurveyFinal",
  data: () => ({
    qtUsers: 0
  }),
  components: {
    HeaderGlobal,
    FooterGlobal
  },
  computed: {
    userId() {
      var n = "";

      if (this.$store.state.guestData.nome) n = this.$store.state.guestData.id;
      return n;
    },
    nome() {
      var n = "";

      if (this.$store.state.guestData.nome)
        n = this.$store.state.guestData.nome;

      return n;
    },
    sobreNome() {
      var n = "";

      if (this.$store.state.guestData.sobreNome)
        n = this.$store.state.guestData.sobreNome;

      return n;
    },
    rg() {
      var n = "";

      if (this.$store.state.guestData.rg) n = this.$store.state.guestData.rg;

      return n;
    }
  },
  created() {},
  methods: {}
};
</script>
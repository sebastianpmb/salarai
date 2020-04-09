<template>
    <vs-card class="cardx cardCapitulo">
        <!--<div slot="header">

    </div>-->
        <div class="chaptitle">
            <span class="text-style-1">{{chapTitle}}</span>&nbsp;<span>{{chapSubTitle}}</span>
        </div>
        <div class="Msg">
            <p class="chapname">
                {{chapName}}
            </p>
            <p class="chapmess">                
                {{chapMsg}}                
            </p>
        </div>
    </vs-card>
</template>

<script>
export default {
        name: 'Chapter-Desc-Text',
        data: () => ({        
        qtAnwser: ""
        }),
        props: {
            chapTitle: { type: String },
            chapSubTitle: { type: String },
            chapName: { type: String },
            chapMsg: { type: String }
        }
    }

    
</script>

<style scoped>
      .chaptitle {
        /*width: 214px;*/
        height: 59px;
        font-size: 18px;
        font-weight: 300;
        font-stretch: normal;
        font-style: normal;
        line-height: 3.28;
        letter-spacing: -0.36px;
        color: #40424a;
    }

        .chaptitle .text-style-1 {
            font-size: 24px;
            font-weight: 800;
            letter-spacing: -0.48px;
        }

    .chapname {
        
        font-size: 48px;
        font-weight: 800;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.23;
        letter-spacing: -0.96px;
        color: #bf9f61;
    }

.chapmess {
    
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.36px;
  color: #40424a;
}
</style>
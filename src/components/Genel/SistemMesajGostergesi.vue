<template>
    <div class="row justify-content-center">
        <transition
            enter-class=""
            enter-active-class="animated wobble"
            leave-class=""
            leave-active-class="animated swing"
            appear>

            <div class="sistem-mesaj" v-if="sistemMesaji.metin != null">
                <p style="text-align: end;  z-index:6; position:sticky; margin: 0px 10px -35px 0px ;" @click="sistemMesaji.metin=null"> X </p> 
                <div class="alert alert-info col-12" v-if="sistemMesaji.mesajTuru == 1"><i class="fas fa-check-circle fa-lg"></i> {{ sistemMesaji.metin }}</div>
                <div class="alert alert-danger col-12" v-else-if="sistemMesaji.mesajTuru == 2"><i class="fas fa-times-circle fa-lg"></i> {{ sistemMesaji.metin }}</div>            
            </div>
          </transition>
        
    </div>
</template>
<script>
    export default{
        data(){
            return{
                sistemMesaji : this.$store.state.sistemMesaji,
            }
        },
        watch:{
            '$store.state.sistemMesaji'(){
              this.sistemMesaji = this.$store.state.sistemMesaji;

              setTimeout(()=>{
                this.sistemMesaji.metin = null;
              }, 3000)
            }
          },
    }
</script>
<style scoped>
    .sistem-mesaj{
        position:fixed;
        z-index:3;
        top: 20px;
        border-radius: 5px;
        box-shadow:  rgb(72, 71, 71) 2px 2px  6px;       
        font-weight:700;
    }
    .sistem-mesaj .alert{
        width:600px;
        padding-left: 20px;
        padding-top: 40px;
        padding-bottom:30px;
        margin: 0px;
    }

</style>
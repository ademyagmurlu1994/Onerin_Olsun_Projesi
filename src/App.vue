<template>
    <div>
      <div class="col-lg-12"  style="background-size: cover; height:1000px;" :style="{ backgroundImage: 'url(' + image + ')' }">
          <!-- <router-view name="header-top"></router-view>-->
          <app-header></app-header>
          <app-sistem-mesaj-gostergesi></app-sistem-mesaj-gostergesi>
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
          
        </div>
    </div>
  </template>
  
  <script>
    import Header from "./components/Genel/Header";
    import SistemMesajGostergesi from "./components/Genel/SistemMesajGostergesi";
    export default {
      data(){
        return {
          image: ""
        }
      },
      components: {
        appHeader: Header,
        appSistemMesajGostergesi: SistemMesajGostergesi
      },
      methods:{
        doldur(){
          if(this.$route.path == "/login"){
            this.image= "'../public/images/login_background.jpg'";
          }
          else if(this.$route.path =="/register"){
            this.image= "'../public/images/register_background.jpg'";
          }else if(this.$route.path == "/parolamiunuttum"){
            this.image= "'../public/images/parolami_unuttum_background.jpg'";
          }else if(this.$route.path == "/oneriyayinlama"){
            this.image= "'../public/images/oneri_yayinlama_background.jpg'";
          }
          else{
            this.image= "";
          }
        }
      },
      watch:{
        "$route"(to, from){
            this.doldur();
        }
      },
      created(to, from){
        this.doldur();
      },
    }
</script>
<style>
  .slide-enter{
    opacity: 0;
  }
  .slide-enter-active{
    animation: slide-in 1s ease-out forwards;
    transition: opacity 0.5s;
  }
  .slide-leave{
    opacity: 0;
  }
  .slide-leave-active{
    animation: slide-out 0.3s ease-out forwards;
    transition: opacity 0.3s;
    opacity: 0;
    position: absolute;
  }

  @keyframes slide-in{
    from {
      transform: translateY(20px);
    }
    to{
      transform: translateY(0px);
    }
  }
  @keyframes slide-out{
    from{
      transform: translateY(0px);
    }
    to{
      transform: translateY(20px);
    }
  }
</style>

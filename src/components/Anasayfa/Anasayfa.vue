<template>
    <div class="row">
        <!-- <router-link to="/oneriyayinlama" tag="button" class="btn btn-success"> Öneri Ekle </router-link> -->
         <div class="col-lg-3 mt-2">
            <app-sidebar></app-sidebar>
        </div>
        <div class="col-lg-6 col-md-12 mt-3">
            <div class="row dflex justify-content-center">
                <router-link tag="button" to="/oneriyayinlama" class="btn btn-success mr-4" ><i class="fas fa-plus fa-lg"></i> Öneri Yayınla</router-link>
                <router-link tag="button" to="/oneriyayinlama" class="btn btn-info"><i class="fas fa-plus fa-lg"></i> Fikir Yayınla</router-link>
            </div>
            <div class="row dfex justify-content-center mt-3" >
                <app-carousel></app-carousel>
            </div>
            <div class="row dfex justify-content-center mt-3 ml-2 onerigoruntuleme">
                <app-oneri-goruntuleme></app-oneri-goruntuleme>
            </div>
        </div>
        <div class="col-lg-3">
            <app-duyurular></app-duyurular>
        </div>
    </div>
</template>
<script>
    import Sidebar from "./Sidebar";
    import Carousel from "./Carousel";
    import OneriGoruntuleme from "../Oneri/OneriGoruntuleme";
    import Duyurular from "./Duyurular";
    export default{
        components:{
            appSidebar: Sidebar,
            appCarousel: Carousel,
            appOneriGoruntuleme: OneriGoruntuleme,
            appDuyurular: Duyurular,
        }
    }
</script>
<style>
    /*.carousel-item .img-fluid {
        width:100%;
        height:100%;
      }
    #demo{
        box-shadow: 6px 4px 4px rgb(15, 16, 17);
    }*/
      
</style>
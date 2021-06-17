<template>
    <div class="row">
        <div class="col-lg-3 col-sm-12 col-xs-12 ml-4">
            <div class="row">
                <div class="col-lg-10 col-sm-12 col-xs-12">
                     <div class="profil_box">
                         <div class="col-12">
                            <img class="profil_fotografi":src="this.$store.state.kullanici.profil_fotografi == null ? '../../../public/images/profil/profil_default.png': this.$store.state.kullanici.profil_fotografi" >
                            <h5 style="margin-top: 8px; color:rgb(33, 132, 147); ">{{$store.state.kullanici.name}} {{$store.state.kullanici.surname}}</h5>
                         </div>
                    </div>
                    <app-profil-sidebar></app-profil-sidebar>
                </div>
            </div>
        </div>
        <div class="col-lg-8">
            <router-view></router-view>
        </div>
    </div> 
</template>
<script>
    import ProfilSidebar from "./ProfilSidebar";
    export default{
        data(){
            return{
                
            }
        },
        components:{
            appProfilSidebar: ProfilSidebar
        },
        methods:{
            yenile(){
                
                this.$forceUpdate();
            },
        }
    }
</script>
<style scoped>
    .profil_box{
        text-align: center;
        padding: 10px;
        box-shadow: rgb(223, 222, 222) 0px 0px 4px 1px;
        border: solid rgba(0, 0, 0, 0.108) 1px;
        border-radius: 30px  0 30px 0;
        margin-bottom:10px; 
        margin-top:10px;
    }
    .profil_fotografi{
        width: 240px; 
        height: 175px;
        border-radius: 30px 0 30px 0;
        border: solid rgba(0, 0, 0, 0.108) 1px; 
    }


</style>
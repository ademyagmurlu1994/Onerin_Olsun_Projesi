<template>
    <div class="bg-light border-top"  id="bottombar-wrapper">
        <div class="list-group  flex-row">
            <a class="list-group-item main-item" :class="{'active': aktifSekme==1 }" @click="aktifSekme = 1"><i class="fas fa-comments fa-lg"></i><span class="arrow">  Yorumlar 25</span></a>
            <a class="list-group-item main-item" :class="{'active': aktifSekme==2 }" @click="aktifSekme = 2"><i class="fas fa-comments fa-lg"></i><span class="arrow">  Tartışmalar</span></a>
            <a class="list-group-item main-item" :class="{'active': aktifSekme==3 }" @click="aktifSekme = 3"><i class="fas fa-comments fa-lg"></i><span class="arrow">  Geliştirmeler</span></a>
            


            <!--
               <router-link active-class="active" to="/" tag="a" class="list-group-item list-group-item-action main-item active">
                <i class="fas fa-comments fa-lg" ></i><span class="arrow">  Yorumlar</span>
            </router-link>

            <router-link active-class="active" to="{ name: 'fikirlerim', params: { kullaniciId: kullaniciId }}" tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-brain fa-lg"></i><span class="arrow"> Tartışmalar </span>
            </router-link>

            <router-link active-class="active" to="{ name: 'mesajlarim', params: { kullaniciId: kullaniciId }}" tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-box-open fa-lg" ></i><span class="arrow"> Geliştirmeler </span>
            </router-link> 
            -->
            
        </div>
        <div class="col-lg-12" v-if="aktifSekme == 1">
            <app-oneri-yorumlar></app-oneri-yorumlar>        
        </div>
        <div class="col-lg-12" v-if="aktifSekme == 2">
            Tartışmalar yakında ....    
        </div>
        <div class="col-lg-12" v-if="aktifSekme == 3">
            Geliştirmeler pek yakında ....  
        </div>
    </div>
</template>
<script>
    import OneriYorumlar from "./OneriYorumlar"; 
    export default{
        data(){
            return{
                kullaniciId: this.$store.state.kullanici.id,
                aktifSekme: 1
            }
        },
        components:{
            appOneriYorumlar: OneriYorumlar,
        },
    }
</script>


<style scoped>
    #bottombar-wrapper{
        padding: 0px;
        /*
        min-width: 102.7%;        
        
        margin-left: -15px;*/
    }
    #bottombar-wrapper .list-group-item.active{
        background-color: rgb(19, 133, 126);
    }
    #bottombar-wrapper .main-item i{
        color:rgb(126, 209, 201);
    }
   
    #bottombar-wrapper .main-item:hover{
        background-color: rgba(27, 145, 127, 0.047);
        color: rgb(0, 0, 0);
    }
      
    #bottombar-wrapper #page-content-wrapper {
        min-width: 100vw;
        background-color: aqua;
    }    

    #bottombar-wrapper .list-group-item{
        font-size: 15px;
        font-weight: 700;
        width: 170px;
        cursor: pointer;
    }
          
</style>



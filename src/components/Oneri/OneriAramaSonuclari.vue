<template>
    <div class="row">
            <div class="col-12 mt-3">
            <h3 style="color: rgb(55, 171, 213); text-align:center;">Öneri Arama Sonuçları</h3>
            <hr style="border: none; height: 2px; color: #333; background-color: #333;">
                
                  <div class="row">
                    <div v-for="oneri in oneriler" class="col-lg-3 col-md-6 col-sm-12  oneriler-item mb-3">
                        <router-link :to="{ name: 'oneriAyrinti', params: { oneriId: oneri.id }}" tag="span" style="cursor: pointer;">
                            <h3 style="margin-top:10px;  text-align:center; " class="oneri-baslik">{{ oneri.baslik }}</h3>
                            <img :src="oneri.image" class="" v-if="oneri.image==null? oneri.image='../../../public/images/default_image.jpg': oneri.image=oneri.image" :alt="oneri.baslik">  
                        </router-link>
                        <p>{{ oneri.icerik }} ...</p>
                        <div class="row oneri-item-footer">
                            <router-link :to="{ name: 'oneriAyrinti', params: { oneriId: oneri.id }}" tag="button" class="btn btn-info btn-sm col-xs-4 btn_ayrinti">Ayrıntılara gözat</router-link>
                            <p class="col">{{oneri.created_at}}</p>
                        </div>
                    </div>
                </div>




                <!--
                    <div class="row">
                    <div class="item_oneri col-lg-4 col-md-12">
                        <h3>sadfasdfasdfasdf</h3>
                        <img src="../../../public/images/default_image.jpg" alt="">
                        <p>asdfasdfasdfasdfasdfasdfasdfasdfasdf
                            sadfasdfasdfasdfasdf
                            asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfas
                            asdfasdfasdfasdf
                        </p>
                    </div>
                </div>
                

                <div class="row">
                    <div v-for="oneri in oneriler" class="col-lg-3 col-md-6 col-sm-12  oneriler-item mb-3">
                        <router-link :to="{ name: 'oneriAyrinti', params: { oneriId: oneri.id }}" style="cursor: pointer;">
                            <h6 style="margin-top:10px; color: black;">{{ oneri.baslik }}</h6>
                            <img :src="oneri.image" class="" v-if="oneri.image==null? oneri.image='../../../public/images/default_image.jpg': oneri.image=oneri.image">  
                        </router-link>
                        <p>asdfasdfasdfasdfasdfasdfasdfasdfasdf
                            sadfasdfasdfasdfasdf
                            asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfas
                            asdfasdfasdfasdf
                        </p>
                    </div>
                </div>-->
        </div>
        
        
    </div>
</template>
<script>
    export default{
        data(){
            return{
                oneriler: {}
            }
        },
        methods:{
            onerileriVeritabanindanGetir(){
                axios.get("http://localhost:8888/oneriler", {params: {oneriBaslik: this.$route.query.oneriBaslik, kategoriId: this.$route.query.kategoriId}})
                    .then(response => {
                        let datas = response.data;
                        console.log(datas);
                        for(let key in datas){
                            datas[key].icerik= datas[key].icerik.slice(0, 100);

                            let date = datas[key].created_at;
                            const yil = date.slice(0, 4);
                            const ay = date.slice(5, 7);
                            const gun = date.slice(8, 10);
                            const saat = date.slice(11, 19);
                            const tarih = gun + "" + "." + ay + "." + yil;
                            datas[key].created_at = tarih;
                        }


                        this.oneriler = datas;
                    })
                    .catch(e => console.log(e))
            }
        },
        created(){
            this.onerileriVeritabanindanGetir();
        },
        watch:{
            '$route.query.oneriBaslik'(){
                this.onerileriVeritabanindanGetir();
            }
        }
    }
</script>

<style scoped>
    .btn_ayrinti{
        padding-top: 0px;
        padding-bottom: 20px;
        padding-right: 3px;
        padding-left: 3px;
        height: 20px;
        text-align:center;
        justify-content: center;
        font-size: small;
    }

    @media (min-width: 900px){
        .oneriler-item{
            max-width: 23%;
            height: 300px;
            padding-right:0px;
            padding-left:0px;
            border: 1.5px solid rgba(75, 78, 78, 0.19);
            
            margin-right: 15px;
            margin-left: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
        }
    }
    
    @media (max-width: 800px){
        .oneriler-item{
            max-width: 95%;
            height: 400px;
            padding-right:0px;
            padding-left:0px;
            border: 1.5px solid rgba(75, 78, 78, 0.19);
            
            margin-right: 15px;
            margin-left: 15px;  
            margin-bottom: 10px;
            border-radius: 8px;
        }
    }

    .oneriler-item p, .oneriler-item button{
        margin-right: 15px;
        margin-left: 15px;
    }

    .oneriler-item:hover{
        background-color: rgb(2, 1, 1);
        color: azure;
        font-style:normal;
    }
    
    .oneriler-item p{
        text-align: justify;
        font-size: 13.2px;
        font-weight: 320;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .oneriler-item img{
        padding-right:0px;
        padding-left:0px;
        width: 100%;
        vertical-align: middle;
        height: 55%;
        margin-bottom: 10px;
    }
    .oneri-baslik{
        text-align: center;
        font-weight:600;
        font-size: 15px;
    }
    .oneri-item-footer{
        margin-top: -10px;
        margin-left: 0px;
        margin-bottom: 5px;
    }
    .oneri-item-footer button{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .oneri-item-footer p{
        font-size: 15px;
        text-align:right;
        font-weight: 500;
        color: rgba(51, 51, 51, 0.564);
    }
</style>	
<template>
    <div class="row" id="onerilerim">
        <div class="col-12 d-flex justify-content-center">
            <div class="card col-12">
                <div class="card-header">
                    <h3 style="text-align: center;">Kişisel Önerilerim</h3>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div v-for="(oneri, index) in onerilerim" class="col-12 onerilerim-item pt-3">                        
                            <div class="row anabolge">
                                <div class="col-lg-6">
                                    <img :src="oneri.image"
                                        v-if="oneri.image==null? oneri.image='../../../public/images/default_image.jpg': oneri.image=oneri.image" alt="" >
                                </div>
                                <div class="col-lg-6 col-md-12" aria-label="sdfasdfsdfasdfasdf">
                                    <h4>{{ oneri.baslik }}</h4>
                                    <p style="text-align: justify; white-space:pre-line;">{{ oneri.icerik }}</p>
                                    <h6 style="text-align: right; color:black">{{ oneri.kullanici_ad }} {{ oneri.soyad }}</h6>
                                    <p style="text-align: right; color:dimgrey">{{ oneri.created_at }}</p>
                                    <div class="row ml-1">
                                        <div class="mr-4 kategori" v-for="kategori in oneri.kategoriler">{{kategori.ad}}</div>
                                    </div>
            
                                    <hr>
                                    <div class="row">
                                        <div class="col-4" @click="oneriDuzenleme(oneri.id)">
                                            <button class="btn btn-info btn-sm" >
                                                <i class="fas fa-cogs fa-lg"></i> Düzenle
                                            </button>
                                        </div>
                                        <div class="col-4">
                                            <button class="btn btn-danger btn-sm" @click="oneriKaldir(index, oneri.id)" ><i class="far fa-trash-alt fa-lg"></i> Kaldır !!</button>
                                        </div>
                                        <!--

                                        
                                        <div class="col-4" @click="oneriDetaylariGoruntuleme(oneri.id)">
                                            <router-link :to="{name:'oneridetaylar', params: {oneriId: oneri.id}}" class="btn btn-warning btn-sm" >
                                                <i class="far fa-caret-square-down fa-lg"></i> Detaylar
                                            </router-link>
                                        </div>-->
                                    </div>
                                </div>
                            </div>

                            <div class="row" v-if="(oneriDuzenlemeActive) && (activeOneriId == oneri.id)">
                                <app-oneri-duzenleme></app-oneri-duzenleme>
                            </div>
                            
                            <div class="row">
                                <router-view v-if="(oneriDetaylarActive) && (activeOneriId == oneri.id)"></router-view>
                            </div>
                            
                            
                            <hr style="border-style:inset; height: 2px; background-color: rgba(60, 62, 62, 0.299); margin-top: 10px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import OneriDuzenleme from "./OneriDuzenleme";
    export default {
        components:{
            appOneriDuzenleme: OneriDuzenleme,
        },
        data() {
            return {
                onerilerim: {},
                sistemMesaji: { mesajTuru: 1, metin: null},
                oneriDuzenlemeActive: false,
                oneriDetaylarActive: false,
                activeOneriId: 0
            }
        },
        methods: {
            oneriDuzenleme(oneriId){
                if(this.activeOneriId == oneriId){
                    this.oneriDuzenlemeActive=!this.oneriDuzenlemeActive;
                    this.oneriDetaylarActive=false;
                }else{
                    this.activeOneriId = oneriId;
                    this.$store.state.aktifOneriId = oneriId;
                    this.oneriDuzenlemeActive = true;
                    this.oneriDetaylarActive = false;
                }
            },
            oneriDetaylariGoruntuleme(oneriId){
                if(this.activeOneriId == oneriId){
                    this.oneriDetaylarActive=!this.oneriDetaylarActive;
                    this.oneriDuzenlemeActive=false;
                }else{
                    this.activeOneriId = oneriId;
                    this.$store.state.aktifOneriId = oneriId;
                    this.oneriDuzenlemeActive = false;
                    this.oneriDetaylarActive= true;
                }
            },
            oneriKaldir(index, oneriId){
                let onay = confirm("Öneriyi Silmek İstediğinizden Emin misiniz ?");
                if(onay){
                    this.onerilerim.splice(index, 1);
                    axios.delete("http://localhost:8888/oneri/" + oneriId)
                            .then(response =>{
                                if(response.data){
                                    this.sistemMesaji =  { mesajTuru:1, metin: "Silme İşlemi Başarılı"};
                                }
                            })
                }
            },
            onChange(e) {
                const file = e.target.files[0];
                //this.image = URL.createObjectURL(file);
                this.kullanici.profil_fotografi = "../../../public/images/profil/" + file.name;
            },
            tumOnerilerimiGetir(){
                axios.get("http://localhost:8888/oneriler", {params: {kullaniciId: this.$store.state.kullanici.id}})
                    .then(response => {
                        let datas = response.data;
                        for(let key in datas){
                            //datas[key].icerik= datas[key].icerik.slice(0, 100);

                            let date = datas[key].created_at;
                            const yil = date.slice(0, 4);
                            const ay = date.slice(5, 7);
                            const gun = date.slice(8, 10);
                            const saat = date.slice(11, 19);
                            const tarih = gun + "" + "." + ay + "." + yil;
                            datas[key].created_at = tarih;
                        }

                        this.onerilerim = datas;
                    })
                    .catch(e => console.log(e))
            },
        },
        created(){
            this.tumOnerilerimiGetir();
        },
        watch: {
            sistemMesaji(){
                this.$store.state.sistemMesaji = this.sistemMesaji;
            },
            oneriDuzenlemeActive(){
                if(!this.oneriDuzenlemeActive){
                    //alert(this.oneriDuzenlemeActive);
                    this.$forceUpdate();
                }else{
                    //alert(this.oneriDuzenlemeActive);
                    console.log('else');
                }
            }
        },
        updated(){
            if(this.oneriDuzenlemeActive){
                this.tumOnerilerimiGetir();
            }
        }
    }
</script>
<style>    
    #onerilerim .card{
        margin-top: 20px;
        margin-bottom: auto;
        width: 1300px;
        background-color: rgba(255, 255, 255, 0) !important;
        padding-right: 0px;
        padding-left: 0;   
    }
    
    #onerilerim .card-header{
        height: 40px;
        background-color: rgb(24, 150, 142);
        width: 100%;
    }
    #onerilerim .card-header h3{
        color: white;
        text-align: center;
        margin-top: -10px;
    }

    .onerilerim-item{      
        margin-bottom: 10px;
        /*width:px;
        height: auto;*/
    }
    .onerilerim-item hr{
        margin-top: -3px;
        margin-bottom: 5px;
    }
    /*
    .onerilerim-item:hover{
        background-color: rgb(2, 1, 1);
        color: azure;
        font-style:normal;
    }
    .onerilerim-item:hover p{
        color: azure;
        font-style:normal !important;
    }*/
    .onerilerim-item p{
        text-align: justify;
        font-size: 13.2px;
        font-weight: 320;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .onerilerim-item img{
        height: 220px;
        width: 350px;
        border: 1px rgba(0, 0, 0, 0.163) solid;
        border-radius: 10px;
    }


</style>
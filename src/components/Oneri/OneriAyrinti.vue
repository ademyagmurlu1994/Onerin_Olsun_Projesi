<template>
    <div class="dflex justify-content-center">
        <div class="card">
            <div class="card-header">
                <h3>Öneri Ayrıntı Sayfası</h3>
            </div>
            <div class="card-body ">
                <div class="row anabolge">
                    <div class="col-lg-6 mt-2 oneri-image">
                        <div class="row justify-content-center">
                            <img :src="oneri.image"
                            v-if="oneri.image==null? oneri.image='../../../public/images/default_image.jpg': oneri.image=oneri.image" alt="">
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-12">
                        <h3>{{ oneri.baslik }}</h3>
                        <p style="text-align: justify; white-space:pre-line;">{{ oneri.icerik }}</p>
                        <h6 style="text-align: right; color:black">{{ oneri.kullanici_ad }} {{ oneri.soyad }}</h6>
                        <p style="text-align: right; color:dimgrey">{{ oneri.created_at }}</p>
                        <div class="row ml-1">
                            <router-link :to="{name: 'oneriAramaSonuclari', query:{ kategoriId: kategori.id}}" tag="div" class="mr-4 kategori" v-for="kategori in oneri.kategoriler">
                                {{kategori.ad}}
                            </router-link>
                        </div>

                        <hr>
                        <div class="row">
                            <div class="col-lg-3 col-sm-4">
                                <button class="btn btn-success ml-0" style="padding-left: 4px; padding-right:4px;"><i class="fas fa-shopping-cart"></i> Satın Al</button>
                            </div>
                            <div class="col-lg-3 col-sm-4 ml-0" >
                                <button class="btn btn-warning" style="padding-left: 4px; padding-right:4px;"><i class="far fa-envelope"></i> Mesaj At</button>
                            </div>
                            <div class="col-lg-3 col-sm-4 ml-0" >
                                <button class="btn btn-danger" style="padding-left: 4px; padding-right:4px;"><i class="fas fa-angry"></i> Şikayet Et</button>
                            </div>
                            <div class="col-lg-3 col-sm-5 mt-2">
                                <div class="row">
                                    <div class="col-6">
                                        <i @click="begeniDurumunuDegistir(0)"  :class="{ begenActive : begendim, begenPasive: !begendim, 'far fa-heart': !begendim, 'fas fa-heart': begendim}"> <span style="font-size:13px;"> ({{oneri.likes}})</span> </i>
                                    </div>
                                    <div class="col-6">
                                        <i class="fas fa-heart-broken" @click="begeniDurumunuDegistir(1)"  :class="{ begenmeActive : begenmedim, begenmePasive: !begenmedim}"> <span style="font-size:13px;"> ({{oneri.dislikes}})</span></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row ml-1 mr-1 mt-4" style="border:none; padding:0px;">
                    <div class="col-lg-12" style="margin-left:0px;">
                        <app-oneri-ayrinti-bottom-bar></app-oneri-ayrinti-bottom-bar>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import OneriYorumlar from "./OneriYorumlar";
    import OneriAyrintiBottomBar from "./OneriAyrintiBottomBar";
    export default {
        components:{
            appOneriYorumlar: OneriYorumlar,
            appOneriAyrintiBottomBar: OneriAyrintiBottomBar,
        },
        data() {
            return {
                oneriId: 1,
                begendim: false,
                begenmedim: false,
                begeniDurumu: 0,
                oneri: {},
                kategoriler: {},
                defaultLikes: 0,
                defaultDisLikes: 0,
            }
        },
        methods:{
            oneriVerileriniGetir(){
                axios.get("http://localhost:8888/oneriayrinti/" + this.$route.params.oneriId)
                .then(response => {
                    let data = response.data;
                    let date = data.created_at;
                    const yil = date.slice(0, 4);
                    const ay = date.slice(5, 7);
                    const gun = date.slice(8, 10);
                    const saat = date.slice(11, 19);
                    const tarih = gun + "" + "." + ay + "." + yil + " " + saat;
                    data.created_at = tarih;

                    this.defaultLikes = data.likes;
                    this.defaultDisLikes = data.dislikes;
                    this.oneri = data;
                })
                .catch(e => console.log(e))
            },
            begeniDurumunuDegistir(value){
                 // default verilerin karışmaması için gereklidir.

                if(value==0){
                    this.begendim = !this.begendim;
                    this.begenmedim = false;
                }else{
                    this.begenmedim = !this.begenmedim;
                    this.begendim = false;
                }

                if(this.begendim){
                    this.begeniDurumu = 1;
                    if((this.oneri.dislikes - this.defaultDisLikes) == 1){
                        this.oneri.dislikes -= 1;
                        this.oneri.likes += 1;
                    }else if(this.defaultLikes == this.oneri.likes){
                        this.oneri.likes += 1;
                    }
                }else if(this.begenmedim){
                    this.begeniDurumu = 2;
                    if((this.oneri.likes - this.defaultLikes) == 1){
                        this.oneri.likes -= 1;
                        this.oneri.dislikes += 1;
                    }else if(this.defaultDisLikes == this.oneri.dislikes){
                        this.oneri.dislikes += 1;
                    }
                }else{
                    this.begeniDurumu = 0;
                    this.oneri.likes = this.defaultLikes;
                    this.oneri.dislikes = this.defaultDisLikes;
                }

                axios.put("http://localhost:8888/oneriLikeDisLike/", {'oneriId': this.$route.params.oneriId,'likes': this.oneri.likes, 'dislikes': this.oneri.dislikes})
                .then(response => {
                    console.log(response.data);
                })
            }
        },
        created() {
            this.$store.state.aktifOneriId = this.$route.params.oneriId;
            this.oneriVerileriniGetir();

            //##############     KATEGORİLER   ############################
           /* axios.get("http://localhost:8888/onerikategoriler/" + this.$route.params.oneriId)
                .then(response => {
                    let data = response.data;
                    console.log(data);
                    this.kategoriler = data;
        border-left: rgb(250, 208, 19) solid 18px;
                })
                .catch(e => console.log(e))*/
        }
    }
</script>
<style>
    .oneri-image{
        width: 100%;
    }
    .oneri-image img {
        width: 95%;
        height: 350px;
        border-radius: 10px;
        box-shadow: rgb(101, 100, 100) 0px 0px 4px 1px;
        margin-bottom: 15px;
    }

    .card {
        margin-top: 1%;
        margin-right: 5%;
        margin-left: 5%;
    }

    .kategori {
        background-color: rgb(13, 114, 238);
        color: white;
        border: 1px solid rgba(0, 0, 0, 0.285);
        box-shadow: black 1px 1px 4px;
        padding-right: 4px;
        padding-left: 4px;
        cursor: pointer;

    }

    .card-header {
        text-align: center;
        color: rgb(253, 250, 250);
        background-color: #006B6B;
        height: 40px;
    }

    .card-header h3 {
        margin-top: -11px;
    }

    .begenActive{
        cursor: pointer;
        color: rgb(30, 113, 186);
    }
    .begenPasive{
        cursor: pointer;
        color: rgb(150, 155, 155);
    }
    .begenmeActive{
        cursor: pointer;
        color: rgb(235, 66, 66);
    }
    .begenmePasive{
        cursor: pointer;
        color: rgb(146, 155, 155);
    }
</style>
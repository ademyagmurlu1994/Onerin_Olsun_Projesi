<template>
    <div class="container" v-if="loginKontrol()">
        <div class="row h-75">
            <div class="col-12 d-flex justify-content-center">
                <div class="card">
                    <div class="card-header">
                        <h3>Öneri Yayınlama Sayfası</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="yayinla">
                            <div class="row">
                                <div class="input-group form-group col-12 form-item-title" style="margin-top:-20px;"> <strong>Başlık</strong></div>
                                <div class="input-group form-group col-12">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-bookmark"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Başlık giriniz..." v-model="oneri.baslik" style="font-weight: bold; color:black" required>
                                </div>
                                <div class="input-group form-group col-12 form-item-title"> <strong>İçerik</strong> </div>
                                <div class="input-group form-group col-12">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-comments"></i></span>
                                    </div>
                                    <textarea class="form-control" placeholder="İçerik giriniz..." v-model="oneri.icerik"  cols="30" rows="5" required></textarea>
                                </div>
                                <div class="input-group form-group col-12 form-item-title"> <strong>Kategoriler</strong> </div>
                                <div class="input-group form-group col-12">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-align-justify"></i></span>
                                    </div>
                                    <select id="cars" v-model="secilenKategori">
                                        <option v-for="(kategori, index) in tumKategoriler" :value="kategori"> {{ kategori.ad }} </option>
                                    </select>
                                    <button class="btn btn-warning ml-2" @click.prevent="ekleKategori">Ekle</button>
                                </div>

                                <div class="input-group form-group col-12">
                                    <div v-for="(item, index) in oneri.kategoriler">
                                        <div class="kategori-item" >{{item.ad}} <span style="margin-left:9px;" @click="kaldirKategori(index)">X</span></div>
                                    </div>
                                </div>
                                <button class="btn btn-outline-warning text-light ml-3" type="button" @click.prevent="$refs.file.click()">Öneri için örnek resim seç</button>
                                <div class="input-group form-group col-12 mt-2">
                                    <img class="img-responsive text-center mb-3"
                                    :src="oneri.image == null ? '../../../public/images/default_image.jpg' : oneri.image" style="height: 128px; width: 210px; border:rgb(255, 255, 255) solid 1px;">
                                    <input ref="file" type="file" style="display: none;" @change="onChange($event)" class="form-control" accept=".gif,.jpg,.jpeg,.png">
                                </div>
                                <div class="input-group form-group col-12 mt-2">
                                    <button class="btn_oneri_yayinla float-right col-12"> Öneriyi Yayınla </button>
                                </div>
                            </div>
                        </form>
                        <div class="card-footer"> 
                            <router-link to=" " tag="div" class="d-flex justify-content-center links">
                                <a> ? Yardım almak istiyorum </a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        data() {
            return {
                oneri: { baslik: '', icerik: '',  image:  null, kategoriler: [], kullanici_id: 1},
                tumKategoriler:{},
                secilenKategori: "",
                sistemMesaji: this.$store.state.sistemMesaji
            }
        },
        methods: {
            ekleKategori(){
                if(this.secilenKategori.ad.trim() == "" || this.secilenKategori == undefined){
                    this.sistemMesaji = {mesajTuru: 2, metin: "Lütfen bir kategori seçiniz..."};
                }else{
                    this.oneri.kategoriler.push(this.secilenKategori);
                    this.tumKategoriler.splice(this.tumKategoriler.indexOf(this.secilenKategori), 1);
                    this.secilenKategori = "";
                }
            },
            kaldirKategori(index){
                this.tumKategoriler.push(this.oneri.kategoriler[index]);
                this.oneri.kategoriler.splice(index, 1);
            },
            onChange(e) {
                const file = e.target.files[0];
                //this.image = URL.createObjectURL(file);
                this.oneri.image = "../../../../../public/images/oneri/" + file.name;
            },
            yayinla(){
                this.oneri.kullanici_id = this.$store.state.kullanici.id;

                axios.post("http://localhost:8888/oneri", this.oneri)
                .then(response => {
                    if(response){
                        this.sistemMesaji = {mesajTuru: 1, metin: 'Öneriniz başarı bir şekilde sisteme yüklendi..'};
                        this.oneri = {};
                    }else{
                        this.sistemMesaji = {mesajTuru: 1, metin: 'Öneriniz yüklenirken server tarafında bir hata ile karşılaşıldı..\nLütfen bir daha deneyin!'};
                    }
                })
                .catch(e => {
                    if (e.response.status == 409){
                        //this.sistemMesaji = "Zaten bu emaile ait bir kullanıcı bulunmaktadır. "
                    }
                });

                console.log(this.oneri);

                /**/
                //console.log(this.oneri.kategoriler);
                //alert('kullanici_id: '+ this.$store.state.kullanici.id);
                //this.oneri.kategoriler=this.oneri.kategoriler;
            },
            loginKontrol(){
                if(this.isLogin){
                    return true;
                }else{
                    this.$router.push({ name: "giris"});
                }
            }
        },
        computed:{
            isLogin:{
                get(){
                    return this.$store.getters.getIsLogin;
                }
            }
        },
        watch:{
            sistemMesaji(){
                this.$store.state.sistemMesaji = this.sistemMesaji;
            }
        },
        created(){
            axios.get("http://localhost:8888/kategoriler")
                .then(response => {
                    this.tumKategoriler= response.data;
                })
                .catch(e => console.log(e))
                

                    
            /*axios.get('').then(function(response) {
            that.posts = response.data.reverse();
             });*/
        }
    }
</script>

<style>
    .kategori-item{
        margin-right: 10px;
        height: 35px; 
        background-color:rgb(240, 140, 230);
        box-shadow: black 4px 4px 5px;
        border: 2px solid rgb(142, 8, 86);
        border-radius: 5px;
        padding: 5px;
        justify-content: center;
        text-align: center;
    }
    .btn_oneri_yayinla{
        color: white;
        height: 50px;
        font-size: 18px;
        background-color: rgb(37, 169, 11);
        border: 2px solid rgb(5, 101, 8);
        border-radius: 20px;
        justify-content: center;
        
        box-shadow: black 4px 4px 5px;
    }
    .form-item-title{
        margin-bottom: 1px;
        margin-top:-10px;
        color:rgb(255, 208, 0);
    }

    
    
    .container .card{
        margin-top: 20px;
        margin-bottom: auto;
        width: 600px;
        background-color: rgba(0,0,0,0.5) !important;
        }
    
    .container .card-header{
        background-color: rgb(0, 0, 0, 0.3);
    }
    .container .card-header h3{
    color: white;
    text-align: center;
    }
    .container .card-footer{
        color: white;
        background-color: rgba(0,0,0,0.5) !important;
        text-align: center;
    }
    .container .input-group-prepend span{
    width: 50px;
    background-color: #83b7ec;
    color: black;
    border:0 !important;
    }
    
    .container input:focus{
    outline: 0 0 0 0  !important;
    box-shadow: 0 0 0 0 !important;
    
    }
    
    .container .notification{
    color: white;
    }
    
    .container .notification input
    {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-right: 5px;
    }
    
    .container .btn_oneri_yayinla:hover{
    color: black;
    background-color: white;
    }
    
    .container .links{
    color: white;
    }
    
    .container .links a{
    margin-left: 4px;
    color: rgb(231, 255, 18);
    }
    
    .container .btn_register{
        background-color: rgb(2, 0, 56);
        color: rgb(255, 255, 255);
        border: solid rgb(255, 255, 255);
        height: 50px;
    }
</style>
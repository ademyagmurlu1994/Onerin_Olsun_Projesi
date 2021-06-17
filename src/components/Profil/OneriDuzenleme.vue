<template>
    <div class="container oneri_duzenleme" v-if="duzenlemeAktif">
        <div class="row h-75">
            <div class="col-12 d-flex justify-content-center">
                <div class="card col-12">
                    <div class="card-body">
                        <form @submit.prevent="oneriGuncelle">
                            <div class="row">
                                <div class="col-lg-7 col-md-12">
                                    <div class="input-group form-group form-item-title"> <strong>Başlık</strong> </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-bookmark"></i></span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Başlık giriniz..." v-model="oneri.baslik" style="font-weight: bold; color:black" required>
                                    </div>
                                    <div class="input-group form-group form-item-title"> <strong>İçerik</strong> </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-comments"></i></span>
                                        </div>
                                        <textarea class="form-control" placeholder="İçerik giriniz..." v-model="oneri.icerik"  cols="30" rows="10" required></textarea>
                                    </div>
                                </div>
                                <div class="col-lg-5 col-md-12">
                                    <div class="input-group form-group form-item-title"> <strong>Kategoriler</strong> </div>
                                    <div class="input-group form-group">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-align-justify"></i></span>
                                        </div>
                                        <select id="cars" v-model="secilenKategori">
                                            <option v-for="(kategori, index) in tumKategoriler" :value="kategori"> {{ kategori.ad }} </option>
                                        </select>
                                        <button class="btn btn-warning ml-2" @click.prevent="ekleKategori">Ekle</button>
                                    </div>

                                    <div class="input-group form-group">
                                        <div v-for="(item, index) in oneri.kategoriler">
                                            <div class="kategori-items" >{{item.ad}} <span style="margin-left:9px;" @click="kaldirKategori(index)">X</span></div>
                                        </div>
                                    </div>
                                    <button class="btn btn-outline-info ml-0" type="button" @click.prevent="$refs.file.click()">Öneri için örnek resim seç</button>
                                    <div class="input-group form-group mt-2">
                                        <img class="img-responsive text-center mb-3"
                                        :src="oneri.image == null ? '../../../../public/images/default_image.jpg' : oneri.image" style="height: 128px; width: 210px; border:rgb(255, 255, 255) solid 1px;">
                                        <input ref="file" type="file" style="display: none;" @change="onChange($event)" class="form-control" accept=".gif,.jpg,.jpeg,.png">
                                    </div>
                                    <div class="input-group form-group">
                                        <button class="btn btn-success col-12 ml-0"> Öneriyi Güncelle </button>
                                    </div>
                                </div>
                            </div>
                        </form>
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
                sistemMesaji: { mesajTuru:  1, metin: null},
                duzenlemeAktif: true
            }
        },
        methods: {
            ekleKategori(){
                if(this.secilenKategori.ad.trim() == "" || this.secilenKategori == undefined){
                    this.sistemMesaji = {mesajTuru:  2, metin: "Lütfen bir kategori seçiniz..."};
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
            tumKategorileriDuzenle(){
                for(var index=0; index<this.oneri.kategoriler.length; index++){
                    if(!(this.tumKategoriler.includes(this.oneri.kategoriler[index]))){
                        var indexs = this.tumKategoriler.map(function(e) { return e.ad; }).indexOf(this.oneri.kategoriler[index].ad);
                        this.tumKategoriler.splice(indexs, 1);
                    }
                }
            },
            onChange(e) {
                const file = e.target.files[0];
                this.image = URL.createObjectURL(file);
                this.oneri.image = "../../../public/images/oneri/" + file.name;
            },
            oneriVerileriniGetir(){
                axios.get("http://localhost:8888/oneriayrinti/" + this.$store.state.aktifOneriId)
                .then(response => {
                    let data = response.data;
                    let date = data.created_at;
                    const yil = date.slice(0, 4);
                    const ay = date.slice(5, 7);
                    const gun = date.slice(8, 10);
                    const saat = date.slice(11, 19);
                    const tarih = gun + "" + "." + ay + "." + yil + " " + saat;
                    data.created_at = tarih;

                    this.oneri = data;
                    this.tumKategorileriDuzenle();
                })
                .catch(e => console.log(e))
            },
            oneriGuncelle(){
                axios.put("http://localhost:8888/oneri/"+ this.$store.state.aktifOneriId, this.oneri)
                .then(response => {
                    if(response){
                        this.sistemMesaji = {mesajTuru:  1, metin: 'Öneriniz başarı bir şekilde güncellendi..'};
                    }else{
                        this.sistemMesaji = {mesajTuru:  1, metin: 'Öneriniz güncellenirken server tarafında bir hata ile karşılaşıldı..\nLütfen bir daha deneyin!'};
                    }
                })
                .catch(e => {
                    if (e.response.status == 409){
                        //this.sistemMesaji = "Zaten bu emaile ait bir kullanıcı bulunmaktadır. "
                    }
                });

                
                this.uyariMesajiniKaldir();
                console.log(this.oneri);

                /**/
                //console.log(this.oneri.kategoriler);
                //alert('kullanici_id: '+ this.$store.state.kullanici.id);
                //this.oneri.kategoriler=this.oneri.kategoriler;*/
            },
            loginKontrol(){
                if(this.isLogin){
                    return true;
                }else{
                    this.$router.push({ name: "giris"});
                }
            },
            uyariMesajiniKaldir() {
                var vm = this;
                setTimeout(function(){
                    vm.sistemMesaji.metin = null;
                    vm.duzenlemeAktif = false;
                  }, 2000);
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
                
            this.oneriVerileriniGetir();
        },
    }
</script>

<style>
    .oneri_duzenleme .kategori-items{
        margin-right: 10px;
        margin-bottom: 2px;
        height: 25px; 
        background-color:rgb(22, 152, 233);
        border-radius: 5px;
        padding: 5px;
        justify-content: center;
        text-align: center;
        color:aliceblue;
        font-size: 12px;
    }
    .oneri_duzenleme .form-item-title{
        margin-bottom: 1px;
        margin-top:-10px;
        color:rgb(17, 145, 130);
    }
    .oneri_duzenleme .card{
        margin-top: 20px;
        margin-bottom: auto;
        width: 600px;
        background-color: rgba(0,0,0,0.5) !important;
    }
    .oneri_duzenleme .input-group-prepend span{
        width: 50px;
        background-color: rgb(25, 138, 135) !important;
        color: rgb(171, 240, 233) !important;
        border:0 !important;
    }
    
</style>
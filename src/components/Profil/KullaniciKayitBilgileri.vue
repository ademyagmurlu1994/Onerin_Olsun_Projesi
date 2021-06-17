<template>
    <div class="container" id="update_information">
        <div class="col-12 d-flex justify-content-center">
            <div class="card">
                <div class="card-header">
                    <h3>Kullanıcı Kayıt Bilgileri Güncelleme</h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="verileriGuncelle">
                        <div class="row">
                            <div class="input-group form-group col-12">
                                <img class="img-responsive text-center profil_fotografi"
                                :src="kullanici.profil_fotografi == null ? '../../../public/images/profil/profil_default.png' : kullanici.profil_fotografi">
                                <input ref="file" type="file" style="display: none;" @change="onChange($event)" class="form-control" accept=".gif,.jpg,.jpeg,.png">
                            </div>
                            <div class="input-group form-group  mb-2 col-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="far fa-image fa-lg"></i></span>
                                </div>
                                <button class="btn btn-info btn-sm text-light btn_profil_fotografi_degistir" type="button" @click.prevent="$refs.file.click()"> Profil Fotoğrafını Değiştir </button>
                            </div>
                            <div class="input-group form-group col-lg-6 col-sm-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="text" class="form-control" placeholder="* Adınız" v-model="kullanici.ad" required>
                            </div>
                            <div class="input-group form-group col-lg-6 col-sm-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="text" class="form-control" placeholder="* Soyadınız" v-model="kullanici.soyad" required>
                            </div>
                            <div class="input-group form-group mt-2 mb-4 col-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                </div>
                                <input type="email" class="form-control" placeholder="* Email adresiniz" v-model="kullanici.email" required readonly>
                            </div>
                            <div class="input-group form-group col-lg-6 col-sm-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input type="password" class="form-control" placeholder="* Parola" v-model="kullanici.parola" required>
                            </div>
                            <div class="input-group form-group col-lg-6 col-sm-12">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input type="password" class="form-control" placeholder="* Parola tekrar" v-model="parolaTekrar" required>
                            </div>
                            <div class="row align-items-center notification col-12 " style="color: black;">
                                <input type="checkbox">Bildirim Gönderilsin mi?
                            </div>
                            <div class="input-group form-group col-12 mt-2 dfex justify-content-end">
                                <button class="btn btn-outline-danger btn-sm " @click.prevent="varsayilanVerileriYukle()"> Varsayılan Verileri Yükle </button>
                            </div>
                            <div class="input-group form-group col-12 mt-2">
                                <button class="btn btn-success float-right col-12"> Değişiklikleri Kaydet </button>
                            </div>
                        </div>
                    </form>
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
                kullanici: { ad: '', soyad: '', email: '', parola: '', profil_fotografi: ''},
                varsayilanKullanici: {},
                parolaTekrar: '',
                sistemMesaji: { mesajTuru:  1, metin: null},
            }
        },
        methods: {
            verileriGuncelle() {
                if(this.kullanici.parola != this.parolaTekrar){
                    this.sistemMesaji = {mesajTuru:2, metin: "Parolalar Eşlememektedir! \nLütfen Tekrar Giriniz."};
                }else{
                    axios.put("http://localhost:8888/kullanici/" + this.$store.state.kullanici.id, this.kullanici)
                    .then(response => {
                        if(response.data){
                            this.sistemMesaji = {mesajTuru:1, metin: "Veriler başarılı bir şekilde güncellendi.."}
                            this.$store.state.kullanici.profil_fotografi = this.kullanici.profil_fotografi ;  
                            
                        }else{
                            this.sistemMesaji = {mesajTuru:2, metin: 'Verileri veritabanına kaydederken bir sorun yaşandı...'};
                        }
                    })
                    .catch(e => { console.log(e)});
                }
            },
            varsayilanVerileriYukle(){
                let kullanici = Object.assign({}, this.varsayilanKullanici);
                this.kullanici = kullanici;
                this.parolaTekrar = '123';
            },
            onChange(e) {
                const file = e.target.files[0];
                //this.image = URL.createObjectURL(file);
                this.kullanici.profil_fotografi = "../../../public/images/profil/" + file.name;
            }
        },
        watch:{
            sistemMesaji(){
                this.$store.state.sistemMesaji = this.sistemMesaji;
            }
        },
        created(){
            axios.get("http://localhost:8888/kullanicikayitbilgileri", {params: {kullanici_id: this.$store.state.kullanici.id}})
                    .then(response => {
                            let data = response.data;
                            if(!data){
                                //this.sistemMesaji = "Email veya Parola hatalı! \nLütfen bir daha deneyiniz.";
                            }else {
                                this.kullanici= { ad: data.ad, soyad: data.soyad, email: data.email, parola: '123', profil_fotografi: data.profil_fotografi};
                                this.parolaTekrar = '123';
                                let kullanciDefault = Object.assign({}, this.kullanici);
                                this.varsayilanKullanici = kullanciDefault;
                                this.$store.state.kullanici.profil_fotografi = this.kullanici.profil_fotografi ; 

                            }
                        }
                    )
                    .catch(e => console.log(e))
        }
    }
</script>
<style>
    #update_information .container{
        height: 100%;
        align-content: center;
    }
    
    #update_information .card{
        margin-top: 20px;
        margin-bottom: auto;
        width: 800px;
        background-color: rgba(255, 255, 255, 0) !important;
        box-shadow: rgb(130, 129, 129) 0px 5px 5px 1px;
    }
    
    #update_information .card-header{
        height: 40px;
        background-color: rgb(24, 150, 142);
    }
    #update_information .card-header h3{
        color: white;
        text-align: center;
        margin-top: -10px;
    }
    #update_information .input-group-prepend span{
        width: 50px;
        background-color: rgb(29, 193, 182);;
        color: rgb(250, 250, 250);
        border:0 !important;
    }

    #update_information .input-group-prepend i{
        width: 300%;
        background-color: rgb(29, 193, 182);;
        color: rgb(255, 255, 255);
        border:0 !important;
        font-size: 22px;
    }

    #update_information input:focus{
        outline: 0 0 0 0  !important;
        box-shadow: 0 0 0 0 !important;
        
    }
    
    #update_information .notification input
    {
        width: 20px;
        height: 20px;
        margin-left: 15px;
        margin-right: 5px;
    }
    

    .profil_fotografi{
        height: 200px;
        width: 300px;
        border:rgb(255, 255, 255) solid 1px;
        border-radius: 15px;
    }

    .btn_profil_fotografi_degistir{
        background-color: rgb(24, 150, 142);
    }
</style>
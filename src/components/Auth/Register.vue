<template>
    <div class="container" id="register">
        <div class="row h-75">
            <div class="col-12 d-flex justify-content-center">
                <div class="card">
                    <div class="card-header">
                        <h3>Kullanıcı Kayıt Olma Sayfası</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="veriTabaninaKaydet">
                            <div class="row">
                                <div class="input-group form-group col-12">
                                    <div v-if="uyariDurumu()" class="alert alert-info input-group form-group col-12" 
                                    style="background-color: rgba(161, 17, 177, 0.87); color: rgb(246, 239, 13);">
                                    <strong>{{ uyariMesaji }}</strong>
                                </div> 
                                </div>
                                <div class="input-group form-group col-6">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="* Adınız" v-model="kullanici.ad" required>
                                </div>
                                <div class="input-group form-group col-6">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="* Soyadınız"
                                        v-model="kullanici.soyad" required>
                                </div>
                                <div class="input-group form-group mt-3 mb-4 col-12">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                    </div>
                                    <input type="email" class="form-control" placeholder="* Email adresiniz"
                                        v-model="kullanici.email" required>
                                </div>
                                <div class="input-group form-group col-6">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" class="form-control" placeholder="* Parola"
                                        v-model="parola" required>
                                </div>
                                <div class="input-group form-group col-6">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input type="password" class="form-control" placeholder="* Parola tekrar"
                                        v-model="parolaTekrar" required>
                                </div>
                                <div class="row align-items-center notification col-12">
                                    <input type="checkbox">Bildirim Gönderilsin mi?
                                </div>
                                <div class="input-group form-group col-12 mt-2">
                                    <button class="btn_register float-right col-12"> Kayıt Ol </button>
                                </div>
                                
                            </div>
                        </form>
                        <div class="card-footer">
                            <router-link to="/login" tag="div" class="d-flex justify-content-center links">
                                <a>Zaten kayıtlı hesabım var</a>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nokta" style="margin-top: 150px;"><h3>.</h3></div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        data() {
            return {
                kullanici: { ad: '', soyad: '', email: '', sifre: ''},
                parola: '',
                parolaTekrar: '',
                uyariMesaji: '',
            }
        },
        methods: {
            veriTabaninaKaydet() {
                if(this.parola != this.parolaTekrar){
                    this.uyariMesaji = "Parolalar Eşlememektedir! \nLütfen Tekrar Giriniz.";
                   
                }else{
                    this.kullanici.sifre = this.convertToHash(this.parola);
                    axios.post("http://localhost:8888/kullanici", this.kullanici)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(e => {
                        if (e.response.status == 409){
                            this.uyariMesaji = "Zaten bu emaile ait bir kullanıcı bulunmaktadır. "
                        }
                    });
                }
            },
            formKontrol() {
                if(this.parola != this.parolaTekrar){
                    this.uyariMesaji = "Parolalar Eşlememektedir! \nLütfen Tekrar Giriniz.";
                    return false;
                }
            },
            convertToHash(value) {
                const crypto = require('crypto'),
                hash = crypto.getHashes();
                var hashPwd = crypto.createHash('sha1').update(value).digest('hex');
                return hashPwd;
            },
            uyariDurumu() {
                if (this.uyariMesaji != '') {
                   return true;
                } else {
                    return false;
                }

            }
        }
    }
</script>
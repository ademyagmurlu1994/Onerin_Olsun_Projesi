<template>
    <div class="container" id="forgot_password">
        <div class="row h-75">
            <div class="col-12 d-flex justify-content-center">
                <div class="card">
                    <div class="card-header">
                        <h3>Parolamı Unuttum Sayfası</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="forgotPassword">
                            <div class = "row">
                                <div v-if="uyariDurumu()" 
                                class="alert alert-info input-group form-group" 
                                style="background-color: rgba(255, 247, 2, 0.87); color: rgb(35, 11, 131);"><strong>{{ uyariMesaji }}</strong></div> 
                                <div class="input-group form-group col-12 mt-5">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                    </div>
                                    <input type="email" class="form-control" placeholder="Email adresiniz" v-model="email">
                                </div>
                                <div class="input-group form-group col-12 mt-2">
                                    <button class="btn btn-danger col-12" style="width: 70px;"> Parolayı Sıfırla </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="nokta" style="margin-top: 225px;"><h3>.</h3></div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                email: "",
                parola: "",
                kullanici: {},
                uyariMesaji: "",
            }
        },
        methods: {
            forgotPassword() {
                let kayitVarmi = false
                axios.get("https://bitirmeprojesi-3204f.firebaseio.com/kullanicilar.json")
                    .then(response => {
                        let data = response.data;
                        for (let key in data) {
                            if (data[key].email == this.email) {
                                kayitVarmi= true
                                alert("skasdfyasodfısadfjk");
                            }
                        }
                        if (!kayitVarmi) {
                            this.uyariMesaji= "Lütfen email adresini doğru girdiğinizden emin olunuz !!!";
                        }
                    })
                    .catch(e => console.log(e))
            },
            uyariDurumu() {
                if (this.uyariMesaji!= '') {
                    if (this.email != '') {
                        return true;
                    } else {
                        this.uyariMesaji = '';
                        return false;
                    }
                } else {
                    return false;
                }

            }
        }
    }
</script>
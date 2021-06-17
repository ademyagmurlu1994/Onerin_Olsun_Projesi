<template>
    <div class="container" id="login">
        <div class="col-12 d-flex justify-content-center mt-5 ">
            <div class="card">
                <div class="card-header bg-danger">
                    <h3 style="text-align: center;">Kullanıcı Giriş Sayfası</h3>
                </div>
                <div class="card-body">
                    <form @submit.prevent="login">
                        <div class="row">
                            <div v-if="uyariDurumu()" class="alert alert-info input-group form-group" style="background-color: rgba(2, 255, 217, 0.87); color: rgb(35, 11, 131);"><strong>{{ uyariMesaji }}</strong></div> 
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                </div>
                                <input type="email" class="form-control" placeholder="e-mail" v-model="email">
                            </div>
                            <div class="input-group form-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                </div>
                                <input type="password" class="form-control" placeholder="parola" v-model="parola">
                            </div>
                            <div class="row align-items-center remember">
                                <input type="checkbox">Beni Hatırla
                            </div>
                            <div class="form-group col-12">
                                <button class="btn btn-warning float-right">Giriş Yap</button>
                            </div>
                        </div>
                        
                    </form>
                </div>
                <div class="card-footer">
                    <router-link to="/register" tag="div" class="d-flex justify-content-center links">
                        Hesabınız yok mu?<a>Kayıt ol</a>
                    </router-link>
                    <router-link to="/parolamiunuttum" tag="div" class="d-flex justify-content-center">
                        <a>Parolamı unuttum..!</a>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="nokta" style="margin-top: 230px;"><h3>.</h3></div>
    </div>
</template>
<script>
    import axios from "axios";
    export default {
        data() {
            return {
                email: "",
                parola: "",
                uyariMesaji: "",
            }
        },
        methods: {
            login() {
                let kayitVarmi = false
                axios.get("http://localhost:8888/kullanici", {params: {email: this.email, parola: this.parola}})
                    .then(response => {
                        let data = response.data;
                        console.log(data);
                            if(!data){
                                this.uyariMesaji = "Email veya Parola hatalı! \nLütfen bir daha deneyiniz.";
                            }else {
                                this.$store.dispatch("setIsLoginAc", true)
                                this.$store.state.kullanici= { id:data.id, name: data.ad, surname: data.soyad , profil_fotografi: data.profil_fotografi};
                                this.$router.push({ name: "anasayfa"});
                            }
                        }
                    )
                    .catch(e => console.log(e))
            },
            yonlendir(){
                this.$router.push({ name: "anasayfa"});
            },
            uyariDurumu() {
                if (this.uyariMesaji != '') {
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
        },
        created(){
            this.$store.dispatch("setIsLoginAc", false);
        }
    }
</script>
<style scoped>
</style>
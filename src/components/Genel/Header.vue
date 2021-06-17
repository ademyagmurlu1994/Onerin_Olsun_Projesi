<template>
    <nav class="navbar navbar-icon-top navbar-expand-lg navbar-light" style="background-color: beige;">
        <router-link to="/">
            <a class="navbar-brand" id="projeIsmi" style="color:darkgreen"><img id="projeSimge"
                    src="../../../public/images/OnerinOlsunIcon.png"
                    style="width: 25px; height:auto; margin-right:4px;"><strong>Önerin Olsun</strong></a>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto ">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img :src="$store.state.kullanici.profil_fotografi" class="rounded-circle profil_img" style="width: 30px; height: 30px;">
                        </img>
                        Profilim
                        <i class="fa fa-envelope-o">
                            <span class="badge badge-primary">11</span>
                        </i>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <router-link tag="a" :to="{name : 'onerilerim', params: {kullaniciId: 1}}" class="dropdown-item">Önerilerim</router-link>
                        <router-link tag="a" :to="{name : 'fikirlerim', params: {kullaniciId: 1}}" class="dropdown-item">Fikirlerim</router-link>
                        <router-link tag="a" :to="{name : 'sikayetlerim', params: {kullaniciId: 1}}" class="dropdown-item">Şikayetlerim</router-link>
                        <router-link tag="a" :to="{name : 'mesajlarim', params: {kullaniciId: 1}}" class="dropdown-item">Gelen Kutusu
                            <i class="fa fa-envelope-o"><span class="badge badge-primary">11</span></i>
                        </router-link>

                        <div class="dropdown-divider"></div>
                        <router-link tag="a" :to="{ name: 'kullaniciKayitBilgileri', params: { kullaniciId: kullaniciId }}" class="dropdown-item">Daha fazlası...</router-link>
                    </div>
                </li>

                <router-link v-if="isLogin" active-class="active" to="/ddd" exact tag="li">
                    <a class="nav-link">
                        <i class="fa fa-user"></i>
                        <span>
                            {{ $store.state.kullanici.id }}
                            {{ $store.state.kullanici.name }}
                            {{ $store.state.kullanici.surname }}
                        </span>
                    </a>
                </router-link>

                <router-link active-class="active" to="/kullanici" tag="li">
                    <a class="nav-link">
                        <i class="fa fa-users"></i><span>Kullanıcılar</span>
                    </a>
                </router-link>

                <!--<li class="nav-item">
                    <a class="nav-link disabled" href="#">
                        <i class="fa fa-envelope-o">
                            <span class="badge badge-warning">11</span>
                        </i>
                        Disabled
                    </a>
                </li>-->
                
                <!--
                <router-link active-class="active" to="/" exact tag="li">
                    <a class="nav-link">
                        <i class="fa fa-cogs"></i><span> Ayarlar</span>
                    </a>
                </router-link>    
                -->
                
            </ul>
            <ul class="navbar-nav ">
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fa fa-bell">
                            <span class="badge badge-info">11</span>
                        </i>
                        Tüm Bildirimler
                    </a>
                </li>
                <!--
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                        <i class="fa fa-globe">
                            <span class="badge badge-success">11</span>
                        </i>
                        Test
                    </a>
                </li>  
                -->
                
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="text" placeholder="öneri veya fikir ara..." aria-label="Ara" v-model="oneriBaslik">
                
                <router-link :to="{name: 'oneriAramaSonuclari', query:{ 'oneriBaslik': oneriBaslik}}" tag="button" class="btn btn-outline-success my-2 my-sm-0">Ara
                </router-link>
                
            </form>
            <ul class="navbar-nav ml-2">
                <router-link v-if="!isLogin" active-class="active" to="/login" tag="li">
                    <a class="nav-link">
                        <i class="fas fa-sign-in-alt"></i> Giriş Yap<span class="sr-only">(current)</span>
                    </a>
                </router-link>
                <router-link v-if="isLogin" active-class="active" to="/login" tag="li">
                    <a class="nav-link">
                        <i class="fas fa-sign-out-alt"></i> Çıkış Yap<span class="sr-only"></span>
                    </a>
                </router-link> 
                <router-link v-if="!isLogin" active-class="active" to="/register" tag="li">
                    <a class="nav-link">
                        <i class="fas fa-user-plus"></i><span> Kayıt ol</span>
                    </a>
                </router-link>
            </ul>
            
        </div>
    </nav>
</template>
<script>
    export default {
        data(){
            return{
                kullaniciId: this.$store.state.kullanici.id,
                oneriBaslik: '',
            }
        },
        computed:{
            isLogin:{
                get(){
                    return this.$store.getters.getIsLogin;
                },
                set(value){
                    this.$store.dispatch("setIsLoginAc", value);
                }
            }
        },
    }
</script>
<style >
    #projeIsmi :hover {
        color: blueviolet;
        font-size: 18px;

    }
    #projeSimge {
        width: 10px;
        background-position-x: 50px;
    }
</style>
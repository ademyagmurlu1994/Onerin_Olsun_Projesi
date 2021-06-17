<template>
    <div class="bg-light border-right" id="profilsidebar-wrapper">
        <div class="list-group list-group-flush">
            <router-link active-class="active" :to="{ name: 'kullaniciKayitBilgileri', params: { kullaniciId: kullaniciId }}" exact tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-align-left fa-lg"></i><span class="arrow"> Kayıt Bilgileri </span>
            </router-link>
            <router-link active-class="active" :to="{ name: 'onerilerim', params: { kullaniciId: kullaniciId }}" tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-lightbulb fa-lg"></i><span class="arrow"> Önerilerim </span>
            </router-link>
            <router-link active-class="active" :to="{ name: 'fikirlerim', params: { kullaniciId: kullaniciId }}" tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-brain fa-lg"></i><span class="arrow"> Fikirlerim </span>
            </router-link>
            <router-link active-class="active" :to="{ name: 'mesajlarim', params: { kullaniciId: kullaniciId }}" tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-box-open fa-lg" ></i><span class="arrow"> Mesajlarım </span>
            </router-link>
            <router-link active-class="active" :to="{ name: 'yorumlarim', params: { kullaniciId: kullaniciId }}" tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-comments fa-lg" ></i><span class="arrow">  Yorumlarım </span>
            </router-link>
            <router-link active-class="active" :to="{ name: 'begenilerim', params: { kullaniciId: kullaniciId }}" tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-heart fa-lg" ></i><span class="arrow"> Beğenilerim </span>
            </router-link>
            <router-link active-class="active" :to="{ name: 'sikayetlerim', params: { kullaniciId: kullaniciId }}" tag="a" class="list-group-item list-group-item-action main-item">
                <i class="fas fa-angry fa-lg" ></i><span class="arrow"> Şikayetlerim </span>
            </router-link> 
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                kullaniciId: this.$store.state.kullanici.id,
            }
        }
    }
</script>


<style scoped>
    .list-group-item.active{
        background-color: rgb(19, 133, 126);
    }
    #profilsidebar-wrapper .main-item i{
        color:rgb(126, 209, 201);
    }

    #profilsidebar-wrapper .main-item span{
        position: absolute;
        left: 60px;
    }

    #profilsidebar-wrapper .main-item:hover{
        background-color: rgba(27, 145, 127, 0.047);
        color: rgb(0, 0, 0);
    }
      
    #page-content-wrapper {
        min-width: 100vw;
        background-color: aqua;
    }
    
    #wrapper.toggled #profilsidebar-wrapper {
        margin-left: 0;
    }

    .list-group-item{
        font-size: 15px;
        font-weight: 700;
    }
          
</style>



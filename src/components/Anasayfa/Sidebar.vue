<template>
    <div class="bg-light border-right" id="sidebar-wrapper">
        <div class="sidebar-heading">Kategoriler</div>
        <div class="list-group list-group-flush">
          <router-link :to="{name: 'oneriAramaSonuclari', query:{ kategoriId: 1}}" tag="a" class="list-group-item list-group-item-action main-item">
            <i class="fa fa-microchip fa-lg" style="color:rgb(63, 63, 238)"></i><span class="arrow"> Teknoloji </span>
          </router-link>
          <router-link :to="{name: 'oneriAramaSonuclari', query:{ kategoriId: 2}}" tag="a" class="list-group-item list-group-item-action main-item">
            <i class="fa fa-leaf fa-lg" style="color:rgb(19, 195, 45)"></i><span class="arrow"> Çevre</span>
          </router-link>
          <router-link :to="{name: 'oneriAramaSonuclari', query:{ kategoriId: 3}}" tag="a" class="list-group-item list-group-item-action main-item">
            <i class="fas fa-bolt fa-lg" style="color:rgb(241, 65, 11)"></i><span class="arrow"> Elektronik</span>
          </router-link>
          <router-link :to="{name: 'oneriAramaSonuclari', query:{ kategoriId: 4}}" tag="a" class="list-group-item list-group-item-action main-item">
            <i class="fa fa-home fa-lg" style="color:rgb(138, 109, 29)"></i><span class="arrow"> Ev ve İşyeri</span>
          </router-link>
          <router-link :to="{name: 'oneriAramaSonuclari', query:{ kategoriId: 5}}" tag="a" class="list-group-item list-group-item-action main-item">
            <i class="fa fa-heartbeat fa-lg" style="color:rgb(224, 14, 231)"></i><span class="arrow"> Sağlık</span>
          </router-link>
          <router-link :to="{name: 'oneriAramaSonuclari', query:{ kategoriId: 6}}" tag="a" class="list-group-item list-group-item-action main-item">
            <i class="fa fa-utensils fa-lg" style="color:rgb(235, 196, 23)"></i><span class="arrow"> Yiyecek ve içecek</span>
          </router-link>
        </div>
    </div>
</template>
<style scoped>
    #sidebar-wrapper .sidebar-heading {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 30px;
        color: white;
        background-color: #090347;
        height: 40px;
        text-align: center;
        font-style: inherit;
    }
    
    #sidebar-wrapper .main-item span{
        position: absolute;
        left: 60px;
    }
    
    #sidebar-wrapper .main-item:hover{
        background-color: rgb(8, 44, 112);
        color: white;
    }
      
    #page-content-wrapper {
      min-width: 100vw;
      background-color: aqua;
    }
    
    #wrapper.toggled #sidebar-wrapper {
      margin-left: 0;
    }
  
    
    @media (min-width: 768px) {
      #sidebar-wrapper {
        margin-left: 0;
      }
    
      #page-content-wrapper {
        min-width: 0;
        width: 100%;
      }
    
      #wrapper.toggled #sidebar-wrapper {
        margin-left: -15rem;
      }
    }
      
</style>




<template>
    <div>
        <div class="col-12 mt-3" >
            <h3 style="color: rgb(12, 165, 182); text-align:center;"><i class="fas fa-bullhorn"></i> Duyurular</h3>
            <hr style="border: none; height: 2px; color: #333; background-color: #333;"> 
            <div class="duyurular" style="height:400px; overflow-x: hidden; overflow-y:auto;">  
                <div v-for="i in 10" class="col duyurular-item mt-3">
                    <p class="duyuru-icerik">Hiro Hamada lives in the futuristic  ....</p>
                    <div class="row duyuru-footer">
                        <div  class="">
                            <div v-if="i<4" class="row yeni-duyuru-bildirimi">Yeni</div>
                        </div>
                        <div class=" col-10 duyuru-tarih">23.05.2020</div>
                    </div>
                    <hr style="border-top: solid rgb(233, 233, 238) 1px;">
                    <!--
                      <router-link :to="{ name: 'oneriAyrinti', params: { oneriId: oneri.id }}" tag="h3" style="cursor: pointer;">
                        <h6 style="margin-top:10px;"> asdfasdfasdfsad </h6>
                    </router-link>
                    <p>asdfşlaskdfşlkasldşfkasşdfklasdfkasşdklfşldf</p>
                    <div class="row oneri-item-footer">
                        <router-link :to="{ name: 'oneriAyrinti', params: { oneriId: oneri.id }}" tag="button" class="btn btn-info btn-sm col-xs-4 btn_ayrinti">Ayrıntılara gözat</router-link>
                        <p class="col">{{oneri.created_at}}</p>
                    </div>  
                    -->
                    
                </div>
            </div>
                        
        </div>
    </div>
</template>
<script></script>
<style scoped>
    .duyurular{
        box-shadow:rgb(133, 132, 132)  2px 2px 4px 0.3px;   
    }
    .duyurular-item{
        padding-right:0px;
        padding-left:0px;
        margin-right: 15px;
        margin-left: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
    }

    

    .duyurular-item .duyuru-icerik{
        font-size: 14px;
        color: rgba(72, 41, 152, 0.734);
    }

    .duyuru-footer{
        margin-top: -15px;
        font-size: 11px;
    }
    .duyuru-footer .yeni-duyuru-bildirimi{
        padding: 0px 5px 0px 5px;
        margin-left: 15px;
        background-color: rgb(224, 40, 80);
        color: rgba(255, 255, 255, 0.986);
        box-shadow: rgb(139, 140, 140) 0px 0px 2px;
        border-radius: 5px;
        font-weight: 700;
        
    }
    .duyuru-footer .duyuru-tarih{
        position: absolute;
        left: 40px;
        text-align: end;
        color: rgba(93, 90, 90, 0.755);
        margin-right: -20px;
    }

    

    .duyurular::-webkit-scrollbar-track
    {
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
        border-radius: 10px;
    }

    .duyurular::-webkit-scrollbar
    {
        width: 10px;
        background-color: #F5F5F5;
    }

    .duyurular::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-image: -webkit-gradient(linear,
                                        left bottom,
                                        left top,
                                        color-stop(0.44, rgb(122, 196, 217)),
                                        color-stop(0.72, rgb(73, 177, 189)),
                                        color-stop(0.86, rgb(28, 108, 148)));
    }

</style>
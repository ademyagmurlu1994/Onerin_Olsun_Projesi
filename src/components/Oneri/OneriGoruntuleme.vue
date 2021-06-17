<template>
    <div>
        <div class="col-12 mt-3">
            <h3 style="color: red;">Güncel Öneri ve Fikirler</h3>
            <hr style="border: none; height: 2px; color: #333; background-color: #333;">
            <div class="row">
                <div v-for="oneri in oneriler" class="col oneriler-item mb-3" aria-label="sdfasdfsdfasdfasdf">
                    <router-link :to="{ name: 'oneriAyrinti', params: { oneriId: oneri.id }}" tag="h3" style="cursor: pointer;">
                        <h6 style="margin-top:10px;" >{{ oneri.baslik }}</h6>
                        <!--<hr style="border: none; height: 1px; background-color: rgba(175, 176, 181, 0.435);">-->
                        <img :src="oneri.image" v-if="oneri.image==null? oneri.image='../../../public/images/default_image.jpg': oneri.image=oneri.image" :alt="oneri.baslik">  
                    </router-link>
                    <p>{{ oneri.icerik }} ...</p>
                    <div class="row oneri-item-footer">
                        <router-link :to="{ name: 'oneriAyrinti', params: { oneriId: oneri.id }}" tag="button" class="btn btn-info btn-sm col-xs-4 btn_ayrinti">Ayrıntılara gözat</router-link>
                        <p class="col">{{oneri.created_at}}</p>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <nav aria-label="...">
                <ul class="pagination justify-content-center">
                    <li class="page-item  mr-2 "  @click="aktifPageItem != 1 ? aktifPageItem -= 1 : aktifPageItem = 1">
                        <span class="page-link " style="background-color: rgb(11, 86, 138); color:aliceblue;"><i class="fas fa-backward mr-2"></i> Geri</span>
                    </li>

                    <li class="page-item" v-for="index in pageSayisi" :class="{'active': aktifPageItem==index }" @click="aktifPageItem = index">
                        <span class="page-link ">{{index}}</span>
                    </li>
                        
                    <li class="page-item ml-2"  @click="aktifPageItem != pageSayisi ? aktifPageItem += 1:aktifPageItem = pageSayisi">
                        <a class="page-link" style="background-color: rgb(11, 86, 138); color:aliceblue;"> İleri <i class="fas fa-forward ml-2"></i>  </a>
                    </li>
                </ul>
              </nav>
              <!-- Pagination son--> 

        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                oneriler: {},
                pageSayisi: 1,
                aktifPageItem: 1,
                maxOneri: 4
            }
        },
        methods:{
            deneme(data){
                console.log(data.id);
            },
            onerileriVeritabanindanGetir(){
                axios.get("http://localhost:8888/oneriler", {params: {pageNumber: this.aktifPageItem, maxOneri: this.maxOneri}})
                    .then(response => {
                        let datas = response.data;
                        for(let key in datas){
                            datas[key].icerik= datas[key].icerik.slice(0, 100);

                            let date = datas[key].created_at;
                            const yil = date.slice(0, 4);
                            const ay = date.slice(5, 7);
                            const gun = date.slice(8, 10);
                            const saat = date.slice(11, 19);
                            const tarih = gun + "" + "." + ay + "." + yil;
                            datas[key].created_at = tarih;
                        }
                        this.oneriler = datas;
                    })
                    .catch(e => console.log(e))

                // Toplam Oneri Sayisi
                axios.get("http://localhost:8888/oneriler")
                .then(response => {
                    let datas = response.data;
                    //console.log(datas.toplamonerisayisi);
                    this.pageSayisi = Math.round(datas.toplamonerisayisi/this.maxOneri);
                })
                .catch(e => console.log(e))
            }
        },
        created(){
            this.onerileriVeritabanindanGetir();
        },
        watch: {
            aktifPageItem(){
                this.onerileriVeritabanindanGetir();
            }
        }

    }
</script>

<style scoped>

    .page-link{
        padding: 5px 20px 5px 20px;
        font-size: large;
    }

    .page-item.active .page-link{
        
        background-color: rgb(255, 226, 2);
        color:rgb(11, 86, 138);
        font-weight: 800;
    }

    .btn_ayrinti{
        padding-top: 0px;
        padding-bottom: 20px;
        padding-right: 3px;
        padding-left: 3px;
        height: 20px;
        text-align:center;
        justify-content: center;
        font-size: small;
    }



    .oneriler-item{
        padding-right:0px;
        padding-left:0px;
        border: 1.5px solid rgba(75, 78, 78, 0.19);
        /*background-color: rgb(255, 255, 255);*/
        margin-right: 15px;
        margin-left: 15px;
        margin-bottom: 10px;
        border-radius: 8px;
        /*width:px;
        height: auto;*/
    }

    .oneriler-item p, .oneriler-item button{
        margin-right: 15px;
        margin-left: 15px;
    }

    .oneriler-item hr{
        margin-top: -3px;
        margin-bottom: 5px;
    }
    .oneriler-item:hover{
        background-color: rgb(2, 1, 1);
        color: azure;
        font-style:normal;
    }
    .oneriler-item:hover p{
        color: azure;
        font-style:normal !important;
    }
    .oneriler-item p{
        text-align: justify;
        font-size: 13.2px;
        font-weight: 320;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .oneriler-item img{
        padding-right:0px;
        padding-left:0px;
        height: 170px;
        width: 335px;
        margin-bottom: 10px;
    }
    h3{
        text-align: center;
    }
    .oneri-item-footer{
        margin-top: -10px;
        margin-left: 0px;
        margin-bottom: 5px;
    }
    .oneri-item-footer button{
        margin-top: 5px;
        margin-bottom: 5px;
    }
    .oneri-item-footer p{
        font-size: 15px;
        text-align:right;
        font-weight: 500;
        color: rgba(51, 51, 51, 0.564);
    }
</style>	
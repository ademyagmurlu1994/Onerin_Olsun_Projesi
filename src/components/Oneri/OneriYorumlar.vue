<template>
  <div class="row" style="background-color: #f3f4f571; padding:10px;">
    <div class="form-group-item col-lg-6 col-md-12  mt-4">
      <textarea type="text" class="form-control" placeholder="Bu öneriye sen de bir yorum yap..." rows="5" v-model="kaydedilecekYorum" ></textarea>
      <button class="btn btn-info float-right mt-2" @click="yorumuVeritabaninaKaydet()" :disabled="kaydedilecekYorum == ''">Yorumu Gönder</button>
    </div>
    <div class="col-lg-12" >
      <h4 style="text-align:justify; margin-top:22px; color:rgba(15, 135, 135, 0.789);">Bu öneri için yapılan tüm yorumlar</h4>
      <hr>

      <div class="row" v-for="(yorum, index) in yorumlar">
        <div>
          <img :src="yorum.profil_fotografi" style="width:50px; height: 50px; border-radius:6px; margin-right:5px;" alt="">
        </div>
        <div class="col-lg-7 col-sm-10">
          <div id="header-author" class="style-scope ytd-comment-renderer">
            <a id="author-text" class="yt-simple-endpoint style-scope ytd-comment-renderer" href="#">
              <span class="style-scope ytd-comment-renderer">{{ yorum.kullanici_adi }} {{ yorum.soyad }}</span>
            </a>
            <a class="published-time-text above-comment style-scope ytd-comment-renderer" style="color: rgba(0, 0, 0, 0.585); font-size:13px;">{{ yorum.updated_at }}</a>
          </div>
          <p v-if="(tiklananAktifYorumButton!=1) || (aktifYorumId != yorum.id)">{{ yorum.icerik }}</p>

          <div v-if="((tiklananAktifYorumButton==1) || (tiklananAktifYorumButton==2 )) && (aktifYorumId == yorum.id)" class="form-group-item col-lg-9 mt-1">
            <div class="row">
              <textarea type="text" class="form-control" placeholder="..." rows="2" v-model="aktifYorumTextareaMetni" required></textarea>
              <button class="btn btn-success float-right btn-xs mt-1" style="text-align: right;" @click="onaylaDuzenlemeVeyaYanit(index)" :disabled="(aktifYorumTextareaMetni == null) || (aktifYorumTextareaMetni == '')">Onayla</button>
              <button class="btn btn-outline-danger float-right btn-xs mt-1 ml-2" style="text-align: right;" @click="tiklananAktifYorumButton=0" >İptal</button>

            </div>              
          </div>
          
          <div class="yorum-footer" v-if="(tiklananAktifYorumButton==0) || (aktifYorumId != yorum.id)">
            <div style="margin-top:-13px; margin-bottom:20px;" v-if="yorum.kullanici_id == $store.state.kullanici.id">
              <button class="btn btn-outline-info btn-xs mr-2" @click="yorumuDuzenle(yorum.id, yorum.icerik)"> Düzenle</button>
              <button class="btn btn-outline-danger btn-xs" @click="yorumuKaldir(yorum.id, index)"> Kaldır</button>
            </div>
            
            <div style="margin-top:-13px; margin-bottom:20px;" v-if="yorum.kullanici_id != $store.state.kullanici.id">
              <button class="btn btn-info btn-xs" @click="yorumaYanitVer(yorum.id)" > Yanıt ver</button>
              <button class="btn btn-danger btn-xs ml-2" @click="yorumuSikayetEt(yorum.id)"> Şikayet et</button>
            </div>
            <!-- Yanitlar  -->
            <div>
              <a @click="(aktifYorumId = yorum.id) && (tiklananAktifYorumButton=0)" style="color:rgb(30, 177, 155); font-weight:500">Yanıtları Göster</a>
              <div class="ml-3 mt-2" v-if="(aktifYorumId == yorum.id)">
                <div v-for="yanit in yorum.yanitlar">
                  <div id="header-author" class="style-scope ytd-comment-renderer">
                    <a id="author-text" class="yt-simple-endpoint style-scope ytd-comment-renderer" href="#">
                      <span class="style-scope ytd-comment-renderer">{{ yanit.kullanici_adi }} {{ yanit.soyad }}</span>
                    </a>
                    <a class="published-time-text above-comment style-scope ytd-comment-renderer" style="color: rgba(0, 0, 0, 0.585); font-size:13px;">{{ yanit.updated_at }}</a>
                  </div>
                  <p v-if="(tiklananAktifYorumButton==0) || (aktifYorumId != yorum.id)">{{ yanit.icerik }}</p>
                </div>
              </div>
              
            </div>
          </div>
          
         <hr> 
        </div>
        
        
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data(){
    return {
      kaydedilecekYorum: '',
      tiklananAktifYorumButton: 0, //0: tıklanmadı veya Yorum Yanıtlar, 1 : Duzenle, 2: Yanıt ver,
      aktifYorumId: null,
      aktifYorumTextareaMetni: '',
      sistemMesaji: this.$store.state.sistemMesaji,
      yanitlar: null,
      yorumlar: null,
    }
  },
  methods:{
    yorumuVeritabaninaKaydet(){
      let yorum = {kullaniciId: this.$store.state.kullanici.id, oneriId: this.$store.state.aktifOneriId, icerik: this.kaydedilecekYorum}
      let aktifKullanici = this.$store.state.kullanici;
      aktifKullanici = {kullanici_id: aktifKullanici.id, kullanici_adi: aktifKullanici.name, soyad: aktifKullanici.surname, profil_fotografi: aktifKullanici.profil_fotografi, updated_at: 'Biraz önce'}
      
      axios.post("http://localhost:8888/oneri-yorum", yorum)
              .then(response => {
                if(response.data[0] != null){
                  let sonEklenenYorumId = response.data[0];
                  let yorumTumveriler = {id: sonEklenenYorumId, ...aktifKullanici, ...yorum}
                  this.yorumlar.unshift(yorumTumveriler);
                  this.kaydedilecekYorum = '';

                  this.sistemMesaji={mesajTuru:  1, metin:"Yorum başarılı bir şekilde gönderildi..."}
                }
              })
              
    },
    tumYorumlariVeritabanindanGetir(){
      axios.get("http://localhost:8888/oneri-yorumlar/" + this.$store.state.aktifOneriId)
              .then(response => {
                  let data = response.data;
                  for(var index=0; index < data.length; index++)
                  {
                    let date = data[index].updated_at;
                    const yil = date.slice(0, 4);
                    const ay = date.slice(5, 7);
                    const gun = date.slice(8, 10);
                    const tarih = gun + "" + "." + ay + "." + yil;
                    data[index].updated_at = tarih;
                  }
                  this.yorumlar = data;
              })
              
    },
    yorumuDuzenle(yorumId, yorumIcerik){
      this.tiklananAktifYorumButton = 1;
      this.aktifYorumId = yorumId;
      this.aktifYorumTextareaMetni = yorumIcerik;
    },
    yorumaYanitVer(yorumId){
      this.tiklananAktifYorumButton = 2;
      this.aktifYorumId = yorumId;
      this.aktifYorumTextareaMetni = null;
    },
    onaylaDuzenlemeVeyaYanit(yorumIndex){
      if(this.tiklananAktifYorumButton == 1){ //Duzenleme butonuna tıklanmış
        axios.put("http://localhost:8888/oneri-yorum/"+ this.aktifYorumId, {icerik: this.aktifYorumTextareaMetni})
              .then(response => {
                if(response.data){
                  this.sistemMesaji={mesajTuru:  1, metin:"Yorum düzenleme başarılı..."}
                }
              })
        this.yorumlar[yorumIndex].icerik = this.aktifYorumTextareaMetni;
      } 
      else if(this.tiklananAktifYorumButton == 2){ // Yanıt ver butonuna tıklanmış
        let yanit = {yorum_id: this.aktifYorumId, kullanici_id: this.$store.state.kullanici.id, icerik: this.aktifYorumTextareaMetni};
        
        axios.post("http://localhost:8888/oneri-yorum-yanit", yanit)
              .then(response => {
                if(response.data){
                  let yanitAktifKullanici = {...yanit, kullanici_adi: this.$store.state.kullanici.name, soyad: this.$store.state.kullanici.surname, updated_at: 'Az önce'};
                  this.yorumlar[yorumIndex].yanitlar.unshift(yanitAktifKullanici);

                  this.sistemMesaji={mesajTuru:  1, metin:"Yanıt ekleme başarılı..."}
                }
              })
      }
      this.tiklananAktifYorumButton = 0;
    },
    yorumuKaldir(yorumId, yorumIndex){
      let onay = confirm("Yorumu Silmek İstediğinizden Emin misiniz ?");
              if(onay){
                  this.yorumlar.splice(yorumIndex, 1);
                  axios.delete("http://localhost:8888/yorum/" + yorumId)
                          .then(response =>{
                              if(response.data){
                                  this.sistemMesaji={mesajTuru:  1, metin: "Silme İşlemi Başarılı"};
                              }
                          })
              }
    }
  },
  watch:{
    sistemMesaji(){
      this.$store.state.sistemMesaji = this.sistemMesaji;
    }
  },
  created(){
    this.tumYorumlariVeritabanindanGetir();      
  }

}
</script>
<style scoped>
textarea{
  border-color:rgba(38, 142, 142, 0.537);
}
.btn-xs {
  padding  : 8px 5px;
  font-size  : .875rem;
  line-height  : .5;
  border-radius : .2rem;
}
</style>
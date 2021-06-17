import Vue from "vue";
import Vuex from "vuex";
import counter from "./modules/counter"
import security from "./modules/security"
import * as getters from "./getters"
import * as mutations from "./mutations"
import * as actions from "./actions"
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        value: 10,
        girisYapildiMi: false,
        kullanici: { id:1, name: "Adem", surname: "YAĞMURLU", profil_fotografi: '../../../../../public/images/profil/profil_2.jpg'},
        token: "",
        aktifOneriId: 0, // düzenlenecek olan önerinin Id'si
        sistemMesaji: {mesajTuru: 1, metin: null} // 1: olumlu, 2: olumsuz, 3: Uyari, 4: bilgilendirme

    },
    getters,  // verileri getirmeye yarar. (Computed 'a benzer)
    mutations,  // state verilerini değiştirmeye yarar. (Methods ' benzer)
    actions, //  mutation fonksiyonlerının asenkron olarak çalışmasını sağlar. 
    modules: {
        counter,
        security
    }
});
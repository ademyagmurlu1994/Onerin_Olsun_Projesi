import Anasayfa from "./components/Anasayfa/Anasayfa";
import Kullanici from "./components/Kullanici/Kullanici";
import KullaniciStart from "./components/Kullanici/KullaniciStart";
import KullaniciDetail from "./components/Kullanici/KullaniciDetail";
import KullaniciEdit from "./components/Kullanici/KullaniciEdit";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ParolamiUnuttum from "./components/Auth/ParolamiUnuttum";
import Header from "./components/Genel/Header";
import OneriYayinlama from "./components/Oneri/OneriYayinlama";
import OneriAyrinti from "./components/Oneri/OneriAyrinti";
import OneriAramaSonuclari from "./components/Oneri/OneriAramaSonuclari";
import Profil from "./components/Profil/Profil";
import KullaniciKayitBilgileri from "./components/Profil/KullaniciKayitBilgileri";
import Onerilerim from "./components/Profil/Onerilerim";
import Fikirlerim from "./components/Profil/Fikirlerim";
import Mesajlarim from "./components/Profil/Mesajlarim";
import Yorumlarim from "./components/Profil/Yorumlarim";
import Begenilerim from "./components/Profil/Begenilerim";
import Sikayetlerim from "./components/Profil/Sikayetlerim";
import OneriDuzenleme from "./components/Profil/OneriDuzenleme";
import OneriDetaylar from "./components/Profil/OneriDetaylar";

export const routes = [
    { path: '',  name: 'anasayfa', components: {
        default: Anasayfa,
        "header-top": Header
    }},
    { path: '/login', name: 'giris', component: Login},
    { path: '/register', name: 'kullaniciKayit', component: Register},
    { path: '/parolamiunuttum', name: 'parolamiUnuttum', component: ParolamiUnuttum},
    { 
        path: '/kullanici', component: Kullanici, name: "kullanici", 
        components: {
         default: Kullanici,
         "header-top": Header
        },
        children: [
            { path: '/', component : KullaniciStart},  //   /user
            { path: ':id', component : KullaniciDetail}, //  /user/12
            { path: ':id/edit', component : KullaniciEdit, name: 'kullaniciEdit'} //  /user/12/edit
        ]
    },
    { path: '/oneriyayinlama', name: 'oneriYayinlama', component: OneriYayinlama},
    { path: '/oneriayrinti/:oneriId', name: 'oneriAyrinti', component: OneriAyrinti},
    { path: '/oneriaramasonuclari', name: 'oneriAramaSonuclari', component: OneriAramaSonuclari},



    {
        path: '/profil/', name: 'profil', component: Profil,
        components: {
            default: Profil
        },
        children: [
            { path: '/', component: KullaniciKayitBilgileri, name: 'kullaniciKayitBilgileri'},
            { path: ':kullaniciId/onerilerim', component: Onerilerim, name: 'onerilerim',
              components: {
                default: Onerilerim
              },
              children: [
                  //{path: '/', component: OneriDuzenleme, name: 'o'},
                  //{path: 'oneriduzenleme/:oneriId', component: OneriDuzenleme, name: 'oneriduzenleme'},
                  //{path: 'oneridetaylar/:oneriId', component: OneriDetaylar, name: 'oneridetaylar'},
              ]
        
        
            },
            { path: ':kullaniciId/fikirlerim', component: Fikirlerim, name: 'fikirlerim'},
            { path: ':kullaniciId/mesajlarim', component: Mesajlarim, name: 'mesajlarim'},
            { path: ':kullaniciId/yorumlarim', component: Yorumlarim, name: 'yorumlarim'},
            { path: ':kullaniciId/begenilerim', component: Begenilerim, name: 'begenilerim'},
            { path: ':kullaniciId/sikayetlerim', component: Sikayetlerim, name: 'sikayetlerim'},
        ]

    },





    { path: "/redirect", redirect: "/kullanici"},
    { path: "*", redirect: "/"}
];
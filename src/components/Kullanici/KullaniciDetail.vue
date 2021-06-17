<template>
    <div>
        <h3>Kullanıcı Detay Componenti</h3>
        <hr>
        <p>Kullanici id bilgisi: {{ $route.params.id }}</p>
        <router-link
            tag="button"
            class="btn btn-info"
            :to="{ name: 'kullaniciEdit', params: { id: $route.params.id }, query: {name: 'Adem', lastName: 'YAGMURLU'}}"
        >Kullanıcı Düzenle</router-link>
        <br>
    </div>
</template>
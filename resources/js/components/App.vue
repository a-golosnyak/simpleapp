<template>
    <div>
        <Header>
        </Header>
        <Navigation
            :loggedIn="loggedIn"
        >

        </Navigation>
        <div class='main-field '>
            <div class='container data-field'>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>

    import Header from './router/page/Header.vue';
    import Navigation from './router/page/Navigation.vue';
    import Vue from 'vue'

    export default {
        components: {
            Header,
            Navigation
        },
        data() {
            return {
                loggedIn: false,
                token: null,
                authUser: null
            }
        },
        created() {
           // console.log(this.getCookie('aaa'));

          //let token = Vue.cookie.get('access_token');

/*
            this.token = window.localStorage.getItem('token');
            this.authUser = window.localStorage.getItem('auth_user');

            console.log("Here App vue. " + window.localStorage.getItem('token') + '\nauth_user = ' + window.localStorage.getItem('auth_user'));

            if (window.localStorage.getItem('token') !== '') {
                this.loggedIn = true;
            }
*/
        },
        methods: {
        },
    }
</script>
<style>

</style>

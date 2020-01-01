<template>
    <div
        v-if="!!user"
        class='col-md-9'>
        <div class="d-flex flex-row justify-content-around mt-5">
            <div class="d-flex flex-row justify-content-center">
                <h3 class="">Profile</h3>
                <h3 class=" ml-3 font-weight-bold" v-text="user.email"></h3>
            </div>
        </div>
        <hr class="mt-5">
        <div
            v-if="user"
            class="text-sm"
        >
            <div class="d-flex flex-row">
                <div class="font-weight-bold mr-3">Name: </div>
                <div class="" v-text="user.name"></div>
            </div>
            <div class="mt-2 d-flex flex-row">
                <div class="font-weight-bold mr-3">Emil: </div>
                <div class="" v-text="user.email"></div>
            </div>
            <div class="mt-2 d-flex flex-row text-xs">
                <div class="font-weight-bold mr-3">Profile created: </div>
                <div class="" v-text="user.created_at"></div>
            </div>
        </div>
        <hr>

       <router-link :to="`/user/${user.id}/edit`">
            <button class="float-right ml-2">Edit</button>
        </router-link>
    </div>
</template>



<script>
    import {format} from 'date-fns'

    export default {
        data() {
            return {
                user_id: null,
                user: null,
            }
        },
        created(){
            this.user_id = window.localStorage.getItem('auth_user');
            this.loadUser();
        },
        methods: {
           loadUser(){
               axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
               axios
                   .get(`/api/user/${this.user_id}`)
                   .then(({data}) => {
                       this.user = data;
                       this.user.created_at = format(this.user.created_at, 'YYYY-MM-DD HH:MM')
                   })
                   .catch(({error})=> {
                       console.log(error)
                   })
                   .finally(() => {})
           },
        }
    }
</script>

<style>

</style>

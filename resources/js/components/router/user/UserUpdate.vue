<template>
    <div
        class='col-md-9'
        v-if="!!user"
    >
        <div class="d-flex flex-row justify-content-around mt-5">
            <div class="d-flex flex-row justify-content-center">
                <h3 class="">Profile Editor</h3>
                <h3 class="ml-3" v-text="user.email"></h3>
            </div>
        </div>
        <div
            v-if="user"
            class="text-sm mt-3"
        >
            <div class="d-flex flex-row">
                <div class="mr-3 font-weight-bold">Name: </div>
            </div>
            <div class="form-control">
                <input
                    id="name"
                    type="name"
                    name="name"
                    placeholder="Name"
                    required
                    autofocus
                    v-model="user.name"
                >
            </div>

            <div class="mt-2 d-flex flex-row">
                <div class="font-weight-bold mr-3">Emil: </div>
            </div>
            <div class="form-control">
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    autofocus
                    v-model="user.email"
                >
            </div>

            <div class="mt-2 d-flex flex-row ">
                <div class="font-weight-bold mr-3">Profile created: </div>
                <div class="" v-text="user.created_at"></div>
            </div>


            <button
                class="float-right ml-2 mb-3"
                @click="updateUser"
            >Save
            </button>

            <button
                class="float-right px-3"
                @click="$router.go(-1)"
                :disabled="isLoading"
            >Cancel
            </button>
        </div>

        <hr style="clear:both;">
        <div
            class="text-sm"
        >
            <div class="form-control">
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    v-model="password"
                >
            </div>
            <div class="form-control">
                <input
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm password"
                    required
                    v-model="password_confirmation"
                >
            </div>
            <button
                class="float-right ml-2 mb-3"
                @click="resetPassword"
            >
                Reset password
            </button>
        </div>
    </div>
</template>

<script>
    import {format} from 'date-fns'

    export default {
        data() {
            return {
                user_id: null,
                user: null,
                password: null,
                password_confirmation: null,

                isLoading: null,
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

            updateUser(){
                this.isLoading = true;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');

                axios
                    .put(`/api/user/${this.user.id}`, {
                        'name': this.user.name,
                        'email': this.user.email
                    })
                    .then((data)=>{
                        this.editing = false;

                        this.$toast.success({
                            title: 'Success!',
                            message: 'User updated.',
                        })
                    })
                    .catch(({response}) => {
                        if ((response.status = 422)) {
                            this.errors = response.data;
                            console.log(this.errors);

                            this.$toast.error({
                                title: 'Error!',
                                message: this.errors.message,
                            })
                        }
                    })
                    .finally(() => this.isLoading = false);
            },
            resetPassword() {
              this.isLoading = true;
              axios
                .put(`/api/user/${this.user.id}/reset-password`, {
                    'password': this.password,
                    'password_confirmation': this.password_confirmation
                })
                .then(() => {
                    this.$toast.success({
                        title: 'Success!',
                        message: 'Password updated.',
                    })
                    this.$router.go(-1)
                })
                .catch(({response}) => {
                  if (response.status === 422) {
                    this.errors = response.data;
                    this.$toast.error({
                        title: 'Error!',
                        message: this.errors.message,
                    })
                  }
                })
                .finally(() => this.isLoading = false);
            },
        }
    }
</script>

<style>

</style>

<template>
    <div class="login-container ">
        <h3 class="mt-5 ml-3">Register</h3>
        <form role="" method="POST" action="/register" class="pt-0 mt-5">
            <div class="form-control">
            <input
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                required
                autofocus
                v-model="email">
            </div>
            <div class="form-control mb-3">
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    v-model="password">
            </div>
            <div class="form-control">
                <input
                    id="password_confirm"
                    type="password"
                    name="password_confirmation"
                    placeholder="Password Confirm"
                    required
                    v-model="password_confirmation"
                >
            </div>
            <div class="form-control">
                <input
                    id="name"
                    type="name"
                    name="name"
                    placeholder="Name"
                    required
                    v-model="name"
                >
            </div>
            <div class="form-control pt-4">
                <button
                    type="button"
                    @click="handleRegister"
                >Register
                </button>
            </div>
        </form>

<!--        clients></clients-->
<!--        <authorized-clients></authorized-clients>-->
<!--        <personal-access-tokens></personal-access-tokens>-->
    </div>
</template>

<script>
    import Clients from './passport/Clients'
    import AuthorizedClients from './passport/AuthorizedClients'
    import PersonalAccessTokens from './passport/PersonalAccessTokens'

    export default {
        components: {
            Clients,
            AuthorizedClients,
            PersonalAccessTokens
        },
        data() {
            return {
                name : "",
                email : "",
                password : "",
                password_confirmation : ""
            }
        },
        beforeCreate(){
        },
        created() {
        },
        methods:{
            handleRegister(){
                axios
                .post('api/register', {
                    'name': this.name,
                    'email': this.email,
                    'password': this.password,
                    'password_confirmation': this.password_confirmation,
                })
                .then(({data}) => {
                    console.log(data.message.message);
                    this.$toast.success({
                        title: 'Success!',
                        message: data.message,
                    })
                    //              this.$router.go(-1);
                })
                .catch(({response}) => {
                    this.$toast.error({
                    title: 'Error!',
                    message: this.errors.message,
                    })
                })
                .finally(() => this.isLoading = false);
            },
        }
    }
</script>

<style>
    form {
        padding-top: 40px;
    }

    @media (min-width: 744px) {
        #login form {
            padding-top: 80px;
        }
    }

    .form-control {
        margin-bottom: 3em;
    }

    input[type=email],
    input[type=password],
    input[type=name],
    label {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        font-size: 19px !important;
        line-height: 24px;
        color: #484848;
        font-weight: 300;
        -webkit-appearance: none;
    }

    input {
        background-color: transparent;
        padding: 8px;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        box-sizing:border-box
    }



    .form-control{
        border: none;
        width: 60%;
    }
</style>

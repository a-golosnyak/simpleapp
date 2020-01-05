<template>
    <div class="login-container ">
        <h3 class="mt-5 ml-3">Register</h3>
        <form role="" method="POST" action="/register" class="pt-0 mt-5">
            <input type="hidden" name="_token" :value="csrf_token" required>
            <div class="form-control">
            <input id="email" type="email" name="email" placeholder="Email Address" required autofocus>
            </div>
            <div class="form-control mb-3">
                <input id="password" type="password" name="password" placeholder="Password" required>
            </div>
            <div class="form-control">
                <input id="password_confirm" type="password" name="password_confirmation" placeholder="Password Confirm" required>
            </div>
            <div class="form-control">
                <input id="name" type="name" name="name" placeholder="Name" required>
            </div>
            <div class="form-control pt-4">
                <button type="submit" @click="handleSubmit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                csrf_token: 'null',
                isLoggedIn: null,

                name : "",
                email : "",
                password : "",
                password_confirmation : ""
            }
        },
        beforeCreate(){
            this.csrf_token = document.querySelector('meta[name="csrf-token"]').content;
            console.log(this.csrf_token);
        },
        created() {
          this.csrf_token = document.querySelector('meta[name="csrf-token"]').content;
          this.isLoggedIn = document.querySelector('meta[name="login-status"]').content;
          console.log('Logged in: ' + this.isLoggedIn );
        },
        methods:{
          handleSubmit(){
//            alert('Here');
          }
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
    button,
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
        padding: 11px;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        box-sizing:border-box
    }

    button {
        background-color: #888;
        color: #ffffff;
        cursor: pointer;
        border: #4fc08d;
        padding-top: 12px;
        padding-bottom: 12px;
        border-radius: 5px;
        font-weight: bold;
    }

    .form-control{
        border: none;
        width: 60%;
    }
</style>

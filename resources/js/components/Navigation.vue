<template>
    <div class="">
        <div class="navigation navbar navbar-expand-sm p-0">
            <div class="container ">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/">
                            <router-link :to='`/`'>
                                <a class="nav-link font-weight-bold" href="">Home</a>
                            </router-link>
                        </a>
                    </li>
                    <li class="nav-item  ">
                        <a class="nav-link" href="/">
                            <router-link :to='`/post/create`'>
                                <a class="nav-link font-weight-bold" href="">Create Post</a>
                            </router-link>
                        </a>
                    </li>
                </ul>
                <div
                    v-if="loggedIn"
                    class="form-inline pull-right"
                >
                    <router-link :to="`/user/${user_id}`">
                        <a class="nav-link font-weight-bold" v-text="">Profile</a>
                    </router-link>

                    <span
                        href=''
                        class="nav-link font-weight-bold link"
                        @click="logOut"
                    >Log out</span>
                </div>
                <div
                    v-else
                    class="form-inline pull-right"
                >
                    <router-link :to="`/login`">
                        <a class="nav-link font-weight-bold" href="/login">Login</a>
                    </router-link>
                    <router-link :to="`/register`">
                        <a class="nav-link font-weight-bold" href="/login">Register</a>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            user_id: null,
        }
    },
    props:{
      loggedIn: {
          type: Boolean,
          default: false,
      }
    },
    computed: {
    },

    created() {
        this.user_id = window.localStorage.getItem('auth_user');
    },
    methods: {
        logOut() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');

            window.localStorage.setItem('token', '');
            window.localStorage.setItem('auth_user', '');

            axios
                .post('/api/logout')
                .then(({data}) => {
                    this.$toast.success({
                        title: 'Success! You are logged out',
                        message: data.token_type,
                    })
                    document.querySelector('meta[name="login-status"]').content = '';
                    document.querySelector('meta[name="login-token"]').content = '';

                    window.localStorage.setItem('token', '')
                    window.localStorage.setItem('auth_user', '');
//                  this.$router.go(-1);
                })
                .catch(({response}) => {

                    this.$toast.error({
                        title: 'Error!',
                        message: this.errors.message,
                    })
                })
                .finally(() => {
                    this.isLoading = false
                     location.href = '/';
                });
        }
    }
}
</script>

<style>
    .navigation {
        background: linear-gradient(
            rgba(150, 150, 150, 0.7),
            rgba(150, 150, 150, 0.8),
            rgba(150, 150, 150, 0.9),
            rgba(150, 150, 150, 1.0));
        -webkit-box-shadow: inset 0 -0.1rem 0.25rem rgba(0, 0, 0, 0.1);
        box-shadow: inset 0 -0.1rem 0.25rem rgba(0, 0, 0, 0.1);
        font-size: 1.1rem;
    }

    .nav-link, .nav-item{
        color: #777;
    }
    .nav-link:hover, .nav-item:hover{
        color: #555;
    }
    .navbar-toggler-icon {
        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/1500/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
    }
    a {
        color: #555;
    }

    .link{
        cursor: pointer;
    }
</style>


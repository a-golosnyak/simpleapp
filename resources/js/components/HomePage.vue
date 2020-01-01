<template>
    <div class='row'>
        <div class='col-md-9 blog-main '>
            <div class='blog-post'>
                <div
                    v-for="post in posts"
                    class='container-fluid p-4'
                >
                    <router-link :to="`/post/${post.id}`">
                        <h2 class='blog-post-title'>{{ post.title }}</h2>
                    </router-link>

                    <p class='blog-post-meta' v-if="post.user">{{ post.created_at}} author {{  post.user.name}}<a class='none-decored' href='#'></a>
                    </p>
                    <br>
                    <div class='post-footer'>
                        <router-link :to="`/post/${post.id}`">
                            <button class="">More...</button>
                        </router-link>

                        <!--a href="/delete/" class="float-left mr-2"><button class="">Edit</button></a>
                        <a href="/delpost/" class="float-left mr-2"><button class="">Delete</button></a-->

                        <!--a href='/#commentAnchor' class='cursor-pointer none-decored float-right mr-2'>
                            <div class=''>Comments</div>
                        </a-->
                    </div>
                    <hr>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: [],
            isLoggedIn: null,
        }
    },
    created() {
        this.isLoggedIn = document.querySelector('meta[name="login-status"]').content;
        console.log('Logged in: ' + this.isLoggedIn );

        axios
        .get('/api/posts')
        .then(({data}) => {
            this.posts = data;
        })
        .catch(({response}) => {
            this.$toast.error({
            title: 'Error!',
            message: 'Unable to load posts',
            })
        })
    },
    computed: {

    },
    components: {
    }
}
</script>

<style>
    .blog-post {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .blog-post-title {
        margin-bottom: .25rem;
        color: #505050;
    }

    .blog-post-meta {
        margin-bottom: 1.25rem;
        color: #999;
    }

</style>

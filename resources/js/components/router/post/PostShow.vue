<template>
        <div class='col-md-9 blog-main '>
            <div class='blog-post '>
                <div
                    class='container-fluid p-4'
                    v-if="post.user"
                >
                    <h2 class='blog-post-title'>{{ post.title }}</h2>
                    <h6 class='blog-post-meta'>
                        {{ post.created_at }} auhor {{ post.user.name }}
                        <a class='none-decored' href='#'></a>
                    </h6>
                    <h5>{{ post.body }}</h5>

                    <br>
                    <div
                        v-if='isAuthor'
                    >
                        <button
                            class="float-right ml-2"
                            @click="editPost"
                        >Edit
                        </button>
                        <button
                            class="float-right"
                            @click="deletePost"
                        >Delete</button>
                    </div>
                    <h5
                        class="mt-5"
                    >Comments
                    </h5>
                    <div>
                        <textarea
                            class="w-100 border-radius-3"
                            v-model="comment.body"
                        ></textarea>
                        <button
                            class="float-right mt-2"
                            :disabled="isLoading"
                            @click="SendComment">Send
                        </button>
                    </div>
                    <br style="clear: both;" >
                    <br>

                    <comment-list
                        :comments="comments"
                    ></comment-list>
                </div>
            </div>
        </div>
</template>

<script>
    import axios from 'axios';
    import CommentList from '../comment/CommentList'

    export default {
        name: 'PostShow',
        components:{
          CommentList,
        },
        data (){
            return{
                post: {},
                comments : [],
                comment: {
                    user_id: null,
                    post_id: null,
                    body: null,
                },
                isLoading: null,
                user_id: null,
            }
        },
        props: {
            id: {
                type: String,
                default: null,
            },
        },
        computed: {
          isAuthor() {
              return this.user_id == this.post.user_id;
          },
        },
        created() {
            this.loadPost();
            this.loadPostComments();
            this.user_id = window.localStorage.getItem('auth_user');
        },
        methods: {
            loadPost(){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token');
                axios
                    .get(`/api/post/${this.id}`)
                    .then(({data})=>{
                        this.post = data;
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
            },
            editPost(){
                this.$router.push({ name: 'post.edit', params: {
                    title:  this.post.title,
                    body:   this.post.body
                }})
            },
            deletePost(){
                this.isLoading = true;
                axios
                    .delete(`/api/post/${this.id}`)
                    .then(({data})=>{
                        this.$toast.success({
                            title: 'Success!',
                            message: 'Post deleted.',
                        })
                        this.$router.go(-1);
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

            loadPostComments(){
                axios
                    .get(`/api/comment/${this.id}`)
                    .then(({data})=>{
                        this.comments = data;
                    })
                    .catch(({response}) =>{
                        if((response.status = 422)) {
                            this.errors = response.data;
                            console.log(this.errors);

                            this.$toast.error({
                                title: 'Error!',
                                message: this.errors.message,
                            })
                        }
                    })
            },
            SendComment(){
                this.isLoading = true;
                axios
                    .post(`/api/comment`, {
                        'user_id':  window.localStorage.getItem('auth_user'),
                        'post_id':  this.post.id,
                        'body':     this.comment.body,
                    })
                    .then(({data}) => {
                        this.$toast.success({
                            title: 'Success!',
                            message: 'Comment created.',
                        });

                        this.comments.unshift(data);
                        this.comment.body = null;
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

    .border-radius-3{
        border-radius: 3px;
    }

</style>

<template>
    <div class='col-md-9 blog-main mt-5'>
        <h3 class='form-signin-heading profile-title mb-5'>New post</h3>

        <form
            class=""
            @submit.prevent="save"
        >
            <textarea
                class="input-box"
                v-model="post.title"
                type="text"
                placeholder="Title"
                line
            >
            </textarea>
            <textarea
                class="input-box"php
                v-model="post.body"
                placeholder="Post"
                rows="8"
            >
            </textarea>

            <button
                :disabled="isLoading"
                type="submit"
                class="float-right"
            >
                <span v-if="isUpdate">Edit</span>
                <span v-else>Save</span>
            </button>

            <button
                :disabled="isLoading"
                class="float-right mr-2"
                @click="$router.go(-1)"
            >
                <span class="">Cancel</span>
            </button>
        </form>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'PostCreateUpdate',
        data (){
            return{
                post: {
                  title: null,
                  body: null,
                },
                isLoading: false,
                errors: {},
            }
        },
        props: {
            id: {
                type: String,
                default: null,
            },
            title: {
                type: String,
                default: null,
            },
            body: {
                type: String,
                default: null,
            }
        },
        computed: {
            hasPost() {
                return !!this.post;
            },
            isUpdate(){
              return this.id !== null && this.id !== undefined;
            }
        },
        created() {
            if(this.hasPost)
            {
                this.post.title = this.title;
                this.post.body = this.body
            }

        },

        methods: {
            save(){
                if(!this.isUpdate) {
                  this.createPost();
                }
                else{
                  this.updatePost();
                }
            },
            createPost(){
                this.isLoading = true;
                axios
                    .post(`/api/post`, {
                      'title':  this.post.title,
                      'body':   this.post.body,
                      'user_id': 1,
                    })
                    .then(({data}) => {
                      this.$toast.success({
                        title: 'Success!',
                        message: 'Post created.',
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
            updatePost(){
                axios
                    .put(`/api/post/${this.id}`,{
                        title: this.post.title,
                        body: this.post.body
                    })
                    .then(({data}) => {
                        this.$toast.success({
                            title: 'Success!',
                            message: 'Post changed.',
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
            }
        },
    }
</script>

<style>
    .form-signin-heading{
        text-align: center;
    }

    .profile-title {
        margin-left: -1em;
        font-size: 1.5rem;
        text-align: center;
    }

    .input-box{
        width:100%;
        text-align: center;
        border: 1px solid lightgrey;
        margin-bottom: 2em;
    }

</style>

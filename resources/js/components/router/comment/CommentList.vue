<template>
    <div>
        <div v-for="comment in comments" >
            <comment
                :comment="comment"
                :isLoading="isLoading"
                @update="updateComment"
                @delete="deleteComment"
            ></comment>
        </div>
    </div>
</template>

<script>
    import Comment from "./Comment";

    export default {
        name: 'CommentList',

        components: {
            Comment
        },
        data () {
            return {
                isLoading: null,
            }
        },
        props:{
            comments: {
                type: Array,
                default: null,
            },
        },
        created() {

        },
        methods: {
            updateComment(comment){
                this.isLoading = true;

                axios
                    .put(`/api/comment/${comment.id}`, {
                        'body': comment.body
                    })
                    .then((data)=>{
                        this.editing = false;

                        this.$toast.success({
                            title: 'Success!',
                            message: 'Comment updated.',
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
            deleteComment(id){
                this.isLoading = true;
                axios
                    .delete(`/api/comment/${id}`)
                    .then(({data})=>{
                        this.$toast.success({
                            title: 'Success!',
                            message: 'Comment deleted.',
                        })

                        let index = this.comments.findIndex(function(comment) {
                            return comment.id === id;
                        });

                        if (index === -1) return

                        this.comments.splice(index, 1);

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
        },
    }
</script>

<style>
    input{
        paddig: 0px;
    }
</style>


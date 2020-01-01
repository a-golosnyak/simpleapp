<template>
    <div class="blog-header">
        <div class="container">
            <h2 class="blog-title">
                <!--a class='none-decored' href="/">The Blog</a-->
            </h2>
            <!--p class="lead blog-description">Блог для людей, интерисующихся электроникой.</p-->
        </div>
    </div>
</template>

<script>

</script>


<style>
    .blog-header {
        padding-top: 1.5rem;
        padding-bottom: 1rem;
        border: 1px solid grey;
        background: linear-gradient(rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.8)), no-repeat;
        background-position: 50% 10%;
    }



    .blog-title {
        margin-bottom: 0;
        font-size: 3rem;
        font-weight: normal;
        color: #404040;
    }

    .blog-description {
        font-size: 1.1rem;
        color: #999;
    }

    .none-decored{
        color: inherit;
        text-decoration: none;
    }

    a:focus, a:hover {
        color: inherit;
        text-decoration: none;
    }

</style>


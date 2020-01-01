<template>
    <div>
        <header-image
            :image-url = "images[1]"
            @open-modal="event => openModal()"
        >
        </header-image>
        
        <div class="container" style="background-color: lightgrey;">
            <div class="row justify-content-center">
                <div class="col-md-9">
                
                    <button 
                        @click="openModal">Применить
                    </button>  
                    
                    <modal-window
                        ref='imagemodal'
                    >
                        <image-carousel></image-carousel>
                    </modal-window>
                </div>
                <h3>{{this.counter}}</h3>
                <hr>
                <div class="about">
                    <h3>About this listing</h3>
                    <expandable-text>aAaaaaaaaAa</expandable-text>
                </div>
            </div>       
        </div>
    </div>
</template>

<script>
import CarouselControl from './CarouselControl.vue'
import HeaderImage from './HeaderImage.vue'
import ExpandableText from './ExpandableText'

    export default {
        components:{
            HeaderImage,
            ExpandableText
        },
        data () {
            return {
                counter : 0,
                images: [
                    '/images/2/Image_1.jpg',
                    '/images/2/Image_2.jpg',
                    '/images/2/Image_3.jpg',
                    '/images/2/Image_4.jpg'
                ]
            }
        },
        computed:{

        },
        methods: {
            openModal(){
                this.$refs.imagemodal.modalOpen = true;
            }    
        },
    }
</script>
 
<style>

</style>


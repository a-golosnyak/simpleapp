<template>
    <div class='row'>
        <canvas
            class="border"
            ref="device"
            @click="click"
        ></canvas>
        <div  class='col-md-9  mt-5'>
           Screen
        </div>
        <hr>
        <label>
            X1<input type="number" size="4" id="x1" v-model="coords.x1" />
            dX1<input type="number" size="4" id="x2" v-model="coords.deltaX1" />
        </label>
        <label>
            Y1<input type="number" size="4" id="y1" v-model="coords.y1" />
            dY1<input type="number" size="4" id="y2" v-model="coords.deltaY1" />
        </label>
        <label>Z1 <input type="number" size="4" id="z1" v-model="coords.z1" /></label>
    </div>
</template>
<script>
import axios from 'axios';
import * as THREE  from 'three';

import { Scene,
    /*PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    RingGeometry,
    TorusGeometry,
    CylinderGeometry,
    OctahedronGeometry,
    MeshBasicMaterial,
    Mesh,*/
} from 'three';

export default {
    name: 'ThreeLab',
    data() {
        return {
            cube: {},
            scene: {},
            camera: {},
            renderer: {},
            light: {},
            directionalLight: {},
            geometry: {},
            material: {},
            circle: {},
            canvas: null,

            coords: {
              x1: 0,
              y1: 0,
              z1: 5,
              deltaX1: 0,
              deltaY1: 0,
              deltaZ1: 0,
            },

            clicked: false,
        }
    },
    mounted() {
        this.initThree();
        setInterval(()=>{
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
        }, 50);
    },
    computed: {
    },
    methods: {
      click(){
            //this.xChanged();
            console.log('Canvas click');
            console.log(this.canvas);
            this.light.position.set(this.coords.x1, this.coords.y1, this.coords.z1);
        },

        initThree(){
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.5, 1000 );

            this.renderer = new THREE.WebGLRenderer( {alpha: true} );
            this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
            this.renderer.setClearColor(0xeeeeee, 1);
            this.renderer.domElement.id = 'area';
            document.body.appendChild( this.renderer.domElement );

            let geometry = new THREE.TorusGeometry();
            let material = new THREE.MeshBasicMaterial( { color: 0x60CC60 } );

            this.cube = new THREE.Mesh( geometry, material );
            this.cube.rotation.x = 0.5;
            geometry = new THREE.CircleBufferGeometry( 15, 32 );
             material = new THREE.MeshBasicMaterial( { color: 0x606060 } );
            this.circle = new THREE.Mesh( geometry, material );
            this.scene.add( this.cube );

            this.light = new THREE.PointLight( 0xff0000, 0.5, 100 );
            this.light.position.set( 50, 50, 50 );
            this.scene.add( this.light );

            this.camera.position.z = this.coords.z1;
            this.renderer.render(this.scene, this.camera);
          // this.canvas = this.$refs.device;
            this.canvas  = document.getElementById('area');

            this.canvas.addEventListener('mousewheel', (event) =>{
                this.coords.z1 += event.deltaY/100;
            });

            this.canvas.addEventListener('mousedown', (event) =>{
                this.clicked = true;

                this.coords.x1 = event.pageX;
                this.coords.y1 = event.pageY;

                this.coords.deltaX1 = this.cube.rotation.x;         //***
                this.coords.deltaY1 = this.cube.rotation.y;
            });
            this.canvas.addEventListener('mouseup', (event) =>{
                this.clicked = false;
            });
            this.canvas.addEventListener('mousemove', (event) =>{
              if(this.clicked === true) {

                this.coords.deltaX1 = event.pageY - this.coords.y1; // - this.canvas.offsetLeft
                this.coords.deltaY1 = event.pageX - this.coords.x1; // - this.canvas.offsetTop
              }
            });
        },

        animate() {
            this.cube.rotation.x = this.coords.deltaX1/100;
            this.cube.rotation.y = this.coords.deltaY1/100;
            this.camera.position.z = this.coords.z1;
            this.renderer.render(this.scene, this.camera);
            //requestAnimationFrame(this.animate);
        },
    },
}
</script>

<style>

</style>

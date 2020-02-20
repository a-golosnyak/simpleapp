<template>
    <div class='row'>
        <h3>Three 2</h3>
        <!--canvas
            class="border"
            ref="device"
            @click="click"
        ></canvas-->
        <div  class='col-md-9 blog-main mt-5'>
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
import * as dat from 'dat.gui';

// import DatGui from 'dat.gui';
// import DatGui from '@cyrilf/vue-dat-gui';

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
              positionX: 0,
              positionY: 0,
              positionZ: 0,
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              deltaX1: 0,
              deltaY1: 0,
              deltaZ1: 0,
            },

            clicked: false,
            line: {},
            gui: {},
        }
    },
    mounted() {
        this.initTree3();

        this.animate();

/*        setInterval(()=>{
            this.renderer.render(this.scene, this.camera);
        }, 50);*/
    },
    computed: {
    },
    methods: {

      initTree3(){
        this.gui = new dat.GUI();
        this.gui.add(this.coords, 'positionX').min(-5).max(5).step(0.1);
        this.gui.add(this.coords, 'positionY').min(-5).max(5).step(0.1);
        this.gui.add(this.coords, 'positionZ').min(-5).max(5).step(0.1);
        this.gui.add(this.coords, 'rotationX').min(-0.2).max(0.2).step(0.001);
        this.gui.add(this.coords, 'rotationY').min(-0.2).max(0.2).step(0.001);
        this.gui.add(this.coords, 'rotationZ').min(-0.2).max(0.2).step(0.001);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
        this.renderer.setClearColor(0xeeeeee, 1);
        this.renderer.domElement.id = 'area';
        document.body.appendChild( this.renderer.domElement )

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
        this.camera.position.set( 0, 0, 1000 );

        this.light = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add(this.light);

        this.geometry = new THREE.SphereGeometry(200, 20, 20);
        this.material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors})

        for(var i=0; i<this.geometry.faces.length; i++){
          this.geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.scene.add(this.mesh);

        this.renderer.render(this.scene, this.camera);
      },


      initTree2(){
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
            this.renderer.setClearColor(0xeeeeee, 1);
            this.renderer.domElement.id = 'area';
            document.body.appendChild( this.renderer.domElement )

            this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
            this.camera.position.set( 0, 0, 100 );
            this.camera.lookAt( 0, 0, 0 );

            this.scene = new THREE.Scene();
            this.material = new THREE.LineBasicMaterial( { color: 0x606060 } );

            var points = [];
            points.push( new THREE.Vector3( - 0, 0, 0 ) );
            points.push( new THREE.Vector3( 0, 10, 0 ) );
            points.push( new THREE.Vector3( 10, 0, 0 ) );

            this.geometry = new THREE.BufferGeometry().setFromPoints( points );

            points.push( new THREE.Vector3( - 20, 20, 20 ) );
            points.push( new THREE.Vector3( 20, 10, 20 ) );
            points.push( new THREE.Vector3( 10, 20, 20 ) );

            this.geometry = new THREE.BufferGeometry().setFromPoints( points );
            this.line = new THREE.Line( this.geometry, this.material )

            this.scene.add( this.line );
            this.renderer.render( this.scene, this.camera );

            this.canvas  = document.getElementById('area');
            this.canvas.addEventListener('mousedown', (event) =>{
                this.clicked = true;
                this.coords.x1 = event.pageX;
                this.coords.y1 = event.pageY;
            });
            this.canvas.addEventListener('mouseup', (event) =>{
                this.clicked = false;
            });
        },

        click(){
            console.log('Canvas click');
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
            //this.cube.rotation.x = this.coords.deltaX1/100;
            this.mesh.position.x += this.coords.positionX;
            this.mesh.position.y += this.coords.positionY;
            this.mesh.position.z += this.coords.positionZ;
            this.mesh.rotation.x += this.coords.rotationX;
            this.mesh.rotation.y += this.coords.rotationY;
            this.mesh.rotation.z += this.coords.rotationZ;
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
        },
    },
}
</script>

<style>

</style>

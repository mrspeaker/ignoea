(function () {

	"use strict";

	var main = {
		init: function (cb) {
			this.gl = gl; // TODO: nope.
			gl.init();
			this.cb = cb;
		},
		run: function () {
			var self = this;
			this.update();
			this.render();
			requestAnimationFrame(function () {
				self.run();
			}); 
		},
		update: function () {
			this.cb();
		},
		render: function () {
			gl.render();
		}
	};

	var gl = {
		init: function () {
			var scene = new THREE.Scene(),
				camera = new THREE.PerspectiveCamera(
					75, 
					window.innerWidth / window.innerHeight, 
					1, 
					10000),
				renderer = new THREE.WebGLRenderer(); 
			camera.position.z = 5;
			camera.position.y = 2;
			//camera.rotation
			renderer.setSize(window.innerWidth, window.innerHeight); 

			document.body.appendChild(renderer.domElement);

			this.scene = scene;
			this.camera = camera;
			this.renderer = renderer;
		},

		makeCube: function () {

			var geometry = new THREE.BoxGeometry(1,1,1),
				material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }),
				cube = new THREE.Mesh(geometry, material);

			return cube;

		},

		makeGround: function () {
			var ground = new THREE.Mesh(
				new THREE.PlaneGeometry(50, 50),
				new THREE.MeshPhongMaterial({ color: 0x00ff00 })
			);
			
			ground.rotation.x = -Math.PI / 2;
			ground.position.y = 0;
			ground.position.z = -15;
			return ground;
		},

		render: function () {
			this.renderer.render(this.scene, this.camera); 
		}

	};

	window.main = main;

}());
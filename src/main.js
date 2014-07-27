(function () {

	"use strict";

	var main = {
		init: function (cb) {
			var self = this;
			this.gl = gl.init(); // TODO: nope.
			this.cb = cb;
			
			var manager = this.manager = new THREE.LoadingManager();
			this.loaders = {
				image: new THREE.ImageLoader(manager),
				collada: new THREE.ColladaLoader(manager),
				json: new THREE.JSONLoader(manager),
				object: new THREE.OBJLoader(manager)
			};
			manager.onProgress = function (item, loaded, total) {
				console.log(item, loaded, total);
			};
			manager.onLoad = function () {
				self.run();
			};
			manager.onError = function () {
				console.log("error loading", arguments);
			};
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
			camera.position.y = 4;
			//camera.rotation
			renderer.setSize(window.innerWidth, window.innerHeight); 

			document.body.appendChild(renderer.domElement);

			this.scene = scene;
			this.camera = camera;
			this.renderer = renderer;

			this.addLights();

			this.raycaster = new THREE.Raycaster();

			return this;
		},

		addLights: function () {
			var ambient = new THREE.AmbientLight( 0x666666 );
			var directionalLight = new THREE.DirectionalLight( 0x666666 );
			directionalLight.position.set(0, 1000, 500);
			
			this.scene.add(ambient);
			this.scene.add(directionalLight);
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
		},

		getIntercectPoint: function (obj, mesh) {
			if (!mesh) return;

			// Cast downwards
			this.raycaster.set(obj.position, new THREE.Vector3(0, -1, 0));
			var intersects = this.raycaster.intersectObject(mesh);
			if (!intersects.length) {
				obj.translateY(0.1);
				return;
			}
			//obj.position.set(0, 1, 0);
			//obj.lookAt(intersects[0].face.normal);
			obj.position.copy(intersects[0].point);
			obj.translateY(0.01); // Move up a tiny bit
			
		}

	};

	window.main = main;

}());
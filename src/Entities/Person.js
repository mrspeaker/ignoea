(function () {

	var loadingPromise = null;
	
	var Person = function () {
		this.pos = null;
		this.rot = null;
		this.target = null;

		this.mesh = null;

		this.speed = 0.12;
	};

	Person.prototype = {
		
		init: function (scene, pos) {
			this.pos = new THREE.Vector3(pos[0], pos[1], pos[2]);
			this.rot = new THREE.Euler();
			this.target = null;

			this.loadMesh(function (obj) {
				scene.add(obj)
			});

			return this;
		},

		loadMesh: function (cb) {

			var self = this;
			console.log(19)
			if (!loadingPromise) {
				loadingPromise = new Promise(function (resolve, reject) {
					var texture = new THREE.Texture();
					main.loaders.image.load("textures/UV_Grid_Sm.jpg", function (image) {
						texture.image = image;
						texture.needsUpdate = true;
						main.loaders.object.load("obj/female02.obj", function (mesh) {
							resolve([texture, mesh]);
						});
					});
				});
			}
			loadingPromise.then(function (texAndObj) {
				var texture = texAndObj[0],
					obj3d = texAndObj[1].clone();
				var thing = true;
				obj3d.traverse(function (child) {
					if (child instanceof THREE.Mesh && thing) {
						thing = false;
						child.material.map = texture;
					}
				});
				obj3d.scale.set(0.01, 0.01, 0.01);
				obj3d.position.copy(self.pos);			
				self.mesh = obj3d;
				cb(obj3d);
			});
			console.log(20)
			
		},

		update: function () {
			if (this.target) {
				this.mesh.translateZ(this.speed);
				if (this.mesh.position.distanceToSquared(this.target) < 1) {
					this.target = null;
				}
			}
		},

		render: function () {
			// Sync the mesh to the person
		}
	};
	Person.prototype.constructor = Person;

	window.Person = Person;

}());

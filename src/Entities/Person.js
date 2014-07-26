(function () {
	
	var Person = function () {
		this.pos = null;
		this.rot = null;
		this.target = null;
		this.mesh = null;
	};

	Person.prototype = {
		
		init: function (pos) {
			this.pos = new THREE.Vector3(pos[0], pos[1], pos[2]);
			this.rot = new THREE.Euler();
			this.target = null;
			return this;
		},

		loadMesh: function (manager, texture, cb) {
			var self = this,
				objLoader = new THREE.OBJLoader(manager);

			objLoader.load("obj/male02.obj", function (mesh) {
				mesh.traverse( function (child) {
					if (child instanceof THREE.Mesh) {
						child.material.map = texture;
					}
				});
				mesh.scale.set(0.01, 0.01, 0.01);
				mesh.position.copy(self.pos);
				self.mesh = mesh;
				cb(mesh);
			});
		},

		update: function () {
			if (person.target) {
				person.mesh.translateZ(0.05);
				if (person.mesh.position.distanceToSquared(person.target) < 1) {
					person.target = null;
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

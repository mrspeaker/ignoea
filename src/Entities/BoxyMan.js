(function () {
	
	var BoxyMan = function () {
		this.pos = null;
		this.rot = null;
		this.mesh = null;
	};

	BoxyMan.prototype = {
		
		init: function (pos) {
			this.pos = new THREE.Vector3(pos[0], pos[1], pos[2]);
			this.rot = new THREE.Euler();

			this.mesh = main.gl.makeCube();
			return this;
		},

		loadMesh: function (cb) {
			var self = this;
			main.loaders.json.load('./obj/model.js', function (geometry, materials) {
				var skinnedMesh = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(materials));
				skinnedMesh.position.copy(self.pos);
				skinnedMesh.scale.set(1, 1, 1);
				cb(skinnedMesh);
			});
		},

		update: function () {
			this.mesh.rotation.y += 0.05;
		},

		render: function () {
			// Sync the mesh to the person
		}
	};
	BoxyMan.prototype.constructor = BoxyMan;

	window.BoxyMan = BoxyMan;

}());

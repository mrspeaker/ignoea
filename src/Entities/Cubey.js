(function () {
	
	var Cubey = function () {
		this.pos = null;
		this.rot = null;
		this.mesh = null;
	};

	Cubey.prototype = {
		
		init: function (pos) {
			this.pos = new THREE.Vector3(pos[0], pos[1], pos[2]);
			this.rot = new THREE.Euler();

			this.mesh = main.gl.makeCube();
			return this;
		},

		update: function () {
			this.mesh.rotation.y += 0.05;
		},

		render: function () {
			// Sync the mesh to the person
		}
	};
	Person.prototype.constructor = Cubey;

	window.Cubey = Cubey;

}());

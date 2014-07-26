(function () {
	
	var Person = function () {
		this.pos = new THREE.Vector3();
		this.target = new THREE.Vector3();
		this.mesh = null;
	};

	Person.prototype = {
		init: function () {

		}
	};
	Person.prototype.constructor = Person;

	window.Person = Person;

}());

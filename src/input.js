(function (TrackballControls) {

	function Input () {};
	Input.prototype = {
		init: function (camera) {
			var c = this.controls = new TrackballControls(camera);
			c.panSpeed = 3.8;
			c.noRoll = true;
			c.noRotate = true;
			c.staticMoving = true;
			return this;
		},

		update: function () {
			this.controls.update();
		}
	};
	Input.prototype.constructor = Input;

	window.Input = Input;

}(THREE.TrackballControls));
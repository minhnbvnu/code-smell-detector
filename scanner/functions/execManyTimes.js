function execManyTimes(each, complete) {
	let index = 0;
	let repeated, id;

	function start() {
		id = setInterval(function () {
			each();
			if (++index === 50) {
				clearInterval(id);
				complete(
					repeated
						? null
						: function () {
								index = 0;
								repeated = true;
								setTimeout(start, pause);
						  }
				);
			}
		}, 20);
	}

	setTimeout(start, pause);
}
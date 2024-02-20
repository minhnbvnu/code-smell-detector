function goStartMonth() {
	  var next = this.state.value.clone();
	  next.startOf('month');
	  this.setValue(next);
	}
function goTime(direction, unit) {
	  var next = this.state.value.clone();
	  next.add(direction, unit);
	  this.setValue(next);
	}
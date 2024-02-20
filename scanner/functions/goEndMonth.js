function goEndMonth() {
	  var next = this.state.value.clone();
	  next.endOf('month');
	  this.setValue(next);
	}
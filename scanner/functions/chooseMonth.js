function chooseMonth(month) {
	  var next = this.state.value.clone();
	  next.month(month);
	  this.setAndSelectValue(next);
	}
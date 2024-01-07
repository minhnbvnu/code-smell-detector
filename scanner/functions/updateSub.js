function updateSub(x, decrement) {
	  return x.write(sub(x.read(), decrement));
	}
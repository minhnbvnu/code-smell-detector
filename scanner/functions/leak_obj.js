function leak_obj(obj) {
		objs[1].prop_0 = obj;
		return [arr[objs_1_off+4], arr[objs_1_off+5]];
	}
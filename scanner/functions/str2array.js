function str2array(s){
		if(typeof s == "string" || s instanceof String){
			if(s && !spaces.test(s)){
				a1[0] = s;
				return a1;
			}
			var a = s.split(spaces);
			if(a.length && !a[0]){
				a.shift();
			}
			if(a.length && !a[a.length - 1]){
				a.pop();
			}
			return a;
		}
		// assumed to be an array
		if(!s){
			return [];
		}
		return array.filter(s, function(x){ return x; });
	}
function addListen(obj, i){
			if(!obj) return obj;
			if(i = obj.length)while(i--)obj[i].addEventListener = addEvent;
			else obj.addEventListener = addEvent;
			return obj;
		}
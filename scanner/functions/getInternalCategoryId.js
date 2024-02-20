function getInternalCategoryId(catId){
	catId=catId.toLowerCase().replace(/s$/, '');
	if(catId==='device')
		return 'SpecialParts';
	else if(catId==='key')
		return 'KeyItem';
	
	
	
	//else: weapon,bow,arrow,armor,material,food
	return (catId.charAt(0).toUpperCase() + catId.substr(1)).replace(/s$/, '')
}
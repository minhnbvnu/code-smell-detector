function Armor(itemData, overrideId){
	this.category='armors';

	this.id=overrideId || itemData.id;
	this.dyeColor=Variable.enumToInt(itemData.dyeColor);
}
function Equipment(catId, itemData, overrideId){ //Weapon, Bow or Shield
	this.category=catId;

	this.id=overrideId || itemData.id;
	this.durability=itemData.durability || 70;
	this.modifier=Variable.enumToInt(itemData.modifier);
	this.modifierValue=itemData.modifierValue || 0;
	if(this.isFusable()){
		this.fuseId=itemData.fuseId || '';
		this.fuseDurability=itemData.fuseDurability || 0;
		this.extraDurability=itemData.extraDurability || 0;
		this.recordExtraDurability=itemData.recordExtraDurability || 0;
	}
}
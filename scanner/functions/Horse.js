function Horse(itemData, overrideId){
	this.category='horses';

	this.id=itemData.id;
	this.name=itemData.name;
	this.mane=typeof itemData.mane==='string'? hash(itemData.mane): itemData.mane;
	this.saddles=typeof itemData.saddles==='string'? hash(itemData.saddles): itemData.saddles;
	this.reins=typeof itemData.reins==='string'? hash(itemData.reins): itemData.reins;
	this.bond=itemData.bond;
	this.bondChecked=itemData.bondChecked;
	this.statsStrength=itemData.statsStrength;
	this.statsSpeed=itemData.statsSpeed;
	this.statsStamina=itemData.statsStamina;
	this.statsPull=itemData.statsPull;
	this.horseType=itemData.horseType;
	this.colorType=itemData.colorType;
	this.footType=itemData.footType;
	this.amiiboUidHash=typeof itemData.amiiboUidHash==='string'? BigInt(itemData.amiiboUidHash) : itemData.amiiboUidHash;
	this.roomId=itemData.roomId;

	this.iconPattern=itemData.iconPattern;
	this.iconEyeColor=itemData.iconEyeColor;
	this.iconPrimaryColorRed=itemData.iconPrimaryColorRed;
	this.iconPrimaryColorGreen=itemData.iconPrimaryColorGreen;
	this.iconPrimaryColorBlue=itemData.iconPrimaryColorBlue;
	this.iconSecondaryColorRed=itemData.iconSecondaryColorRed;
	this.iconSecondaryColorGreen=itemData.iconSecondaryColorGreen;
	this.iconSecondaryColorBlue=itemData.iconSecondaryColorBlue;
	this.iconNoseColorRed=itemData.iconNoseColorRed;
	this.iconNoseColorGreen=itemData.iconNoseColorGreen;
	this.iconNoseColorBlue=itemData.iconNoseColorBlue;
	this.iconHairPrimaryColorRed=itemData.iconHairPrimaryColorRed;
	this.iconHairPrimaryColorGreen=itemData.iconHairPrimaryColorGreen;
	this.iconHairPrimaryColorBlue=itemData.iconHairPrimaryColorBlue;
	this.iconHairSecondaryColorRed=itemData.iconHairSecondaryColorRed;
	this.iconHairSecondaryColorGreen=itemData.iconHairSecondaryColorGreen;
	this.iconHairSecondaryColorBlue=itemData.iconHairSecondaryColorBlue;
	
	if(this.horseType===6 || this.horseType===11 || this.horseType>13)
		console.warn('unknown horse horseType value: '+this.horseType);
}
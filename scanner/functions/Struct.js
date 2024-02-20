function Struct(structId, variablesInfo, structArray){
	this._structId=structId;
	this._originalStructData=variablesInfo;
	this.variables=[];

	for(var i=0; i<variablesInfo.length; i++){
		if(typeof variablesInfo[i].structArray==='string' && typeof variablesInfo[i].variablesInfo==='object'){
			this.variables.push(new Struct(variablesInfo[i].structArray, variablesInfo[i].variablesInfo, true));
		}else{
			var variable=new Variable(variablesInfo[i].hash, variablesInfo[i].type, variablesInfo[i].enumValues);
			if(structArray && !variable.isArray()){
				throw new Error('Struct array variable['+i+'] is not an Array');
			}
			if(variablesInfo[i].label)
				variable.setLabel(variablesInfo[i].label);
			this.variables.push(variable);
		}
	}
}
function checkDuplicatedID(proposedID){
		var baseID = proposedID, i = 1;
		
		while($('#' + proposedID).length > 0){
			proposedID = baseID + '_' + ( ++i ).toString();
		}
		
		return proposedID;
	}
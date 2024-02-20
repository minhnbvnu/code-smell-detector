function convertDate(value){
			var newDatetime;
			
			if(DT.isDateTime(value)){
				newDatetime = value;
			}else if(inputFormat === "iso"){
				newDatetime = DT.fromISO(String(value));
			}else {
				newDatetime = DT.fromFormat(String(value), inputFormat);
			}
			
			return newDatetime.toFormat("yyyy-MM-dd");
		}
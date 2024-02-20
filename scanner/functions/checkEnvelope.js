function checkEnvelope(envelope,type){
			var isValid = true;
			if (envelope.points && envelope.points[0]){
				if (envelope.points[0][0] === 0){
					var c = 0;
					for (var i=1;i<envelope.count;i++){
						var point = envelope.points[i];
						if (point && point[0]>c){
							c = point[0];
						}else{
							isValid=false;
						}
					}
				}else{
					isValid = false;
				}
			}else{
				isValid = false;
			}
			
			if (isValid){
				return envelope;
			}else{
				console.warn("Invalid envelope, resetting to default");
				return type === "volume" 
					? {raw: [], enabled: false, points: [[0,48],[10,64],[20,40],[30,18],[40,28],[50,18]], count:6}
					: {raw: [], enabled: false, points: [[0,32],[20,40],[40,24],[60,32],[80,32]], count:5};
			}
		}
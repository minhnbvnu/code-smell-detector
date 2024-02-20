function subtractArray (arr1, arr2) {
				for (var i=0, src1; (src1=arr1[i]); i++) {
					var found = false;
					for (var j=0, src2; (src2=arr2[j]); j++) {
						if (src2 === src1) {
							found = true;
							arr2.splice(j, 1);
							break;
						}
					}
					if (found) {
						arr1.splice(i--, 1);
					}
				}
				return arr1;
			}
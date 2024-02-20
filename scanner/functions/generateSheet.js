function generateSheet(){
			var rows = [],
			merges = [],
			worksheet = {},
			range = {s: {c:0, r:0}, e: {c:(list[0] ? list[0].columns.reduce((a, b) => a + (b && b.width ? b.width : 1), 0) : 0), r:list.length }};

			//parse row list
			list.forEach((row, i) => {
				var rowData = [];

				row.columns.forEach(function(col, j){

					if(col){
						rowData.push(!(col.value instanceof Date) && typeof col.value === "object" ? JSON.stringify(col.value) : col.value);

						if(col.width > 1 || col.height > -1){
							if(col.height > 1 || col.width > 1){
								merges.push({s:{r:i,c:j},e:{r:i + col.height - 1,c:j + col.width - 1}});
							}
						}
					}else {
						rowData.push("");
					}
				});

				rows.push(rowData);
			});

			//convert rows to worksheet
			XLSX.utils.sheet_add_aoa(worksheet, rows);

			worksheet['!ref'] = XLSX.utils.encode_range(range);

			if(merges.length){
				worksheet["!merges"] = merges;
			}

			return worksheet;
		}
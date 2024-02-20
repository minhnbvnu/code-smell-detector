function fillSymbols(index){
			var symbol = mask[index];
			if(typeof symbol !== "undefined" && symbol !== maskWildcard && symbol !== maskLetter && symbol !== maskNumber){
				el.value = el.value + "" + symbol;
				fillSymbols(index+1);
			}
		}
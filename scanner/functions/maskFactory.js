function maskFactory(decimals) {
				var decimalsPattern = decimals > 0 ? decimalDelimiter + new Array(decimals + 1).join('0') : '';
				var maskPattern =  '#' + thousandsDelimiter + '##0' + decimalsPattern;
				if (angular.isDefined(attrs.uiCurrencyAfter)) {
					maskPattern += symbolSeparation;
				} else {
					maskPattern =  symbolSeparation + maskPattern;
				}
				return new StringMask(maskPattern, {reverse: true});
			}
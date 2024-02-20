function getExpectedViewValue(viewValue, i, viewValue2) {
				var values = viewValue.split('');
				if (i > viewValue.replace(/[^P0-9]/ig,'').length && viewValue2) {
					values = viewValue2.split('');
				}
				var expected = '';
				var count = 0;
				while (count < i && values.length > 0) {
					var c = values.splice(0,1);
					expected += c;
					count += /[P0-9]/i.test(c);
				}
				return expected;
			}
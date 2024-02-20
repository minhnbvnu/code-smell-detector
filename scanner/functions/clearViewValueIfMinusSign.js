function clearViewValueIfMinusSign() {
				if (ctrl.$viewValue === '-') {
					ctrl.$setViewValue('');
					ctrl.$render();
				}
			}
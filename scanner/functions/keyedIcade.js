function keyedIcade(code, isDown) {

		var icadeCodes = [87, 69, 88, 90, 68, 67, 65, 81, 89, 84],
			KEYS = input.KEYS;

		if (icadeCodes.indexOf(code) > -1) {

			if (!isDown) {
				// Don't handle key up with iCade!
				return;
			}

			switch (code) {
			case 87:
				// Up
				code = KEYS.up;
				isDown = true;
				break;
			case 69:
				code = KEYS.up;
				isDown = false;
				break;
				// Down
			case 88:
				code = KEYS.down;
				isDown = true;
				break;
			case 90:
				code = KEYS.down;
				isDown = false;
				break;
				// Right
			case 68:
				code = KEYS.right;
				isDown = true;
				break;
			case 67:
				code = KEYS.right;
				isDown = false;
				break;
				// Left
			case 65:
				code = KEYS.left;
				isDown = true;
				break;
			case 81:
				code = KEYS.left;
				isDown = false;
				break;

			// Fire
			case 89:
				code = KEYS.space;
				isDown = true;
				break;
			case 84:
				code = KEYS.space;
				isDown = false;
				break;
			}
		}

		keyed(code, isDown);

	}
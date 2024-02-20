function capability(cap, opt) {
	var self = {
		capabilitySetType : new type.UInt16Le(function() {
			return self.capability.obj.__TYPE__;
		}),
		lengthCapability : new type.UInt16Le(function() {
			return new type.Component(self).size();
		}),
		capability : cap || new type.Factory(function(s) {
			switch(self.capabilitySetType.value) {
			case CapsType.CAPSTYPE_GENERAL:
				self.capability = generalCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_BITMAP:
				self.capability = bitmapCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_ORDER:
				self.capability = orderCapability(null, {readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_BITMAPCACHE:
				self.capability = bitmapCacheCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_POINTER:
				self.capability = pointerCapability(false, {readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_INPUT:
				self.capability = inputCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_BRUSH:
				self.capability = brushCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_GLYPHCACHE:
				self.capability = glyphCapability(null, {readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_OFFSCREENCACHE:
				self.capability = offscreenBitmapCacheCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_VIRTUALCHANNEL:
				self.capability = virtualChannelCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_SOUND:
				self.capability = soundCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_CONTROL:
				self.capability = controlCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_ACTIVATION:
				self.capability = windowActivationCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_FONT:
				self.capability = fontCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_COLORCACHE:
				self.capability = colorCacheCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSTYPE_SHARE:
				self.capability = shareCapability({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			case CapsType.CAPSETTYPE_MULTIFRAGMENTUPDATE:
				self.capability = multiFragmentUpdate({readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
				break;
			default:
				log.debug('unknown capability ' + self.capabilitySetType.value);
				self.capability = new type.BinaryString(null, {readLength : new type.CallableValue(function() {
					return self.lengthCapability.value - 4;
				})}).read(s);
			}
		})
	};
	
	return new type.Component(self, opt);
}
function certificate() {
	var self = {
		dwVersion : new type.UInt32Le(function() {
			return self.certData.__TYPE__;
		}),
		certData : new type.Factory(function(s) {
			switch(self.dwVersion.value & 0x7fffffff) {
			case CertificateType.CERT_CHAIN_VERSION_1:
				log.debug('read proprietary certificate');
				self.certData = proprietaryCertificate().read(s);
				break;
			case CertificateType.CERT_CHAIN_VERSION_2:
				log.debug('read x.509 certificate chain');
				self.certData = x509CertificateChain().read(s);
				break;
			default:
				log.error('unknown cert type ' + self.dwVersion.value & 0x7fffffff);
			}
		})
	};
	
	return new type.Component(self);
}
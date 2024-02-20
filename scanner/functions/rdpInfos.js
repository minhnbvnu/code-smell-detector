function rdpInfos(extendedInfoConditional) {
	var self = {
		codePage : new type.UInt32Le(),
        flag : new type.UInt32Le(InfoFlag.INFO_MOUSE | InfoFlag.INFO_UNICODE | InfoFlag.INFO_LOGONNOTIFY | InfoFlag.INFO_LOGONERRORS | InfoFlag.INFO_DISABLECTRLALTDEL | InfoFlag.INFO_ENABLEWINDOWSKEY),
        cbDomain : new type.UInt16Le(function() {
        	return self.domain.size() - 2;
        }),
        cbUserName : new type.UInt16Le(function() {
        	return self.userName.size() - 2;
        }),
        cbPassword : new type.UInt16Le(function() {
        	return self.password.size() - 2;
        }),
        cbAlternateShell : new type.UInt16Le(function() {
        	return self.alternateShell.size() - 2;
        }),
        cbWorkingDir : new type.UInt16Le(function() {
        	return self.workingDir.size() - 2;
        }),
        domain : new type.BinaryString(new Buffer('\x00', 'ucs2'),{ readLength : new type.CallableValue(function() {
        	return self.cbDomain.value + 2;
        })}),
        userName : new type.BinaryString(new Buffer('\x00', 'ucs2'), { readLength : new type.CallableValue(function() {
        	return self.cbUserName.value + 2;
        })}),
        password : new type.BinaryString(new Buffer('\x00', 'ucs2'), { readLength : new type.CallableValue(function () {
        	return self.cbPassword.value + 2;
        })}),
        alternateShell : new type.BinaryString(new Buffer('\x00', 'ucs2'), { readLength : new type.CallableValue(function() {
        	return self.cbAlternateShell.value + 2;
        })}),
        workingDir : new type.BinaryString(new Buffer('\x00', 'ucs2'), { readLength : new type.CallableValue(function() {
        	return self.cbWorkingDir.value + 2;
        })}),
        extendedInfo : rdpExtendedInfos({ conditional : extendedInfoConditional })
	};
	
	return new type.Component(self);
}
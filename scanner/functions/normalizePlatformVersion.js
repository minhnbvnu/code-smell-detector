function normalizePlatformVersion(version) {
	  if (UserAgentData.platformName === 'Windows') {
	    return version.replace(/^\s*NT/, '');
	  }

	  return version;
	}
function OverlayFS(writable, readable, deprecateMsg) {
	        if ( deprecateMsg === void 0 ) deprecateMsg = true;
	
	        LockedFS$$1.call(this, new UnlockedOverlayFS(writable, readable));
	        deprecationMessage(deprecateMsg, OverlayFS.Name, { readable: "readable file system", writable: "writable file system" });
	    }
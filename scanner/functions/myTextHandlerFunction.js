function myTextHandlerFunction(event){
	var VulcanInterface = new Vulcan();
	var installCheck = VulcanInterface.isAppInstalled( "premierepro" );
	var versionCheck = VulcanInterface.isAppInstalled( "premierepro-10.0" );
	var runningCheck = VulcanInterface.isAppRunning( "premierepro" );

	// launching other tools:
	// VulcanInterface.launchApp( "aftereffects-14.0" )

	// sending messages
	var msg = new VulcanMessage (
	    VulcanMessage.TYPE_PREFIX + "com.DVA.message.sendtext" );

	
	msg.setPayload(event);
	VulcanInterface.dispatchMessage(msg);
}
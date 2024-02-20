function startCamera() {

	cameraPopoverHandle = navigator.camera.getPicture(onSuccess, onFail,
     { destinationType: Camera.DestinationType.FILE_URI,
       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
       popoverOptions: new CameraPopoverOptions(300, 300, 200, 200, Camera.PopoverArrowDirection.ARROW_ANY)
     });

}
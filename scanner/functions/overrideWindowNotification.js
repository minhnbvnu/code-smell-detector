function overrideWindowNotification() {
	window.Notification = (notification => {
		const EmptyNotification = function (rawTitle, options) {
			const rawBody = options.body;
			const title = (typeof rawTitle === 'object' && rawTitle.props) ? rawTitle.props.content[0] : rawTitle;
			const body = rawBody.props ? rawBody.props.content[0] : rawBody;
			const icon = options.icon;
			
			const image = new Image();
			image.crossOrigin = 'anonymous';
			image.src = icon;
	
			image.addEventListener('load', () => {
				const canvas = document.createElement('canvas');
				canvas.width = image.width;
				canvas.height = image.height;
				
				const context = canvas.getContext('2d');
				context.drawImage(image, 0, 0, image.width, image.height);
	
				const imageName = icon.substring(icon.lastIndexOf('/') + 1, icon.indexOf('?'));
	
				ipcRenderer.send(
					constants.NEW_MESSAGE_NOTIFICATION, 
					{
						notifParams: {
							title,
							body: body,
							silent: options.silent,
						},
						iconDataUrl: canvas.toDataURL(),
						imageName,
					}
				);
			});
	
			return false;
		};
		
		return Object.assign(EmptyNotification, notification);
	
	})(window.Notification);
}
function getControllerParam() {
		return self.__widgetId ? {
			widgetId: self.__widgetId,
			name: self.__controllerPath
		} : self.__controllerPath;
	}
function useFakeXMLHttpRequest() {
        FakeXMLHttpRequest.restore = function restore(keepOnCreate) {
            if (sinonXhr.supportsXHR) {
                globalScope.XMLHttpRequest = sinonXhr.GlobalXMLHttpRequest;
            }

            if (sinonXhr.supportsActiveX) {
                globalScope.ActiveXObject = sinonXhr.GlobalActiveXObject;
            }

            delete FakeXMLHttpRequest.restore;

            if (keepOnCreate !== true) {
                delete FakeXMLHttpRequest.onCreate;
            }
        };
        if (sinonXhr.supportsXHR) {
            globalScope.XMLHttpRequest = FakeXMLHttpRequest;
        }

        if (sinonXhr.supportsActiveX) {
            globalScope.ActiveXObject = function ActiveXObject(objId) {
                if (
                    objId === "Microsoft.XMLHTTP" ||
                    /^Msxml2\.XMLHTTP/i.test(objId)
                ) {
                    return new FakeXMLHttpRequest();
                }

                return new sinonXhr.GlobalActiveXObject(objId);
            };
        }

        return FakeXMLHttpRequest;
    }
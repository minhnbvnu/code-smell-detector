function WebForm_DoCallback(eventTarget, eventArgument, eventCallback, context, errorCallback, useAsync) {
    var postData = __theFormPostData +
                "__CALLBACKID=" + WebForm_EncodeCallback(eventTarget) +
                "&__CALLBACKPARAM=" + WebForm_EncodeCallback(eventArgument);
    if (theForm["__EVENTVALIDATION"]) {
        postData += "&__EVENTVALIDATION=" + WebForm_EncodeCallback(theForm["__EVENTVALIDATION"].value);
    }
    var xmlRequest,e;
    try {
        xmlRequest = new XMLHttpRequest();
    }
    catch(e) {
        try {
            xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e) {
        }
    }
    var setRequestHeaderMethodExists = true;
    try {
        setRequestHeaderMethodExists = (xmlRequest && xmlRequest.setRequestHeader);
    }
    catch(e) {}
    var callback = new Object();
    callback.eventCallback = eventCallback;
    callback.context = context;
    callback.errorCallback = errorCallback;
    callback.async = useAsync;
    var callbackIndex = WebForm_FillFirstAvailableSlot(__pendingCallbacks, callback);
    if (!useAsync) {
        if (__synchronousCallBackIndex != -1) {
            __pendingCallbacks[__synchronousCallBackIndex] = null;
        }
        __synchronousCallBackIndex = callbackIndex;
    }
    if (setRequestHeaderMethodExists) {
        xmlRequest.onreadystatechange = WebForm_CallbackComplete;
        callback.xmlRequest = xmlRequest;
        // e.g. http:
        var action = theForm.action || document.location.pathname, fragmentIndex = action.indexOf('#');
        if (fragmentIndex !== -1) {
            action = action.substr(0, fragmentIndex);
        }
        if (!__nonMSDOMBrowser) {
            var queryIndex = action.indexOf('?');
            if (queryIndex !== -1) {
                var path = action.substr(0, queryIndex);
                if (path.indexOf("%") === -1) {
                    action = encodeURI(path) + action.substr(queryIndex);
                }
            }
            else if (action.indexOf("%") === -1) {
                action = encodeURI(action);
            }
        }
        xmlRequest.open("POST", action, true);
        xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=utf-8");
        xmlRequest.send(postData);
        return;
    }
    callback.xmlRequest = new Object();
    var callbackFrameID = "__CALLBACKFRAME" + callbackIndex;
    var xmlRequestFrame = document.frames[callbackFrameID];
    if (!xmlRequestFrame) {
        xmlRequestFrame = document.createElement("IFRAME");
        xmlRequestFrame.width = "1";
        xmlRequestFrame.height = "1";
        xmlRequestFrame.frameBorder = "0";
        xmlRequestFrame.id = callbackFrameID;
        xmlRequestFrame.name = callbackFrameID;
        xmlRequestFrame.style.position = "absolute";
        xmlRequestFrame.style.top = "-100px"
        xmlRequestFrame.style.left = "-100px";
        try {
            if (callBackFrameUrl) {
                xmlRequestFrame.src = callBackFrameUrl;
            }
        }
        catch(e) {}
        document.body.appendChild(xmlRequestFrame);
    }
    var interval = window.setInterval(function() {
        xmlRequestFrame = document.frames[callbackFrameID];
        if (xmlRequestFrame && xmlRequestFrame.document) {
            window.clearInterval(interval);
            xmlRequestFrame.document.write("");
            xmlRequestFrame.document.close();
            xmlRequestFrame.document.write('<html><body><form method="post"><input type="hidden" name="__CALLBACKLOADSCRIPT" value="t"></form></body></html>');
            xmlRequestFrame.document.close();
            xmlRequestFrame.document.forms[0].action = theForm.action;
            var count = __theFormPostCollection.length;
            var element;
            for (var i = 0; i < count; i++) {
                element = __theFormPostCollection[i];
                if (element) {
                    var fieldElement = xmlRequestFrame.document.createElement("INPUT");
                    fieldElement.type = "hidden";
                    fieldElement.name = element.name;
                    fieldElement.value = element.value;
                    xmlRequestFrame.document.forms[0].appendChild(fieldElement);
                }
            }
            var callbackIdFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackIdFieldElement.type = "hidden";
            callbackIdFieldElement.name = "__CALLBACKID";
            callbackIdFieldElement.value = eventTarget;
            xmlRequestFrame.document.forms[0].appendChild(callbackIdFieldElement);
            var callbackParamFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackParamFieldElement.type = "hidden";
            callbackParamFieldElement.name = "__CALLBACKPARAM";
            callbackParamFieldElement.value = eventArgument;
            xmlRequestFrame.document.forms[0].appendChild(callbackParamFieldElement);
            if (theForm["__EVENTVALIDATION"]) {
                var callbackValidationFieldElement = xmlRequestFrame.document.createElement("INPUT");
                callbackValidationFieldElement.type = "hidden";
                callbackValidationFieldElement.name = "__EVENTVALIDATION";
                callbackValidationFieldElement.value = theForm["__EVENTVALIDATION"].value;
                xmlRequestFrame.document.forms[0].appendChild(callbackValidationFieldElement);
            }
            var callbackIndexFieldElement = xmlRequestFrame.document.createElement("INPUT");
            callbackIndexFieldElement.type = "hidden";
            callbackIndexFieldElement.name = "__CALLBACKINDEX";
            callbackIndexFieldElement.value = callbackIndex;
            xmlRequestFrame.document.forms[0].appendChild(callbackIndexFieldElement);
            xmlRequestFrame.document.forms[0].submit();
        }
    }, 10);
}
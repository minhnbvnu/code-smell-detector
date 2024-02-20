function setupTree(sessionURL) {
        // first make sure that we are not in colabOnly mode
        AnywhereHTTPApi.hasRemoteRendering(sessionURL, function(hasRemoteRendering) {
            if (!hasRemoteRendering) {
                // colab Only mode == show error
                // hide main UI and show error
                $("#main").css("padding-top", "0px");
                $("#error").css("font-size", "0.8em");
                $('#generalError').show()
                $('#error').html("<br>note: Collaboration Only Mode!").show();
                $('#btn_refresh').hide();
            } 
            // try to get the browse API
            var currentDiscoveryURL = AnywhereHTTPApi.getLatestsDiscoveryURL( sessionURL);
            var browseAPIURL = AnywhereHTTPApi.getLink( currentDiscoveryURL, "http://anywhere.adobe.com/mountpoints/browse");

            // check if browse API is supported already
            if (browseAPIURL !== "" ){ 

                AnywhereHTTPApi.getMountpoints(sessionURL, function(mountpointsJSON) {
                    console.dir(mountpointsJSON)
                    //fill mountpoints in drop down
                    var mountpoints = mountpointsJSON["setting"]["properties"]["mountpoints"]
                    $.each(mountpoints, function() {
                       $("#mountpointDropDown").append(new Option(this.label, this.label));
                    });

                    // changing the mountpoint in the dropdown causes a reload of the tree data
                    $("#mountpointDropDown").change(function () {
                            DOMBridge.anywhere.getAuthenticationToken( function(newToken) {
                                 // save token
                                if (newToken && newToken.length !== 0) {
                                    AnywhereHTTPApi.saveTokenAsCookie (newToken, sessionURL, function() {
                                        initTreeData( browseAPIURL, $('#mountpointDropDown option:selected').val())
                                    });
                                }else {
                                    // hide main UI and show error
                                    $('#error').html("Please Sign in to Adobe Anywhere!").show();
                                    $('#main').hide();
                                }                            
                            });
                        });

                    //init tree
                    initTreeData( browseAPIURL, $('#mountpointDropDown option:selected').val());
                });
            } else {
                // hide tree
                $("#browseUI").hide();
            }
        });      
    }
function createTabPanelContents(panel, skipLoadedCheck) {
        if (!panel || panel.length == 0)
            return;
        var widgetId = $(panel).attr("id");
        document.location.hash = "#goto_" + widgetId;
        if (!widgetId || (loadedWidgets[widgetId] & !skipLoadedCheck) || $.inArray(widgetId, widgetNames) == -1)
            return;

        switch(widgetId) {
        	case "accordion":
        		autoCreateInPanel(panel);
        		var chk = $("<input id='toggleCollapsible' class='destroyMe' type='checkbox'/>");
        		chk.click(function(e){
        			console.log(event.target);
        			$("#sampleAccordion").accordion("option","collapsible", event.target.checked);
        		});
        		chk.appendTo(panel.find(".widgetControls:eq(0)")).after("<label class='destroyMe' for='toggleCollapsible'>Allow all accordion sections to be collapsed at the same time</label>");
        	break;
        	case "slider":
                createSliders(panel);
                break;
            case "progressbar":
                createProgressBars(panel);
                break;
            case "button":
                $("#repeat").addClass("hiddenFieldset")
                createButtons(panel);
                break;
            case "menubar":
                $("#sampleMenubar").menubar({
                	menuIcon : true,
                	select : function(event, ui){
                	$("#menubarStatusUpdater").text("'" + ui.item.text() + "' menubar item selected");
                	}});
                //VERY experimental: Moving focus back when accessing menu by shortcut
                /*
                $(document).bind("keyup", function(event){
                 if (event.keyCode == 77 & event.shiftKey && event.altKey) {
                     if (event.target.nodeType != 1 || !$(event.target).is(":focusable"))
                         $("#sampleMenubar").data("returnFocusTo", null)
                     else
                         $("#sampleMenubar").data("returnFocusTo", event.target)
                    var tabId = $.inArray("menubar", widgetNames);
                    if (tabId != -1) {
                        $("#demoTabs").tabs("select", tabId);
                        $("#sampleMenubar").find("a[tabindex=0]").get(0).focus();
                    }
                 }
                })*/
                $("#sampleMenubar").after($("<p aria-live='polite' id='menubarStatusUpdater'>&nbsp;</p>"));
                break;
            case "dialog":
                createDialog(panel);
                break;
            case "tree":
                $('#sampleTree').jstree({plugins : ["themes", "html_data", "ui", "hotkeys"]});

                break;
            case "carousel":
                $('#mycarousel1').jcarousel({
                    animation: 500,
                    itemSelectedCallback : itemSelectedCallback
                });
                break;
            case "tooltip":
                autoCreateInPanel(panel);
                $("<input type='checkbox' id='tooltipToggler'/>").appendTo("#tooltipButtonAnchor")
                	.after("<label for='tooltipToggler'>Toggle tooltips for static elements</label>");

                $("#tooltipToggler").click(function() {
                    if ($(this).is(":checked")) {
                		$(".toggleTooltips :ui-tooltip").tooltip("open");
                	}
	                else {
	                	$(".toggleTooltips :ui-tooltip").tooltip("close");
	                }
                });
                break;
            case "tabs":
                $("#sampleTabs").tabs({labelledBy: "tabsDemoLbl"});
                break;
            case "autocomplete":
                createAutoComplete(panel);
                break;
            case "datepicker":
    			$( "#datepicker1" ).datepicker( {
    				select: function( event, ui ) {
    					$( "#datepicker1" ).val( ui.date ).focus( 1 );
    				}
    			});

    			$( "#datepicker2" ).datepicker( {
    					select: function( event, ui ) {
    						$( "#dp2-output" ).text( "selected date: " + ui.date );
    				}
    			});
            	break;

            default: //No special logic required, simply call component's method on demo objects in tab poanel
                autoCreateInPanel(panel);
        }
        loadedWidgets[widgetId] = true;
    }
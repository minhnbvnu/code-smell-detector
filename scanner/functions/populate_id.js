function populate_id(id, type) {
    // Upload a related pcap (Using the related dialog persona)
    $( "#dialog-new-pcap" ).on("dialogopen.add_related_pcap", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        // $(this).find("form").removeAttr("target"); // Get rid of target to refresh page
        // Unlike new-sample below, this does not redirect us nor refresh the
        // Relationships list of the Sample, so delay for a few seconds then reload the
        // page after uploaded.  Added a fileUploadComplete event to work around this.
        $(this).find("form").bind("fileUploadComplete",
                    function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
        }
    });

    // Upload a related Domain (Using the related dialog persona)
    $( "#dialog-new-domain" ).on("dialogopen.add_related_domain", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Upload a related Sample (Using the related dialog persona)
    $( "#dialog-new-sample" ).on("dialogopen.add_related_domain", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("fileUploadComplete",
                    function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
        }
    });
    // Add a related Actor (Using the related dialog persona)
    $( "#dialog-new-actor" ).on("dialogopen.add_related_actor", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related Target (Using the related dialog persona)
    $( "#dialog-new-target" ).on("dialogopen.add_related_target", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related Email (Using the related dialog persona)
    $( "#dialog-new-email-eml" ).on("dialogopen.add_related_email", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        // $(this).find("form").removeAttr("target"); // Get rid of target to refresh page

        // Unlike new-sample below, this does not redirect us nor refresh the
        // Relationships list of the Sample, so delay for a few seconds then reload the
        // page after uploaded.  Added a fileUploadComplete event to work around this.
        $(this).find("form").bind("fileUploadComplete",
                    function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
        }
    });
    // Add a related Email (Using the related dialog persona)
    $( "#dialog-new-email-outlook" ).on("dialogopen.add_related_email", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        // $(this).find("form").removeAttr("target"); // Get rid of target to refresh page

        // Unlike new-sample below, this does not redirect us nor refresh the
        // Relationships list of the Sample, so delay for a few seconds then reload the
        // page after uploaded.  Added a fileUploadComplete event to work around this.
        $(this).find("form").bind("fileUploadComplete",
                    function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
        }
    });
    // Add a related Email (Using the related dialog persona)
    $( "#dialog-new-email-raw" ).on("dialogopen.add_related_event", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related Email (Using the related dialog persona)
    $( "#dialog-new-email-yaml" ).on("dialogopen.add_related_event", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related Email (Using the related dialog persona)
    $( "#dialog-new-email-fields" ).on("dialogopen.add_related_event", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related Event (Using the related dialog persona)
    $( "#dialog-new-event" ).on("dialogopen.add_related_event", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related Exploit (Using the related dialog persona)
    $( "#dialog-new-exploit" ).on("dialogopen.add_related_exploit", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related Indicator (Using the related dialog persona)
    $( "#dialog-new-indicator" ).on("dialogopen.add_related_indicator", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related Indicator (Using the related dialog persona)
    $( "#dialog-new-indicator-csv" ).on("dialogopen.add_related_indicator", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("fileUploadComplete",
                    function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
        }
    });
    // Add a related Indicator (Using the related dialog persona)
    $( "#dialog-indicator-blob" ).on("dialogopen.add_related_indicator", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related IP (Using the related dialog persona)
    $( "#dialog-new-ip" ).on("dialogopen.add_related_ip", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related backdoor (Using the related dialog persona)
    $( "#dialog-new-backdoor" ).on("dialogopen.add_related_backdoor", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    // Add a related campaign (Using the related dialog persona)
    $( "#dialog-new-campaign" ).on("dialogopen.add_related_campaign", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    $( "#dialog-new-certificate" ).on("dialogopen.add_related_certificate", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("fileUploadComplete",
                    function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
        }
    });
    // Add a related Raw Data (Using the related dialog persona)
    $( "#dialog-new-raw-data" ).on("dialogopen.add_related_raw_data", function() {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
    $( "#dialog-new-raw-data-file" ).on("dialogopen.add_related_raw_data_file", function() {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("fileUploadComplete",
                    function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
        }
    });
    $( "#dialog-new-signature" ).on("dialogopen.add_related_signatures", function(e) {
        if ($(this).dialog("persona") == "related") {
        $(this).find("form #id_related_id").val(id);
        $(this).find("form #id_related_type").val(type);
        $(this).find("form").bind("addEditSubmitComplete",
            function(e, response) {
                    $.ajax({
                      type: "POST",
                      success: function() {
                          $('#relationship_box_container').load(location.href + " #relationship_box_container");
                      }
                    })
              });
          }
    });
}
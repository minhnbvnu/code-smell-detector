function getWhois() {
        if (true) {
            alert("This functionality is not yet implemented.");
        } else {
            $.ajax({
         type: "GET",
       url: "http://localhost/",
         async: false,
         success: function(html){
        $("#id_data").val(html);
         },
         error: function(xhr, err){
        //alert("Error: "+xhr.status);
         }
       });
        }
  }
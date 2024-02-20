function deleteSignatureDependency(coll, oid)
{
   //get the attribute of the row tr element, if success, this will be removed
   var rowString = "[data-record-key='" + oid + "']";
   var rowSel = "tr" + rowString;

   var answer = confirm("This will delete the Signature Dependency. Are you sure?" );
   if(answer) {
    var me = $("a#to_delete_"+oid);
    $.ajax({
        type: "POST",
        url: delete_signature_dependency,
        data: {
            coll: coll,
            oid: oid,
        },
        datatype: 'json',
        success: function(data) {
                //delete the row
                if(data.success) {
                //should be equal to 1 selecting on key
                  if($(rowSel).length>0) {
                   $(rowSel).get(0).remove();
                  }

                } else {
                    //console.log("Failed to delete the signature, returned");
                }
        },
        });
    } else {
        //console.log("Deletion cancelled by user");
    }

}
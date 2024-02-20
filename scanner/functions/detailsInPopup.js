function detailsInPopup(leaveId, divId){
    $.ajax({
      url: '/calendar/leave-summary/'+leaveId+'/',
      success: function(response){
        $('#'+divId).html(response);
      }
    });
    return '<div id="'+ divId +'">Loading...</div>';
  }
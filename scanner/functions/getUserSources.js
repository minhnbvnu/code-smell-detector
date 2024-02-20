function getUserSources(user) {
  $.ajax({
      type: "POST",
      url: user_source_access,
      data: {'username': user.value},
      datatype: 'json',
      success: function(data) {
          if (data.success) {
              $("#form-add-new-user table").html(data.message);
              $('.multiselect').multiselect({dividerLocation:0.5});
          }
      }
  });
}
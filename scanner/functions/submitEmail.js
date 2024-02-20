function submitEmail() {
  let emailID = $('#emailLoginId').val();
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  $.ajax({
    url: 'update-email-user',
    type: 'post',
    data: {
      emailID: emailID,
    },
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
    },
    dataType: 'json',
    success: function (response) {
      if (response.code === 200) {
        toastr.success('Email updated Successfully', '', {
          timeOut: 1000,
          fadeOut: 1000,
          onHidden: function () {
            window.location.href =
              'https://appv5.socioboard.com/amember/member/index';
          },
        });
      }
    },
  });
}
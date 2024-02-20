function openPackagesPage() {
  $.ajax({
    url: 'check-email-user',
    type: 'GET',
    processData: false,
    cache: false,
    success: function (response) {
      if (
        response.code === 200 &&
        localStorage.getItem('browser_id') &&
        localStorage.getItem('random_key')
      ) {
        if (response.email !== null) {
          window.location.href =
            'https://appv5.socioboard.com/amember/member/index';
        } else {
          $('#emailModal').modal('show');
        }
      } else {
        toastr.error('Some error occurred, can not perform operation');
      }
    },
  });
}
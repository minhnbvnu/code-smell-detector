function socialNetworksFunction(socialData) {
  let available_networks = [];
  let social_networks = '';
  available_networks = socialData.split('-');
  available_networks.forEach(function (id) {
    switch (id) {
      case '1':
        social_networks +=
          '<i class="fab fa-facebook-f fa-fw" data-toggle="tooltip" data-placement="top" title="Facebook" data-original-title="Facebook"></i>';
        break;
      case '2':
        social_networks +=
          '<i class="far fa-file fa-fw" data-toggle="tooltip" data-placement="top" title="Facebook page" data-original-title="Facebook page"></i>';
        break;
      case '3':
        social_networks +=
          '<i class="fas fa-user-friends fa-fw" data-toggle="tooltip" data-placement="top" title="Facebook group" data-original-title="Facebook group"></i>';
        break;
      case '4':
        social_networks +=
          '<i class="fab fa-twitter fa-fw" data-toggle="tooltip" data-placement="top" title="Twitter" data-original-title="Twitter"></i>';
        break;
      case '5':
        social_networks +=
          '<i class="fab fa-instagram fa-fw" data-toggle="tooltip" data-placement="top" title="Instagram" data-original-title="Instagram"></i>';
        break;
      case '6':
        social_networks +=
          '<i class="fab fa-linkedin-in fa-fw" data-toggle="tooltip" data-placement="top" title="Linkedin" data-original-title="Linkedin"></i>';
        break;
      case '7':
        social_networks +=
          '<i class="fas fa-user-tie fa-fw" data-toggle="tooltip" data-placement="top" title="linkedin Business" data-original-title="linkedin Business"></i>';
        break;
      case '8':
        social_networks +=
          '<i class="fab fa-google-plus-g fa-fw" data-toggle="tooltip" data-placement="top" title="Google Plus" data-original-title="Google Plus"></i>';
        break;
      case '9':
        social_networks +=
          '<i class="fab fa-youtube fa-fw" data-toggle="tooltip" data-placement="top" title="YouTube" data-original-title="YouTube"></i>';
        break;
      case '18':
        social_networks +=
            '<i class="fab fa-tiktok fa-fw" data-toggle="tooltip" data-placement="top" title="Tiktok" data-original-title="Tiktok"></i>';
        break;
      // case '10':
      //   social_networks +=
      //     '<i class="fas fa-chart-line fa-fw" data-toggle="tooltip" data-placement="top" title="Google Analytics" data-original-title="Google Analytics"></i>';
      //   break;
      // case '11':
      //   social_networks +=
      //     '<i class="fab fa-dailymotion fa-fw" data-toggle="tooltip" data-placement="top" title="Dailymotion" data-original-title="Dailymotion"></i>';
      //   break;
    }
  });
  return social_networks;
}
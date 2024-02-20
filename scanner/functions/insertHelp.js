function insertHelp() {

    var l = NVR.getDefaultLanguage() || 'en';
    var lang = "lang/help/help-" + l + ".html";
    //console.log ("LANG IS " + lang);
    var templateUrl = $sce.getTrustedResourceUrl(lang);
    var lang_fb = "lang/help/help-" + "en" + ".html";
    var templateUrlFB = $sce.getTrustedResourceUrl(lang_fb);

    $templateRequest(lang)
      .then(function (template) {
          var elem = angular.element(document.getElementById('insertHelp'));
          $compile(elem.html(template).contents())($scope);
        },
        function (error) {
          NVR.log("Language file " + lang + " not found, falling back");
          $templateRequest(templateUrlFB)
            .then(function (template) {
                var elem = angular.element(document.getElementById('insertHelp'));
                $compile(elem.html(template).contents())($scope);
              },
              function (error) {
                NVR.log("fallback help not found");
              });
        }
      );

  }
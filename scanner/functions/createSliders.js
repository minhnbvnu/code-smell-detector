function createSliders(panel)  {
        //single slider
          $(panel).find(".fallback").hide();

          $("#singleSlider1").slider({unittext : "MB",
              label : "price",
              unittext: "$",
              slide: function(event, ui) {
              updateSliderLabels(ui, ["#slider1Val"]);
                  },
              change : function(event, ui) {
                      updateSliderLabels(ui, ["#slider1Val"]);
                  }
          });

          setTimeout( function() {
              $(panel).find(".sliderValue").show();
              updateSliderLabels({value : $("#singleSlider1").slider("value"), handle : $("#singleSlider1").find(".ui-slider-handle").eq(0)}, ["#slider1Val"]);
              updateSliderLabels({value : $("#singleSlider1").slider("value"), handle : $("#singleSlider1").find(".ui-slider-handle").eq(0)}, ["#slider1Val"]);
          }, 100);

          // range slider
          var rangeSlider = $("#rangeSlider1")
          .slider({
              range: true,
              min: 0,
              max: 500,
              values: [75, 300],
              unittext: "$",
              label: "price range",
              slide: function(event, ui) {
              updateSliderLabels(ui, ["#slider2ValMin", "#slider2ValMax"]);
              },
              change : function(event, ui) {
                  updateSliderLabels(ui, ["#slider2ValMin", "#slider2ValMax"]);
              }
          });
          setTimeout(function() {
              var sliderValues = rangeSlider.slider("values");
              updateSliderLabels({value : sliderValues[0], values : sliderValues, handle : rangeSlider.find(".ui-slider-handle").eq(0)}, ["#slider2ValMin", "#slider2ValMax"]);
              updateSliderLabels({value : sliderValues[1], values : sliderValues, handle : rangeSlider.find(".ui-slider-handle").eq(1)}, ["#slider2ValMin", "#slider2ValMax"]);
              // need to do this twice for some reason, va;ue is not properly positioned otherwise
              updateSliderLabels({value : sliderValues[0], values : sliderValues, handle : rangeSlider.find(".ui-slider-handle").eq(0)}, ["#slider2ValMin", "#slider2ValMax"]);
              updateSliderLabels({value : sliderValues[1], values : sliderValues, handle : rangeSlider.find(".ui-slider-handle").eq(1)}, ["#slider2ValMin", "#slider2ValMax"]);
          }, 100);
    }
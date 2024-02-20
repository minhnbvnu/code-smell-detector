function scannerStart(){
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || false;
		if(navigator.getUserMedia){
			if (!!window.stream) {
				$("video").attr('src',null);
  			}

			var videoSource = $("select#videoSource").val();
			var constraints = {
				video: {
					optional: [{sourceId: videoSource}]
				}
			};

			navigator.getUserMedia(constraints, function(stream){
				window.stream = stream; // make stream available to console
				var videoElement = document.querySelector('video');
				try {
					videoElement.srcObject = stream;
				} catch {
					videoElement.src = window.URL.createObjectURL(stream);
				}
				videoElement.play();
			}, function(error){ });


			QCodeDecoder().decodeFromVideo(document.getElementById('videoReader'), function(er,data){
				if(!er){
					var match = data.match(/^bitcoin\:([1|3|bc1][a-z0-9]{25,50})/i);
					var result = match ? match[1] : data;
					$(""+$("#qrcode-scanner-callback-to").html()).val(result);
					$("#qrScanClose").click();
				}
			});

		} else {
			$("#videoReaderError").removeClass("hidden");
			$("#videoReader, #videoSource").addClass("hidden");
		}
	}
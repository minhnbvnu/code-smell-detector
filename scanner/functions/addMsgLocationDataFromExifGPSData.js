function addMsgLocationDataFromExifGPSData(msg,val) {
            if (msg.exif.GPSAltitude) {
                /* istanbul ignore else */
                if (!msg.location) { msg.location = {}; }
                msg.location.alt = parseFloat(msg.exif.GPSAltitude);
            }
            if (msg.exif.GPSLatitudeRef && msg.exif.GPSLatitude && msg.exif.GPSLongitudeRef && msg.exif.GPSLongitude) { // location can be determined, OK
                if (!msg.location) { msg.location = {}; }
                msg.location.lat = msg.exif.GPSLatitude;
                msg.location.lon = msg.exif.GPSLongitude;
                if (msg.exif.GPSLatitudeRef == "South latitude") {
                    msg.location.lat *= -1;
                }
                if (msg.exif.GPSLongitudeRef == "West longitude") {
                    msg.location.lon *= -1;
                }
            }
            else {
                node.log("The location of this image cannot be determined safely so no location information has been added to the message.");
            }
            if (msg.location) {
                msg.location.arc = {
                    ranges: [100,300,500],
                    pan: msg.exif.GPSImgDirection ?? msg.exif.GimbalYawDegree,
                    fov: (2 * Math.atan(36 / (2 * msg.exif.FocalLengthIn35mmFilm)) * 180 / Math.PI),
                    color: '#aaaa00'
                }
                msg.location.icon = "fa-camera fa-lg";
                if (msg.exif.Make === "DJI") { msg.location.icon = "quad"; }
                if (msg.exif.Make === "Potensic") { msg.location.icon = "quad"; }
                if (msg.exif.Make === "Parrot") { msg.location.icon = "quad"; }
                msg.location.iconColor = "orange";
                var na;
                var pop = "";
                if (val.hasOwnProperty("name")) { na = val.name; }
                else if (msg.hasOwnProperty("filename")) {
                    na = msg.filename.split('/').pop();
                    pop = "Timestamp: "+msg.exif.DateTimeOriginal+"<br/>";
                }
                else { na = msg.exif.Make+"_"+msg.exif.DateTimeOriginal; }
                msg.location.name = na;
                msg.location.layer = "Images";
                if (msg.exif.ImageDescription) {
                    pop = "Caption: "+msg.exif.ImageDescription+"<br/>"+pop;
                }
                pop += '<img width="280" src="data:image/jpeg;base64,'+val.toString("base64")+'"/>'
                if (msg.location.lat && msg.location.lon) {
                    pop += "<br/>Lat, Lon: "+msg.location.lat+", "+msg.location.lon;
                }
                msg.location.popup = pop;
            }
        }
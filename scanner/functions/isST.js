function isST(){
				console.log("Checking for old 15 instrument soundtracker format");
				file.goto(0);
				for (var i = 0; i<20;i++) if (!isAcii(file.readByte())) return false;

				console.log("First 20 chars are ascii, checking Samples");

				// check samples
				var totalSampleLength = 0;
				var probability =0;
				for (var s = 0; s<15;s++) {
					for (i = 0; i<22;i++) if (!isAcii(file.readByte())) return false;
					file.jump(-22);
					var name = file.readString(22);
					if (name.toLowerCase().substr(0,3) == "st-") probability += 10;
					if (probability>20) return true;
					totalSampleLength += file.readWord();
					file.jump(6);
				}

				if (totalSampleLength*2 + 1624 > length) return false;

				return true;
			}
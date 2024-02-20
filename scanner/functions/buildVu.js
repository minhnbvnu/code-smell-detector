function buildVu(){

		base.width = baseActive.width = vuWidth;
		base.height = baseActive.height = vuHeight;
		var dots = Math.floor(vuWidth / (dotWidth+margin));

		baseCtx.clearRect(0,0,base.width,base.height);
		baseActiveCtx.clearRect(0,0,baseActive.width,baseActive.height);

		for (var i = 0; i< dots; i++){
			var img = dotGreen;
			var imgActive = dotGreenActive;
			if (i>=dots/3){
				img = dotYellow;
				imgActive = dotYellowActive;
			}
			if (i>=dots/1.5){
				img = dotRed;
				imgActive = dotRedActive;
			}

			baseCtx.drawImage(img,i*(dotWidth+margin),0,dotWidth,vuHeight);
			baseActiveCtx.drawImage(imgActive,i*(dotWidth+margin),0,dotWidth,vuHeight);
		}
        me.ctx.fillStyle = "#253352";
	}
function drawHeart(){
				flag++;
				heartX = getX(radian);
				heartY = getY(radian);
				radian += radianDecrement;
				if(flag < 31){
					if(flag%8==0){
						garden.createRandomBloom(heartX, heartY, 12);
					}
				}else if(flag % 4 == 0){
					if(radian>Math.PI+300*radianDecrement)
						garden.createRandomBloom(heartX, heartY, 56 - (5.51) *(radian));
					else if(!(radian<=Math.PI+205*radianDecrement&&radian>=Math.PI+180*radianDecrement))//只是让变得好看
						garden.createRandomBloom(heartX, heartY, 12);
				}
			}
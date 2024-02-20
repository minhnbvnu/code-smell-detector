function drawWave() {
            analyser.getByteTimeDomainData(dataArray);

            me.ctx.lineWidth = 2;
            me.ctx.strokeStyle = 'rgba(120, 255, 50, 0.5)';
            me.ctx.beginPath();
            var sliceWidth = me.width * 1.0 / bufferLength;
            var wx = 0;

            for(var i = 0; i < bufferLength; i++) {
                var v = dataArray[i] / 128.0;
                var wy = v * me.height/2;

                if(i === 0) {
                    me.ctx.moveTo(wx, wy);
                } else {
                    me.ctx.lineTo(wx, wy);
                }

                wx += sliceWidth;
            }

            me.ctx.lineTo(me.width, me.height/2);
            me.ctx.stroke();

            me.parentCtx.drawImage(me.canvas,me.left, me.top);
        }
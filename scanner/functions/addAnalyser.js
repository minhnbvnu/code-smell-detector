function addAnalyser(){
                var a = Audio.context.createAnalyser();
                a.smoothingTimeConstant = 0;
                a.fftSize = analyserSize;
                trackAnalyser.push(a);
            }
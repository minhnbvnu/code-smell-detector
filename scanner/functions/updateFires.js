function updateFires() {
            aTime = aTime || new Date();
            var btime = new Date();
            var deltaTime = btime - aTime;
            transCum = transCum + deltaTime;
            aTime = btime;
            ++fires;
        }
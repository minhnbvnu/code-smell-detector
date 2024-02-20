function convertToPOSIX(request, wallclock) {
            if (request.zone == "UTC")
                return wallclock;
            var entry, diff;
            request.entry = entry = find(request, "wallclock", wallclock);
            diff = wallclock - entry.wallclock;
            return 0 < diff && diff < entry.save ? null : wallclock - entry.offset - entry.save;
        }
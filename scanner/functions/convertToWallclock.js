function convertToWallclock(request, posix) {
            if (request.zone == "UTC")
                return posix;
            request.entry = find(request, "posix", posix);
            return posix + request.entry.offset + request.entry.save;
        }
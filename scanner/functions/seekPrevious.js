function seekPrevious(buffer, pos) {
                var position = pos;
                if (position <= 0) return 0;

                while (--position > 0 && !isMask(position)) { };
                return position;
            }
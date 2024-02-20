function animateTile(i) {
            tiles.eq(i).animate( animCSS, {
                duration: opts.speed,
                easing: opts.easing,
                complete: function () {
                    if (fwd ? (num - 1 === i) : (0 === i)) {
                        opts._tileAniCallback();
                    }
                }
            });

            setTimeout(function () {
                if (fwd ? (num - 1 !== i) : (0 !== i)) {
                    animateTile(fwd ? (i + 1) : (i - 1));
                }
            }, opts.tileDelay);
        }
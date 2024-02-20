function restart_and_resolve () {
            that.kernel.restart(function () {
                // resolve when the kernel is *ready* not just started
                that.events.one('kernel_ready.Kernel', resolve_promise);
            }, reject_promise);
        }
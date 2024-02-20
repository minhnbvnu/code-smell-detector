function signal_abort(node) {
                if (abort) return node;
                if (stop_after === node) abort = true;
                if (stop_if_hit === node) stop_if_hit = null;
                return node;
            }
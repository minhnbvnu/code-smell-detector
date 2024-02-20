function nodeToHTMLColor(node) {
        if (node.label === 'Play') {
            // Force the Play node to white. It is almost always near
            // the center of the graph and nearly white anyway, but
            // this improves contrast.
            return '#fff';
        }
        
        const x = Math.min(1, Math.max(0, 1.5 * node.x / graph._label.width - 0.25));
        const y = Math.min(1, Math.max(0, 1.5 * node.y / graph._label.height - 0.25));

        // Use a Red-Cyan-Yellow color wheel
        let r = Math.max(Math.sqrt(1 - x), Math.max(2 * y - 0.8, 0));
        let g = Math.max(Math.sqrt((x * 0.95 + 0.05) * y), 0.6 * Math.pow(Math.max(2 * (1 - y) - 1, 0), 2));
        let b = Math.sqrt((x * 0.95 + 0.05) * Math.sqrt(1.1 - y));

        // Boost around the green primary
        g += 0.5 * x * Math.max(0, (1 - Math.abs(y - 0.6) * 2));
        
        // Maximize value
        const m = Math.max(r, g, b);
        r /= m; g /= m; b /= m;

        // Decrease saturation
        const s = 0.65;
        // Code to decrease saturation radially, no longer needed now that
        // we special-case the "Play" mode:
        //  s = Math.min(1, Math.pow(Math.hypot(x - 0.5, y - 0.5), 2) * 1.7);

        // Reduce saturation and convert to [0, 255]
        r = Math.round((r * s + (1 - s)) * 255);
        g = Math.round((g * s + (1 - s)) * 255);
        b = Math.round((b * s + (1 - s)) * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }
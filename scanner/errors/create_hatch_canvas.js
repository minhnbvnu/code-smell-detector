function create_hatch_canvas(ctx, hatch_pattern, hatch_color, hatch_alpha, hatch_scale, hatch_weight) {
        var _a;
        const h = hatch_scale;
        const h2 = h / 2;
        const h4 = h2 / 2;
        const color = (0, color_1.color2css)(hatch_color, hatch_alpha);
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineCap = "square";
        ctx.lineWidth = hatch_weight;
        switch ((_a = exports.hatch_aliases[hatch_pattern]) !== null && _a !== void 0 ? _a : hatch_pattern) {
            // we should not need these if code conditions on hatch.doit, but
            // include them here just for completeness
            case "blank":
                break;
            case "dot":
                ctx.arc(h2, h2, h2 / 2, 0, 2 * Math.PI, true);
                ctx.fill();
                break;
            case "ring":
                ctx.arc(h2, h2, h2 / 2, 0, 2 * Math.PI, true);
                ctx.stroke();
                break;
            case "horizontal_line":
                _horz(ctx, h, h2);
                break;
            case "vertical_line":
                _vert(ctx, h, h2);
                break;
            case "cross":
                _horz(ctx, h, h2);
                _vert(ctx, h, h2);
                break;
            case "horizontal_dash":
                _horz(ctx, h2, h2);
                break;
            case "vertical_dash":
                _vert(ctx, h2, h2);
                break;
            case "spiral": {
                const h30 = h / 30;
                ctx.moveTo(h2, h2);
                for (let i = 0; i < 360; i++) {
                    const angle = 0.1 * i;
                    const x = h2 + (h30 * angle) * Math.cos(angle);
                    const y = h2 + (h30 * angle) * Math.sin(angle);
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
                break;
            }
            case "right_diagonal_line":
                ctx.moveTo(-h4 + 0.5, h);
                ctx.lineTo(h4 + 0.5, 0);
                ctx.stroke();
                ctx.moveTo(h4 + 0.5, h);
                ctx.lineTo(3 * h4 + 0.5, 0);
                ctx.stroke();
                ctx.moveTo(3 * h4 + 0.5, h);
                ctx.lineTo(5 * h4 + 0.5, 0);
                ctx.stroke();
                break;
            case "left_diagonal_line":
                ctx.moveTo(h4 + 0.5, h);
                ctx.lineTo(-h4 + 0.5, 0);
                ctx.stroke();
                ctx.moveTo(3 * h4 + 0.5, h);
                ctx.lineTo(h4 + 0.5, 0);
                ctx.stroke();
                ctx.moveTo(5 * h4 + 0.5, h);
                ctx.lineTo(3 * h4 + 0.5, 0);
                ctx.stroke();
                break;
            case "diagonal_cross":
                _x(ctx, h);
                break;
            case "right_diagonal_dash":
                ctx.moveTo(h4 + 0.5, 3 * h4 + 0.5);
                ctx.lineTo(3 * h4 + 0.5, h4 + 0.5);
                ctx.stroke();
                break;
            case "left_diagonal_dash":
                ctx.moveTo(h4 + 0.5, h4 + 0.5);
                ctx.lineTo(3 * h4 + 0.5, 3 * h4 + 0.5);
                ctx.stroke();
                break;
            case "horizontal_wave":
                ctx.moveTo(0, h4);
                ctx.lineTo(h2, 3 * h4);
                ctx.lineTo(h, h4);
                ctx.stroke();
                break;
            case "vertical_wave":
                ctx.moveTo(h4, 0);
                ctx.lineTo(3 * h4, h2);
                ctx.lineTo(h4, h);
                ctx.stroke();
                break;
            case "criss_cross":
                _x(ctx, h);
                _horz(ctx, h, h2);
                _vert(ctx, h, h2);
                break;
            default:
                logging_1.logger.warn(`unknown hatch pattern: ${hatch_pattern}`);
        }
    }
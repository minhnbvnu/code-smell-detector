function emitDrawBody(env, draw, args, program) {
                injectExtensions(env, draw);
                if (args.useVAO) {
                    if (args.drawVAO) {
                        draw(env.shared.vao, '.setVAO(', args.drawVAO.append(env, draw), ');');
                    }
                    else {
                        draw(env.shared.vao, '.setVAO(', env.shared.vao, '.targetVAO);');
                    }
                }
                else {
                    draw(env.shared.vao, '.setVAO(null);');
                    emitAttributes(env, draw, args, program.attributes, function () {
                        return true;
                    });
                }
                emitUniforms(env, draw, args, program.uniforms, function () {
                    return true;
                }, false);
                emitDraw(env, draw, draw, args);
            }
function _init_comms(target, doc) {
        if (typeof Jupyter !== "undefined" && Jupyter.notebook.kernel != null) {
            logging_1.logger.info(`Registering Jupyter comms for target ${target}`);
            const comm_manager = Jupyter.notebook.kernel.comm_manager;
            try {
                comm_manager.register_target(target, (comm) => {
                    logging_1.logger.info(`Registering Jupyter comms for target ${target}`);
                    const r = new receiver_1.Receiver();
                    comm.on_msg(_handle_notebook_comms.bind(doc, r));
                });
            }
            catch (e) {
                logging_1.logger.warn(`Jupyter comms failed to register. push_notebook() will not function. (exception reported: ${e})`);
            }
        }
        else if (doc.roots()[0].id in exports.kernels) {
            logging_1.logger.info(`Registering JupyterLab comms for target ${target}`);
            const kernel = exports.kernels[doc.roots()[0].id];
            try {
                kernel.registerCommTarget(target, (comm) => {
                    logging_1.logger.info(`Registering JupyterLab comms for target ${target}`);
                    const r = new receiver_1.Receiver();
                    comm.onMsg = _handle_notebook_comms.bind(doc, r);
                });
            }
            catch (e) {
                logging_1.logger.warn(`Jupyter comms failed to register. push_notebook() will not function. (exception reported: ${e})`);
            }
        }
        else if (typeof google != "undefined" && google.colab.kernel != null) {
            logging_1.logger.info(`Registering Google Colab comms for target ${target}`);
            const comm_manager = google.colab.kernel.comms;
            try {
                comm_manager.registerTarget(target, async (comm) => {
                    var _a, e_1, _b, _c;
                    var _d;
                    logging_1.logger.info(`Registering Google Colab comms for target ${target}`);
                    const r = new receiver_1.Receiver();
                    try {
                        for (var _e = true, _f = tslib_1.__asyncValues(comm.messages), _g; _g = await _f.next(), _a = _g.done, !_a;) {
                            _c = _g.value;
                            _e = false;
                            try {
                                const message = _c;
                                const content = { data: message.data };
                                const buffers = [];
                                for (const buffer of (_d = message.buffers) !== null && _d !== void 0 ? _d : []) {
                                    buffers.push(new DataView(buffer));
                                }
                                const msg = { content, buffers };
                                _handle_notebook_comms.bind(doc)(r, msg);
                            }
                            finally {
                                _e = true;
                            }
                        }
                    }
                    catch (e_1_1) {
                        e_1 = { error: e_1_1 };
                    }
                    finally {
                        try {
                            if (!_e && !_a && (_b = _f.return))
                                await _b.call(_f);
                        }
                        finally {
                            if (e_1)
                                throw e_1.error;
                        }
                    }
                });
            }
            catch (e) {
                logging_1.logger.warn(`Google Colab comms failed to register. push_notebook() will not function. (exception reported: ${e})`);
            }
        }
        else {
            console.warn("Jupyter notebooks comms not available. push_notebook() will not function. If running JupyterLab ensure the latest @bokeh/jupyter_bokeh extension is installed. In an exported notebook this warning is expected.");
        }
    }
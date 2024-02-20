function includeAssets(extension) {
                var assets = [],
                	currentMode = 'default';

                // highlight code according to extension file
                if (config.editor.codeHighlight) {
                    if (extension === 'js') {
                        assets.push('/libs/CodeMirror/mode/javascript/javascript.js');
                        currentMode = 'javascript';
                    }
                    if (extension === 'css') {
                        assets.push('/libs/CodeMirror/mode/css/css.js');
                        currentMode = 'css';
                    }
                    if (extension === 'html') {
                        assets.push('/libs/CodeMirror/mode/xml/xml.js');
                        currentMode = 'text/html';
                    }
                    if (extension === 'xml') {
                        assets.push('/libs/CodeMirror/mode/xml/xml.js');
                        currentMode = 'application/xml';
                    }
                    if (extension === 'php') {
                        assets.push('/libs/CodeMirror/mode/htmlmixed/htmlmixed.js');
                        assets.push('/libs/CodeMirror/mode/xml/xml.js');
                        assets.push('/libs/CodeMirror/mode/javascript/javascript.js');
                        assets.push('/libs/CodeMirror/mode/css/css.js');
                        assets.push('/libs/CodeMirror/mode/clike/clike.js');
                        assets.push('/libs/CodeMirror/mode/php/php.js');
                        currentMode = 'application/x-httpd-php';
                    }
                    if (extension === 'java') {
                        assets.push('/libs/CodeMirror/mode/clike/clike.js');
                        currentMode = 'text/x-java';
                    }
                    if (extension === 'sql') {
                        assets.push('/libs/CodeMirror/mode/sql/sql.js');
                        currentMode = 'text/x-mysql';
                    }
                    if (extension === 'md') {
                        assets.push('/libs/CodeMirror/addon/mode/overlay.js');
                        assets.push('/libs/CodeMirror/mode/xml/xml.js');
                        assets.push('/libs/CodeMirror/mode/markdown/markdown.js');
                        assets.push('/libs/CodeMirror/mode/gfm/gfm.js');
                        assets.push('/libs/CodeMirror/mode/javascript/javascript.js');
                        assets.push('/libs/CodeMirror/mode/css/css.js');
                        assets.push('/libs/CodeMirror/mode/htmlmixed/htmlmixed.js');
                        assets.push('/libs/CodeMirror/mode/clike/clike.js');
                        assets.push('/libs/CodeMirror/mode/shell/shell.js');
                        assets.push('/libs/CodeMirror/mode/meta.js');
                        currentMode = 'gfm';
                    }
                    if (extension === 'sh') {
                        assets.push('/libs/CodeMirror/addon/mode/overlay.js');
                        assets.push('/libs/CodeMirror/mode/markdown/markdown.js');
                        assets.push('/libs/CodeMirror/mode/gfm/gfm.js');
                        assets.push('/libs/CodeMirror/mode/javascript/javascript.js');
                        assets.push('/libs/CodeMirror/mode/css/css.js');
                        assets.push('/libs/CodeMirror/mode/htmlmixed/htmlmixed.js');
                        assets.push('/libs/CodeMirror/mode/clike/clike.js');
                        assets.push('/libs/CodeMirror/mode/meta.js');
                        assets.push('/libs/CodeMirror/mode/shell/shell.js');
                        currentMode = 'shell';
                    }
                }

                if(assets.length) {
                    assets.push(function() {
                    	// after all required assets are loaded
                        editor_model.mode(currentMode);
					});
                    loadAssets(assets);
                } else {
                    editor_model.mode(currentMode);
				}
			}
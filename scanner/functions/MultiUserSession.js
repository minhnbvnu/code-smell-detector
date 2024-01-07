constructor(session_id) {
			this.id = session_id;
			this._fb_listeners = [];

			file_name = `[Loading ${this.id}]`;
			update_title();
			const on_firebase_loaded = () => {
				file_name = `[${this.id}]`;
				update_title();
				this.start();
			};
			if (!MultiUserSession.fb_root) {
				var script = document.createElement("script");
				script.addEventListener("load", () => {
					const config = {
						apiKey: "AIzaSyBgau8Vu9ZE8u_j0rp-Lc044gYTX5O3X9k",
						authDomain: "jspaint.firebaseapp.com",
						databaseURL: "https://jspaint.firebaseio.com",
						projectId: "firebase-jspaint",
						storageBucket: "",
						messagingSenderId: "63395010995"
					};
					firebase.initializeApp(config);
					MultiUserSession.fb_root = firebase.database().ref("/");
					on_firebase_loaded();
				});
				script.addEventListener("error", () => {
					show_error_message("Failed to load Firebase; the document will not load, and changes will not be saved.");
					file_name = `[Failed to load ${this.id}]`;
					update_title();
				});
				script.src = "lib/firebase.js";
				document.head.appendChild(script);
			}
			else {
				on_firebase_loaded();
			}
		}
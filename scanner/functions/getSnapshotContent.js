function getSnapshotContent() {
				if (null == snapshot) {
					snapshot = me.getSnapshotContent();
				}
				return snapshot;
			}
function pauseBip(id, reason, next) {
	dao.find(
		'bip',
		{
			id : id
		},
		function(err, bip) {
			if (err) {
				next(err);

			} else if (bip) {
				var message = reason || 'Paused By Administrator',
					pod = dao.pod('email');

        if (pod && pod.getConfig().sender) {
        	message += ' - Please Contact ' + pod.getConfig().sender + ' for more info';
        }

				dao.pauseBip(bip, true, function(err) {
					if (err) {
						next(err);
					} else {

						var jobPacket = {
		          owner_id : bip.owner_id,
		          bip_id : bip.id,
		          code : 'bip_paused_manual',
		          message : message
		        };

						app.bastion.createJob(DEFS.JOB_BIP_ACTIVITY, jobPacket, function() {
							next();
						});
					}
				}
				);

			} else {
				next('Not Found');
			}
		}
	);
}
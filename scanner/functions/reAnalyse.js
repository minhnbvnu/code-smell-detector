function reAnalyse(radio) {
		if (radio.checked == true) {
			if (radio.value == 0)
				dlg.user.bookmarks.break = true; //radio值为0，使收藏中断
			else
				dlg.user.illusts.break = true; //radio值为1，使作品中断

			dlg.analyse(radio.value, dlg.infoCard.infos.ID);
		}
	}
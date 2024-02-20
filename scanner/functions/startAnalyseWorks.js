function startAnalyseWorks(user, contentType) {
			var uInfo = user.info;
			var works, total, contentName, apiurl;
			//获取作品,contentType == 0，获取收藏,contentType == 1
			if (contentType == 0) {
				works = user.illusts;
				total = uInfo.profile.total_illusts + uInfo.profile.total_manga;
				contentName = "作品";
				apiurl = "https://app-api.pixiv.net/v1/user/illusts?user_id=" + uInfo.user.id;
			} else {
				works = user.bookmarks;
				total = uInfo.profile.total_illust_bookmarks_public;
				contentName = "收藏";
				apiurl = "https://app-api.pixiv.net/v1/user/bookmarks/illust?user_id=" + uInfo.user.id + "&restrict=public";
			}
			if (works.item.length > 0) { //断点续传
				dlg.log(`${contentName} 断点续传进度 ${works.item.length}/${total}`);
				dlg.progress.set(works.item.length / total); //设置当前下载进度
			}
			analyseWorks(user, contentType, apiurl); //开始获取第一页
		}
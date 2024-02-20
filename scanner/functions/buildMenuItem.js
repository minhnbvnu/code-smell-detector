function buildMenuItem(title, classname, callback, submenu) {
		var item = document.createElement("li");
		if (title == 0) //title为0时，只添加一条菜单分割线
		{
			item.className = "pubd-menu-line" + (classname ? " " + classname : "");
			return item;
		}
		item.className = "pubd-menu-item" + (classname ? " " + classname : "");

		//如果有子菜单则添加子菜单
		if (typeof(submenu) == "object") {
			item.classList.add("pubd-menu-includesub"); //表明该菜单项有子菜单
			submenu.classList.add("pubd-menu-submenu"); //表明该菜单是子菜单
			//a.addEventListener("mouseenter",function(){callback.show()});
			//a.addEventListener("mouseleave",function(){callback.hide()});
			item.appendChild(submenu);
			item.subitem = submenu;
		}else
		{
			item.subitem = null; //子菜单默认为空
		}

		//添加链接
		var a = item.appendChild(document.createElement("a"));
		a.className = "pubd-menu-item-a";
		//添加图标
		var icon = a.appendChild(document.createElement("i"));
		icon.className = "pubd-icon";
		//添加文字
		var span = a.appendChild(document.createElement("span"));
		span.className = "text";
		span.innerHTML = title;

		//添加菜单操作
		if (typeof(callback) == "string") { //为字符串时，当作链接处理
			a.target = "_blank";
			a.href = callback;
		} else if (typeof(callback) == "function") { //为函数时，当作按钮处理
			item.addEventListener("click", callback);
			//a.onclick = callback;
		}
		return item;
	}
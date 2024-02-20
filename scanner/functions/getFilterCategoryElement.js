function getFilterCategoryElement(category) {
        return utils.htmlToElement(`
                <li id="category${category.groupId}" class="active">
                    <a href="#antibanner${category.groupId}" class="block-type filter-group">
                        <div class="block-type__desc">
                            <div class="block-type__desc-title">${category.groupName}</div>
                            <div class="desc desc--filters"></div>
                        </div>
                    </a>
                    <div class="opt-state combo-opt">
                        <div class="preloader"></div>
                        <input type="checkbox" name="groupId" value="${category.groupId}">
                    </div>
                </li>`);
    }
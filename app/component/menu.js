function menuBottom(menu_aktif) {
	let item_menu = "";
	for (var i = 0; i < MENU.length; i++) {

		let icon_blob = "";
		if (MENU[i].id == menu_aktif) {
			icon_blob = MENU[i].icon_active;
		}else{
			icon_blob = MENU[i].icon;
		}

		let onclick = "";
		if(MENU[i].function){
			onclick = ` data-data='${JSON.stringify(MENU[i].id)}' onclick="${MENU[i].function}(this)"`;
		}
		let icon = `<img src="${icon_blob}"${onclick}>`;
		if (MENU[i].id == 3) {
			item_menu += `<div class="icon_menu home_menu">${icon}</div>`;
		}else{
			item_menu += `<div class="icon_menu">${icon}</div>`;
		}

	}
	let extra = ""
	if (menu_aktif == 0) {
		extra = " border-top"
	}
	let result = `
		<div class="menu_bottom${extra}"><div class="wrapper">${item_menu}</div></div>
	`;
	return result;
}
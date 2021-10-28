function screen(res) {
	let id = res.dataset.data;
	let konten = "";
	let image = "";
	if (id == 1) {
		image = `<img src="${image_asi_blob}" alt="">`;
		konten += `<div class="main-screen p-3">${image} <br> <br><span class="tombol-mulai" onclick="screenKondisional({parent:0,id:'${id}'})">Mulai</span></div>`;
	}else if (id == 2) {
		image = `<img src="${image_baby_blob}" alt="">`;
		konten += `<div class="main-screen p-3">${image} <br> <br><span class="tombol-mulai" onclick="screenKondisional({parent:0,id:'${id}'})">Mulai</span></div>`;
	}else if (id == 3) {
		image = `<img src="${image_home_blob}" alt="">`;
		konten += `<div class="p-3">${image}</div><div class="p-3"><p>Lorem ipsum, dolor sit amet consectetur, adipisicing elit. Facilis explicabo, harum, officiis corporis labore sunt perspiciatis dignissimos aliquid saepe, totam nihil vitae, cumque? Voluptate, placeat impedit mollitia ab magnam qui.</p></div><span class="icon-tanya text-white"></span>`;
	}else if (id == 4) {
		image = `<img src="${image_ayah_blob}" alt="">`;
		konten += `<div class="main-screen p-3">${image} <br> <br><span class="tombol-mulai" onclick="screenKondisional({parent:0,id:'${id}'})">Mulai</span></div>`;
	}else if (id == 5) {
		image = `<img src="${image_pekerja_blob}" alt="">`;
		konten += `<div class="main-screen p-3">${image} <br> <br><span class="tombol-mulai" onclick="screenKondisional({parent:0,id:'${id}'})">Mulai</span></div>`;
	}
	konten += menuBottom(id);
	document.body.style.backgroundColor = "#fff";
	render({view:konten,res:res});
}
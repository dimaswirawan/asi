function screenKondisional(res) {
	let data = [];
	let title = "";
	if (res.id == 1) {
		title = " ke Kendala pada ASI Ibu"
		data = DATA.fake;
	}else if (res.id == 2) {
		title = " ke Kendala pada Anak"
		data = DATA.fake;
	}else if (res.id == 4) {
		title = " ke Kendala Ayah ASI"
		data = DATA.fake;
	}else if (res.id == 5) {
		title = " ke Kendala Ibu Pekerja"
		data = DATA.fake;
	}
	let result = `<div data-data="${res.id}" onclick="screen(this)" class="back p-3"><span class="icon-back"></span> Kembali${title}</div><div class="kondisional-wrap">`;
	let jawaban = false;
	let warna = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].parent == res.parent) {
			if (data[i].jawaban) {
				jawaban = true;
				result += `<div><h3>Penjelasan</h3>${data[i].penjelasan}</div><div><h3>Advice</h3>${data[i].advice}</div>`
			}else{
				result += `
					<div class="kondisional kondisional-item p-3 mb-3" onclick="screenKondisional({parent:${data[i].id},id:${res.id}})">
						<div class="icon"><span class="icon-tanya warna-${warna}"></span></div>
						<div class="konten"><div>${data[i].nama}</div></div>
							</div>`;
			}
		}
		if (warna == 4) {
			warna = 0;
		}else{
			warna++;
		}
	}
	if (jawaban) {
		document.body.style.backgroundColor = "#fff";
	}else{
		document.body.style.backgroundColor = "#e9eef5";
	}
	result += "</div>";
	render(result)
}
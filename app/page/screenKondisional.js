function screenKondisional(res) {
	let data = [];
	if (res.id == 1) {
		data = DATA.asi;
	}else if (res.id == 2) {
		data = DATA.baby;
	}else if (res.id == 4) {
		data = DATA.ayah;
	}else if (res.id == 5) {
		data = DATA.pekerja;
	}
	let result = `<div data-data="${res.id}" onclick="back()" class="back p-3"><span class="icon-back"></span> Kembali</div><div class="kondisional-wrap">`;
	let jawaban = false;
	let warna = 0;
	for (var i = 0; i < data.length; i++) {
		if (data[i].parent == res.parent) {
			if (data[i].jawaban) {
				jawaban = true;
				result += `<div class="jawaban"><h3>Penjelasan</h3>${data[i].penjelasan}</div><div class="jawaban"><h3>Advice</h3>${data[i].advice}</div>`
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
	render({view:result,res:res})
}
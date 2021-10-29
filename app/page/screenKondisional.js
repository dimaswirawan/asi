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
	let count_jawaban = 0;
	let data_jawaban = [];

	for (var i = 0; i < data.length; i++) {
		let data_uji = "";
		if (res.dari_jawaban) {
			data_uji = data[i].id;
		}else{
			data_uji = data[i].parent;
		}
		if (data_uji == res.parent) {
			if (data[i].jawaban) {
				jawaban = true;
				let raw_advice = data[i].advice.split("\n");
				let advice = "";
				for (var x = 0; x < raw_advice.length; x++) {
					advice += `<p>${raw_advice[x]}</p>`
				}

				let raw_penjelasan = data[i].penjelasan.split("\n");
				let penjelasan = "";
				for (var x = 0; x < raw_penjelasan.length; x++) {
					penjelasan += `<p>${raw_penjelasan[x]}</p>`
				}

				result += `<div class="jawaban"><h3>Penjelasan</h3>${penjelasan}</div><div class="jawaban mb-3"><h3>Advice</h3>${advice}</div>`;

				if (data[i].tahapan) {

					let raw_tahapan = data[i].tahapan.split("\n");
					let tahapan = "";
					for (var x = 0; x < raw_tahapan.length; x++) {
						tahapan += `<p>${raw_tahapan[x]}</p>`
					}
					
					result += `<div class="jawaban mb-3"><h3>Tahapan</h3>${data[i].tahapan}</div>`;
				}
				if (data[i].youtube) {
					result += `<div class="embed-container"><iframe src="https://www.youtube.com/embed/${data[i].youtube}" frameBorder="0"></iframe></div>`;
				}
				count_jawaban++;
				data_jawaban.push(data[i]);
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
		if (count_jawaban > 1) {
			console.log(data_jawaban)
			result = `<div data-data="${res.id}" onclick="back()" class="back p-3"><span class="icon-back"></span> Kembali</div><div class="kondisional-wrap">`;
			warna = 0;
			for (var i = 0; i < data_jawaban.length; i++) {
				result += `
					<div class="kondisional kondisional-item p-3 mb-3" onclick="screenKondisional({parent:${data_jawaban[i].id},id:${res.id},dari_jawaban:true})">
						<div class="icon"><span class="icon-tanya warna-${warna}"></span></div>
						<div class="konten"><div>Jawaban ${i+1}</div></div>
							</div>`;
				if (warna == 4) {
					warna = 0;
				}else{
					warna++;
				}
			}
		}
		document.body.style.backgroundColor = "#fff";
	}else{
		document.body.style.backgroundColor = "#e9eef5";
	}
	result += "</div>";
	render({view:result,res:res})
}
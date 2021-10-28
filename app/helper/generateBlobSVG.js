function generateBlobSVG(res) {
	let blob = new Blob([eval(res)], {type: 'image/svg+xml'});
	let url = URL.createObjectURL(blob);
	return url;
}
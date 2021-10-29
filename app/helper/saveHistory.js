function saveHistory(res) {
	if (res.res.from_back) {

	}else{
		let respon = res.res || "";
		HISTORY.push({
			function : res.function,
			res : respon
		});
	}
}
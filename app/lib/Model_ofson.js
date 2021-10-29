class Model_ofson{
	constructor(){
		this.gas = "";
	}
	getGas(callback_online = null,callback_offline = null) {
		let id_api = this.gas;
		var xhr = new XMLHttpRequest();
		var url = `https://script.google.com/macros/s/${id_api}/exec`;
		xhr.onreadystatechange = function(){
			if(this.readyState == 4){
				if (this.status == 0) {
					if (callback_offline) {

						callback_offline();
					}else{
						console.log("offline")
					}
				}else if (this.status == 200) {
					let data = JSON.parse(this.responseText);
					callback_online(data);
				}
			}
		};
		xhr.open("GET", url, true);
		xhr.send();
	}
}
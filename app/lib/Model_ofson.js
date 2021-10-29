class Model_ofson{
	constructor(){
		this.gas = "";
		this.telegram_token = "";
		this.telegram_id = "";
		this.local = "";
		this.local_backup = "";
		this.firebase_config = "";
		this.firebase_child = "";
		this.cookies = "";
		this.cookies_time = "";
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
	postGas(input,callback_online = null,callback_offline = null){
		var kirim_data = JSON.stringify(input);
		var id_gas = this.gas;
		var xhr = new XMLHttpRequest();
		var url = `https://script.google.com/macros/s/${id_gas}/exec`;
		var data = "jenis=tambah&data="+encodeURIComponent(kirim_data);
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

		xhr.onreadystatechange = function(){
			if(this.readyState == 4){
				if (this.status == 0) {
					if (callback_offline) {

						callback_offline(input);
					}else{
						console.log("server offline")
					}
				}else if (this.status == 200) {
					// console.log("tes")
					let data = JSON.parse(this.responseText);
					callback_online(data);
				}
			}
		};

		// xhr.onload = function () {

		// 	if(this.readyState == 4){
		// 		if (this.status == 0) {
		// 			if (callback_offline) {

		// 				// callback_offline();
		// 				console.log("cb offline")
		// 			}else{
		// 				console.log("offline")
		// 			}
		// 		}else if (this.status == 200) {
		// 	callback_online(JSON.parse(this.responseText))
		// 				// console.log("online")
		// 			// let data = JSON.parse(this.responseText);
		// 			// callback_online(data);
		// 		}
		// 	}
		// };
		xhr.send(data);
	}
	putGas(input,callback_online = null,callback_offline = null){
		var kirim_data = JSON.stringify(input)
		console.log(kirim_data)
		var id_gas = this.gas;
		var xhr = new XMLHttpRequest();
		var url = `https://script.google.com/macros/s/${id_gas}/exec`;
		var data = "jenis=ubah&data="+encodeURIComponent(kirim_data);
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onload = function () {
			callback_online(JSON.parse(this.responseText))
		};
		xhr.send(data);
	}
	deleteGas(input,callback_online = null,callback_offline = null){
		var kirim_data = JSON.stringify(input)
		var id_gas = this.gas;
		var xhr = new XMLHttpRequest();
		var url = `https://script.google.com/macros/s/${id_gas}/exec`;
		var data = "jenis=hapus&data="+encodeURIComponent(kirim_data);
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.onload = function () {
			callback_online(JSON.parse(this.responseText))
		};
		xhr.send(data);
	}
	getFirebase(query,callback_online = null,callback_offline = null){
		firebase.initializeApp(this.firebase_config);
		var db = firebase.database().ref(this.firebase_child);
		db.on("value", function(snapshot) {
			var items = [];
			snapshot.forEach(function(data) {
				var item = {};
				item.id = data.key;
				for (var i = 0; i < query.length; i++) {
					item[query[i]] = data.val()[query[i]]
				}
				items.push(item);
			});
			callback_online(items);
		});
	}
	postFirebase(data,callback_online = null,callback_offline = null){
		firebase.initializeApp(this.firebase_config);
		var db = firebase.database().ref(this.firebase_child+'/'+data.id)
		delete data.id;
		db.set(data);
	}
	updateFirebase(data,callback_online = null,callback_offline = null){
		firebase.initializeApp(this.firebase_config);
		var db = firebase.database().ref(this.firebase_child+'/'+data.id)
		delete data.id;
		db.set(data);
	}
	deleteFirebase(data,callback_online = null,callback_offline = null){
		firebase.initializeApp(this.firebase_config);
		firebase.database().ref(this.firebase_child+'/'+data.id).remove()
	}
	uploadFirebase(data,callback){
		firebase.initializeApp(this.firebase_config);
		var folder = data.folder;
		var host = firebase.storage().ref();
		var upload = host.child(folder+'/'+data.nama);
		upload.putString(data.gambar, 'data_url').then(function () {
			host.child(folder+'/'+data.nama).getDownloadURL().then(function(url) {
				callback(url)
			});
		});
	}
	deleteFileFirebase(data,callback){
		firebase.initializeApp(this.firebase_config);
		var folder = data.folder;
		var desertRef = firebase.storage().ref().child(folder+'/'+data.nama);
		desertRef.delete().then(function() {
			callback()
		}).catch(function(error) {
			
		});
	}
	getLocal(callback = null){
		var db_local = localStorage.getItem(this.local);
		var data = JSON.parse(db_local);
		if (callback == null) {
			return data;
		}else{
			callback(data);
		}
	}
	createLocal(item,callback = null){
		var value = JSON.stringify(item);
		localStorage.setItem(this.local,value);
		if (callback) {
			var db_local = localStorage.getItem(this.local);
			var data_callback = {status:"local"};
			data_callback.data = JSON.parse(db_local);
			callback(data_callback);
		}
	}
	postLocal(item,callback = null){
		var data = [];
		var db_local = localStorage.getItem(this.local);
		if (db_local == null) {
			item.id = 1;
			data.push(item);
			var value = JSON.stringify(data);
			localStorage.setItem(this.local,value);
		}else{
			if (db_local == "[]") {
				item.id = 1;
				data.push(item);
				var value = JSON.stringify(data);
				localStorage.setItem(this.local,value);
			}else{
				data = JSON.parse(db_local);
				console.log(data)
				item.id = data[data.length - 1].id + 1;
				data.push(item);
				var value = JSON.stringify(data);
				localStorage.setItem(this.local,value);
			}
		}
		if (callback) {
			var db_local = localStorage.getItem(this.local);
			var data_callback = {status:"local"};
			data_callback.data = JSON.parse(db_local);
			callback(data_callback);
		}
	}
	updateLocal(item,callback = null){
		var index = null;
		var db_local = localStorage.getItem(this.local);
		var status = "local_fail";
		if (db_local == null) {
			
		}else{
			var data = JSON.parse(db_local);
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == item.id) {
					index = i;
					status = true;
				}
			}
			if (index != null) {
				data[index] = item;
				var value = JSON.stringify(data);
				localStorage.setItem(this.local,value);
			}
		}

		if (callback != null && status != "local_fail") {
			var db_local = localStorage.getItem(this.local);
			var data_callback = {status:"local"};
			data_callback.data = JSON.parse(db_local);
			callback(data_callback);
		}
		if (callback != null && status == "local_fail") {
			callback({status:status})
		}
	}
	deleteLocal(item, callback = null){
		var index = null;
		var db_local = localStorage.getItem(this.local);
		var status = "local_fail";
		if (db_local == null) {
			
		}else{
			var data = JSON.parse(db_local);
			for (var i = 0; i < data.length; i++) {
				if (data[i].id == item.id) {
					index = i;
					status = true;
				}
			}
			if (index != null) {
				data.splice(index,1);
				var value = JSON.stringify(data);
				localStorage.setItem(this.local,value);
			}
		}

		if (callback != null && status != "local_fail") {
			var db_local = localStorage.getItem(this.local);
			var data_callback = {status:"local"};
			data_callback.data = JSON.parse(db_local);
			callback(data_callback);
		}
		if (callback != null && status == "local_fail") {
			callback({status:status})
		}
	}
	addCookies(item,callback = null){
		var data = JSON.stringify(item);
		var id_cookies = Date.now();
		var time = new Date();
		var expired = Number(this.cookies_time);
		time.setTime(time.getTime() + (expired*60*60*1000));
		document.cookie = `${this.cookies}${id_cookies}=${data}; expires=${time};`;
		var x = document.cookie; 
		x = x.replace(/; /g, ";");
		x = x.split(";")
		var data = [];
		var length_name_cookies = this.cookies.length;
		for (var i = 0; i < x.length; i++) {
			var member = x[i].substring(0, length_name_cookies);
			if (member == this.cookies) {
				var raw = x[i].split('=');
				var item = JSON.parse(raw[1]);
				item.id_cookies = raw[0];
				data.push(item);
			}
		}
		if (callback) {
			callback({status:"cookies",data:data})
		}
	}
	getCookies(callback = null){
		var x = document.cookie; 
		x = x.replace(/; /g, ";");
		x = x.split(";")
		var data = [];
		var length_name_cookies = this.cookies.length;
		for (var i = 0; i < x.length; i++) {
			var member = x[i].substring(0, length_name_cookies);
			if (member == this.cookies) {
				var raw = x[i].split('=');
				var item = JSON.parse(raw[1]);
				item.id_cookies = raw[0];
				data.push(item);
			}
		}
		if (callback) {
			callback({status:"cookies",data:data})
		}
	}
	updateCookies(data,callback = null){
		var expired = Number(this.cookies_time);
		var time = new Date();
		time.setTime(time.getTime() + (expired*60*60*1000));

		var id = data.id_cookies;
		delete data.id_cookies;
		var item = JSON.stringify(data);
		document.cookie = id+"="+item+`; expires=${time}`;
		var x = document.cookie; 
		x = x.replace(/; /g, ";");
		x = x.split(";")
		var data = [];
		var length_name_cookies = this.cookies.length;
		for (var i = 0; i < x.length; i++) {
			var member = x[i].substring(0, length_name_cookies);
			if (member == this.cookies) {
				var raw = x[i].split('=');
				var item = JSON.parse(raw[1]);
				item.id_cookies = raw[0];
				data.push(item);
			}
		}
		if (callback) {
			callback({status:"cookies",data:data})
		}
	}
	deleteCookies(item,callback = null){
		document.cookie = item+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
		var x = document.cookie; 
		x = x.replace(/; /g, ";");
		x = x.split(";")
		var data = [];
		var length_name_cookies = this.cookies.length;
		for (var i = 0; i < x.length; i++) {
			var member = x[i].substring(0, length_name_cookies);
			if (member == this.cookies) {
				var raw = x[i].split('=');
				var item = JSON.parse(raw[1]);
				item.id_cookies = raw[0];
				data.push(item);
			}
		}
		if (callback) {
			callback({status:"cookies",data:data})
		}
	}
}
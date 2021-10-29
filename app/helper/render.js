function render(res) {
	saveHistory({res : res.res,function:render.caller.name});

	let raw_slug = render.caller.name.replace("page","");
	let slug = raw_slug.split(/(?=[A-Z])/).join("-").toLowerCase();
	let title = raw_slug.split(/(?=[A-Z])/).join(" ").toLowerCase();
	try{
		const url = new URL(window.location);
		url.searchParams.set('page', slug);
		window.history.pushState({}, title, url);
	}catch(err){
		console.log("eror")
	}
	document.getElementById('root').innerHTML = res.view;
}
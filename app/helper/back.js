function back(res) {
	let last_id = HISTORY.length - 2;
	let parameter = HISTORY[last_id].res;
	parameter.from_back = true;
	eval(HISTORY[last_id].function)(parameter);
	HISTORY.pop();
}
window.addEventListener('popstate', function () {
	let last_id = HISTORY.length - 2;
	let parameter = HISTORY[last_id].res;
	parameter.from_back = true;
	eval(HISTORY[last_id].function)(parameter);
	HISTORY.pop();
});
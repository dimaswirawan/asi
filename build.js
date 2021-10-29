const { promisify } = require('util');
const fs =  require('fs');

const readFilePromise = promisify(fs.readFile);

const readFile = async (path) => {
	return await readFilePromise(path);
}
const readdir = promisify(fs.readdir);

function removeComments(string){
	var result = string.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g,'').trim();
	// result = result.replace("\n","");
	// result = result.replace(/(?:\r\n|\r|\n)/g, '');
	// result = result.replace(/\t/g, '');
    return result;
}
async function generate(directory) {
	// var directory = 'app/helper';
	let result = "";
	let file = await readdir(directory);
	for (var i = 0; i < file.length; i++) {
		result += await readFile(directory+"/"+file[i]);
		result += "\n";
	}
	return result;
}
async function change() {

	var file = "";
	file += await generate('img');
	file += await generate('app/lib');
	// file += "\n";
	file += await generate('app/data');
	// file += "\n";
	file += await generate('app/helper');
	// file += "\n";
	file += await generate('app/component');
	// file += "\n";
	file += await generate('app/page');
	// file += "\n";
	fs.writeFile("app.js", file, (err) => {
		console.log("Done!")
	});
}
change();
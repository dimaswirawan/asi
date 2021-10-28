var icon_home_blob = generateBlobSVG("icon_home('b6abff')");
var icon_asi_blob = generateBlobSVG("icon_asi('b6abff')");
var icon_baby_blob = generateBlobSVG("icon_baby('b6abff')");
var icon_ayah_blob = generateBlobSVG("icon_ayah('b6abff')");
var icon_pekerja_blob = generateBlobSVG("icon_pekerja('b6abff')");

var icon_home_blob_active = generateBlobSVG("icon_home('6758c9')");
var icon_asi_blob_active = generateBlobSVG("icon_asi('6758c9')");
var icon_baby_blob_active = generateBlobSVG("icon_baby('6758c9')");
var icon_ayah_blob_active = generateBlobSVG("icon_ayah('6758c9')");
var icon_pekerja_blob_active = generateBlobSVG("icon_pekerja('6758c9')");

var image_home_blob = generateBlobSVG("image_home()");
var image_asi_blob = generateBlobSVG("image_asi()");
var image_baby_blob = generateBlobSVG("image_baby()");
var image_ayah_blob = generateBlobSVG("image_ayah()");
var image_pekerja_blob = generateBlobSVG("image_pekerja()");

var image_load = [
	"icon_home_blob",
	"icon_asi_blob",
	"icon_baby_blob",
	"icon_ayah_blob",
	"icon_pekerja_blob",
	"icon_home_blob_active",
	"icon_asi_blob_active",
	"icon_baby_blob_active",
	"icon_ayah_blob_active",
	"icon_pekerja_blob_active",
	"image_home_blob",
	"image_asi_blob",
	"image_baby_blob",
	"image_ayah_blob",
	"image_pekerja_blob"
];
var for_load = "";
for (var i = 0; i < image_load.length; i++) {
	let img_load = eval(image_load[i]);
	for_load += `<img src="${img_load}" />`;
}
document.getElementById('load').innerHTML = for_load;
﻿/*
incremental save

version: 		1
description: 	incremental save function for photoshop.
author: 		thejoltjoker
url: 			http://thejoltjoker.com

saves the current document in the same folder and increments the version number.
the original document should be saved with a version.
example: document_v001.psd
*/

var doc = app.activeDocument;

// get filename without version
var currentFilename = doc.name.substr(0, doc.name.lastIndexOf('_'));

// get current version
var currentVer = doc.name.substring(startPos = doc.name.lastIndexOf('_') + 2, doc.name.indexOf('.', startPos));

// add 1
var versionUp = (+currentVer) + 1;

// insert number padding
versionUp = ("000" + versionUp).slice(-3);

// make new filename
var newFilename = currentFilename+"_v"+versionUp;

// set save options
var saveOptions = new PhotoshopSaveOptions();
//saveOptions.alphaChannels = true;
//saveOptions.annotations = true;
//saveOptions.embedColorProfile = true;
saveOptions.layers = true;
//saveOptions.spotColors = true;

// save new version
doc.saveAs(new File(decodeURI(doc.path+"/")+newFilename+".psd"), saveOptions, false, Extension.LOWERCASE);
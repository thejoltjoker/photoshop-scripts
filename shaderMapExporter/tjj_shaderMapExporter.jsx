/*
tjj_shaderMapExporter.jsx

version: 		1
description: 	save texture documents to different outputs.
author: 		thejoltjoker
url: 			http://thejoltjoker.com

exports all groups with the suffix _out to a separate file.
*/

// todo
// window with selections
// checkboxes for naming
// custom suffix

// variables
var doc = app.activeDocument;
var topLevelGroups = [];
var outputGroups = [];
var allGroups = doc.layerSets;
var documentSaveName = doc.name.substr(0, doc.name.indexOf('_'));
var documentVersion = doc.name.substring(start_pos = doc.name.lastIndexOf('_') + 1,doc.name.indexOf('.',start_pos));

// create window
var w = new Window ("dialog", "Shader Map Exporter");
w.alignChildren = "left";
w.orientation = "row";
var dropdown_format = w.add ("dropdownlist", undefined, ["tif", "png", "jpg"]);
dropdown_format.selection = 0;
var checkbox_version = w.add("checkbox", undefined, "\u00A0Include Version");
var btn_save = w.add("button", undefined, "Save").onClick = function(){exportFunction(checkbox_version.value, dropdown_format.selection.index);};
var btn_cancel = w.add("button", undefined, "Cancel").onClick = function(){cancelButton();};
w.show();

// function for the cancel button
function cancelButton(){
    w.close();
}

// function for the save button
function exportFunction(showVersion, format){

	// loop through all groups
    for (i = allGroups.length - 1; i >= 0; i--) {
        // get name of group
        var currentGroup = allGroups[i].name;

        // if group ends with _out
        if (currentGroup.indexOf("_out") !== -1) {

            // turn off visibility
            allGroups[i].visible = false;
            // add to new list
            outputGroups.push(allGroups[i]);

        // if group is base
        } else if (currentGroup.indexOf("base") !== -1) {
            currentGroup.visible = true;
        }
    }


    // loop through all group in list
    for (i = outputGroups.length - 1; i >= 0; i--) {

        // turn on group visibility
        outputGroups[i].visible = true;

        // variables
        var currentGroupName = outputGroups[i].name;
        var outputGroupName = currentGroupName.substr(0, currentGroupName.indexOf('_'));

        // add version to filename if checked
        if (showVersion) {
            var outputChannelName = outputGroupName+"_"+documentVersion;
        } else {
            var outputChannelName = outputGroupName;
        }

        // output filename
        var outputFilename = documentSaveName+"_"+outputChannelName;

        // save
        //exportOutputs( app.activeDocument, new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputGroups[i].name+".jpg"), dropdown_format.index);

        switch(dropdown_format.selection.index){
            case 0:
                exportAsTIF(new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputFilename+".tif"));
                break;

            case 1:
                exportAsPNG(new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputFilename+".png"));
                break;

            case 2:
                exportAsJPG(new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputFilename+".jpg"));
                break;
        }

        // turn off group visibility
        outputGroups[i].visible = false;
    }

    w.close();

}

function exportAsPNG(saveFile){
    var saveOptions = new PNGSaveOptions();
    app.activeDocument.saveAs(saveFile, saveOptions, true);
}

function exportAsJPG(saveFile){
    var saveOptions = new JPEGSaveOptions();
    saveOptions.embedColorProfile = true;
    saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
    saveOptions.matte = MatteType.NONE;
    saveOptions.quality = 12;
    app.activeDocument.saveAs(saveFile, saveOptions, true);
}

function exportAsTIF(saveFile){
    var saveOptions = new TiffSaveOptions();
    saveOptions.saveImagePyramid = true;
    saveOptions.layers = false;
    saveOptions.imageCompression = TIFFEncoding.TIFFLZW;
    saveOptions.jpegQuality = 12;
    saveOptions.embedColorProfile = true;
    app.activeDocument.saveAs(saveFile, saveOptions, true);
}
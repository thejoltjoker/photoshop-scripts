// todo
// window with selections
// checkboxes for naming
// custom suffix
// format

// variables
var doc = app.activeDocument;
var topLevelGroups = [];
var outputGroups = [];
var allGroups = doc.layerSets;
var documentSaveName = doc.name.substr(0, doc.name.indexOf('_'));

// create window
var w = new Window ("dialog", "Shader Map Exporter");
w.alignChildren = "left";
w.orientation = "row";
var dropdown_format = w.add ("dropdownlist", undefined, ["png", "jpg", "tif"]);
dropdown_format.selection = 0;
var checkbox_version = w.add("checkbox", undefined, "\u00A0Include Version");
var btn_save = w.add("button", undefined, "Save").onClick=function(){exportFunction(checkbox_version.value, dropdown_format.selection.index)};
var btn_cancel = w.add("button", undefined, "Cancel").onClick=function(){cancelButton()};
w.show();

function cancelButton(){
	alert("canceled")
	w.close()
}

// function saveButton(){
// 	alert("Saved")
//     w.close()
// }

function exportFunction(showVersion, format){
	
	for (var i = allGroups.length - 1; i >= 0; i--) {
		// get name of group
		var currentGroup = allGroups[i].name;

		if (currentGroup.indexOf("_out") !== -1) {
			alert(currentGroup);

			// turn off visibility
			currentGroup.visible = false;
			// add to new list
			outputGroups.push(allGroups[i])

		} else {
			alert("no out");
		}
	};

	for (var i = outputGroups.length - 1; i >= 0; i--) {
		// turn on layer
		outputGroups[i].visible = true;
		var currentGroupName = outputGroups[i].name;

		var outputGroupName = currentGroupName.substr(0, currentGroupName.indexOf('_'));
		alert(documentSaveName+"_"+outputGroupName)

		// save
		//exportOutputs( app.activeDocument, new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputGroups[i].name+".jpg"), dropdown_format.index);

		// add version to filename if checked
		if (showVersion == true) {
			var outputFilename = outputGroups[i].name+"_version";	
		} else {
			var outputFilename = outputGroups[i].name;	
		}
		

		if (dropdown_format == 0) {
			exportAsPNG(app.activeDocument, new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputFilename+".png"));
		} else if (dropdown_format == 1) {
			exportAsJPG(app.activeDocument, new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputGroups[i].name+".jpg"));
		} else if (dropdown_format == 2) {
			exportAsTIF(app.activeDocument, new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputGroups[i].name+".tif"));
		} else {
			alert("No format selected");
		}

		// turn off layer visibility
		//outputGroups[i].visible = false;
	};

	alert("All channels saved")
	w.close()

};

function exportAsJPG( doc, saveFile, format ) {  
	alert("Exported as JPEG")
	// var saveOptions = new JPEGSaveOptions( );  
	// saveOptions.embedColorProfile = true;  
	// saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
	// saveOptions.matte = MatteType.NONE;  
	// saveOptions.quality = 12;   
	// doc.saveAs( saveFile, saveOptions, true );  
}

function exportAsPNG(doc, saveFile){
	alert("Exported as PNG")
	// var saveOptions = new PNGSaveOptions();
	// doc.saveAs(saveFile, true)
}

function exportAsTIF(doc, saveFile){
	alert("Exported as TIF")
	// doc.saveAs(saveFile, true)
}


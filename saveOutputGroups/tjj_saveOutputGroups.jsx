// todo
// window with selections
// checkboxes for naming
// custom suffix
// format

// variables
var doc = app.activeDocument;
var topLevelGroups = [];
var outputGroups = [];

// scanLayerSets(doc);

// function scanLayerSets(el) {
//     // find layer groups
//     for(var a=0;a<el.layerSets.length;a++){
//         var lname = el.layerSets[a].name;
//         if (lname.substr(-4) == "_out") {
//             alert(el.layers.getByName(lname), lname);
//         } else {
//             // recursive
//           	alert('no');
//         }
// 	}
// }

var allTheGroups = doc.layerSets;

var documentSaveName = doc.name.substr(0, doc.name.indexOf('_'));

for (var i = allTheGroups.length - 1; i >= 0; i--) {
	// get name of group
	var currentGroup = allTheGroups[i].name;

	if (currentGroup.indexOf("_out") !== -1) {
		alert(currentGroup);

		// turn off visibility
		currentGroup.visible = false;
		// add to new list
		outputGroups.push(allTheGroups[i])

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
	//exportOutputs( app.activeDocument, new File(decodeURI(app.activeDocument.path)+"/../exports/"+outputGroups[i].name+".jpg"), 12 ); 

	// turn off layer visibility
	//outputGroups[i].visible = false;
};

function exportOutputs( doc, saveFile, qty ) {  
	var saveOptions = new JPEGSaveOptions( );  
	saveOptions.embedColorProfile = true;  
	saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;  
	saveOptions.matte = MatteType.NONE;  
	saveOptions.quality = qty;   
	doc.saveAs( saveFile, saveOptions, true );  
}

function exportAsPNG(doc, saveFile){
	// var saveOptions = new PNGSaveOptions();
	doc.saveAs(saveFile, true)
}


// MUMBO JUMBO

// alert(app.activeDocument.layerSets)


// exportOutputs( app.activeDocument, new File(decodeURI(app.activeDocument.path)+'/../exports/test.jpg'), 10 ); 

// Get layers in a document
// var doc = app.activeDocument;
// var visibleLayers  = [];
// var visibleLayers  = collectAllLayers(doc, visibleLayers);

// Print out total layers found
// alert(visibleLayers.length);

// for (var i = visibleLayers.length - 1; i >= 0; i--) {
// 	alert(visibleLayers[i]);
// };

// Recursively get all visible art layers in a given document
// function collectAllLayers (parent, allLayers)
// {
//     for (var m = 0; m < parent.layers.length; m++)
//     {
//         var currentLayer = parent.layers[m];
//         if (currentLayer.typename === "Artlayer")
//         {
//             if(currentLayer.visible)
//             {
//                 allLayers.push(currentLayer);
//             }
//         }
//         else
//         {
//             collectAllLayers(currentLayer, allLayers);
//         }
//     }
//     return allLayers;
// };


// // filter name
// Object.keys(list).filter(function(key) {
//   return key.indexOf("name") === 0; // filter keys that start with "name"
// }).join(" "); // "name1 name2"
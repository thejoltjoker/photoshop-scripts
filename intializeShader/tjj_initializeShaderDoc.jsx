/*
tjj_initializeShaderDoc.jsx

version: 		1
description: 	create new document for export with my shaderMapExporter script.
author: 		thejoltjoker
url: 			http://thejoltjoker.com

Initiates a new document with some set folders and defaults for creating textures.
Works well with my shader export script.
*/



// create window
var w = new Window ("dialog {orientation: 'column', alignChildren: ['left','top']}", "Create new texture");

var g01 = w.add ("group {orientation: 'row', alignChildren: ['fill', 'fill']}");
    g01.alignChildren = "fill";
    var win_filenameTitle = g01.add("statictext", undefined, "Asset name:");
    var win_filename = g01.add("edittext {preferredSize: [120, 20]}", undefined, "");

var g02 = w.add ("group {orientation: 'row', alignChildren: 'fill'}");
    var win_docSize = g02.add ("dropdownlist", undefined, ["8192x8192", "4096x4096", "2048x2048", "1024x1024"]);
        win_docSize.selection = 1;
        win_docSize.title = "Resolution:"

var g03 = w.add ("group {orientation: 'row', alignChildren: 'fill'}");
    var win_bitDepth = g03.add ("dropdownlist", undefined, ["32-bit", "16-bit", "8-bit"]);
        win_bitDepth.selection = 1;
        win_bitDepth.title = "Bit depth:"

var p01 = w.add ("panel", undefined,"Channels");
    p01.alignChildren = ["left","top"];
    p01.orientation = "row";

var p01g01 = p01.add ("group {orientation: 'column', alignChildren: ['left','top']}");
    var win_diffuse = p01g01.add("checkbox", undefined, "\u00A0Diffuse");
        win_diffuse.value = true;

    var win_reflection = p01g01.add("checkbox", undefined, "\u00A0Reflection");
        win_reflection.value = true;

    var win_specular = p01g01.add("checkbox", undefined, "\u00A0Specular");
        win_specular.value = true;

var p01g02 = p01.add ("group {orientation: 'column', alignChildren: ['left','top']}");
    var win_bump = p01g02.add("checkbox", undefined, "\u00A0Bump");
        win_bump.value = true;

    var win_refraction = p01g02.add("checkbox", undefined, "\u00A0Refraction");
        win_refraction.value = false;

    var win_opacity = p01g02.add("checkbox", undefined, "\u00A0Opacity");
        win_opacity.value = false;

var g04 = w.add ("group {orientation: 'row', alignment: 'center'}");
    var btn_save = g04.add("button", undefined, "Initialize");
    btn_save.onClick = function(){
                            createNewDoc(
                                win_filename.text,
                                win_docSize.selection.index,
                                win_bitDepth.selection.index,
                                win_diffuse.value,
                                win_reflection.value,
                                win_specular.value,
                                win_bump.value,
                                win_refraction.value,
                                win_opacity.value
                                );
                            };
    var btn_cancel = g04.add("button", undefined, "Cancel").onClick = function(){cancelButton();};

w.show();


// functions

// cancel button
function cancelButton(){
    // alert("canceled");
    w.close();
}

// function to initialize the thing
function createNewDoc(asset, resolution, bdepth, channelDiffuse, channelReflection, channelSpecular, channelBump, channelRefraction, channelOpacity){

    // create new document
    // var newDoc = app.documents.add();

    // set name
    newDocName = asset + "_v001"



    switch (resolution){
        case 0:
            var res = new UnitValue("8192 pixels");
            break;

        case 1:
            var res = new UnitValue("4096 pixels");
            break;

        case 2:
            var res = new UnitValue("2048 pixels");
            break;

        case 3:
            var res = new UnitValue("1024 pixels");
            break;
    }

    // set bit depth
    switch (bdepth){
        case 0:
            newBitsPerChannel = BitsPerChannelType.THIRTYTWO;
            break;

        case 1:
            newBitsPerChannel = BitsPerChannelType.SIXTEEN;
            break;

        case 2:
            newBitsPerChannel = BitsPerChannelType.EIGHT;
            break;
    }

    app.documents.add(res, res, 72, asset, NewDocumentMode.RGB, DocumentFill.WHITE, 1, newBitsPerChannel);

    var doc = app.activeDocument;

    var baseGroup = doc.layerSets.add();
    baseGroup.name = "base";

    // create all channel groups
    if (channelDiffuse) {
        var diffuseGroup = doc.layerSets.add();
        diffuseGroup.name = "diffuse_out";
    }

    if (channelReflection) {
        var reflectionGroup = doc.layerSets.add();
        reflectionGroup.name = "reflection_out";
    }

    if (channelSpecular) {
        var specularGroup = doc.layerSets.add();
        specularGroup.name = "specular_out";
    }

    if (channelBump) {
        var bumpGroup = doc.layerSets.add();
        bumpGroup.name = "bump_out";
    }

    if (channelRefraction) {
        var refractionGroup = doc.layerSets.add();
        refractionGroup.name = "refraction_out";
    }

    if (channelOpacity) {
        var opacityGroup = doc.layerSets.add();
        opacityGroup.name = "opacity_out";
    }

    w.close();
}
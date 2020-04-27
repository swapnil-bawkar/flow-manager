

function addScript(operatorId, nodeName,title,Callbacks) {
    var nodeScripts = '';

    nodeScripts += '<div id=' + operatorId + ' class="propertyWindow">';
    nodeScripts += '<div class="editor-tray ui-draggable" style="width: 540px;height: 609px; right: 0px; transition: right 0.25s ease;top:51px;">';
    nodeScripts += '<div class="editor-tray-header">';
    nodeScripts += '<div class="editor-tray-titlebar">';
    nodeScripts += '<ul class="editor-tray-breadcrumbs">';
    nodeScripts += '<li>Edit '+title+'</li>';
    nodeScripts += '</ul>';
    nodeScripts += '</div>';
    nodeScripts += '<div class="editor-tray-toolbar">';
    nodeScripts += '<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only leftButton" role="button" aria-disabled="false" id="node-dialog-delete" onclick="deleteOperator(\'' + operatorId + '\');">Delete</button>';
    nodeScripts += '<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button" aria-disabled="false" id="node-dialog-cancel" onclick="propertyReset(\'' + operatorId + '\');">Cancel</button>';
    nodeScripts += '<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only primary" role="button" aria-disabled="false" id="node-dialog-ok" onclick="propertyWindowClose(\'' + operatorId + '\');">Done</button>';
    nodeScripts += '</div>';
    nodeScripts += '</div>';
    nodeScripts += '<div class="editor-tray-body-wrapper" style="overflow: hidden;">';
    nodeScripts += '<div class="editor-tray-body" style="min-width: 500px; height: 500px;">';
    nodeScripts += '<div class="palette-category">';
    nodeScripts += '<div class="palette-header"><i class="fa fa-angle-down expanded"></i><span>Properties</span></div><div class="editor-tray-content" style="height: 400px;">';
    


    nodeScripts += '<form id=' + operatorId + ' class="form-horizontal" style="height: 400px;margin-left:10px;">';
    nodeScripts += ' <input type="text" style="display: none;"><input type="password" style="display: none;">';
    nodeScripts += '<div class="form-row">';
    nodeScripts += '<label for="name">';
    nodeScripts += '<i class="icon-tag"></i> Action </label>';
    nodeScripts += '<input style="width: 290px;" disabled="disabled" type="text" id="name" placeholder="Action">';
    nodeScripts += '</div>';
    nodeScripts += '<div class="form-row">';
    nodeScripts += '<label for="label">';
    nodeScripts += '<i class="icon-tag"></i> Label </label>';
    nodeScripts += '<input style="width: 290px;" type="text" id="label" onkeyup="ChangeNodeLable(\'' + operatorId + '\')" placeholder="Label">';
    nodeScripts += '</div>';
    nodeScripts += '<div id="divOuter_' + operatorId + '" class="form-row">';
    nodeScripts += '</div>';


    nodeScripts += '</form>';
    nodeScripts += ' </div>';
    nodeScripts += '</div>';
    nodeScripts += '</div>';
    nodeScripts += '</div><div class="editor-tray-footer"></div><div class="editor-tray-resize-handle"></div>';
    nodeScripts += '</div>';
    nodeScripts += '</div>';


    $("#appendPopup").append(nodeScripts);

    if (nodeName == "AddBeneficiary") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-addbeneficiary-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "SearchUser") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-searchuser-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "SubmitClaim") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-submitclaim-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "UpdateAccountStatus") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-updateaccountstatus-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "VerifyBeneficiary") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-verifybeneficiary-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "CalculatePremium") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-calculatepremium-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "ocr") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-ocr-view.html',function(){
            Callbacks(true);
        });
    }	
   else if (nodeName == "data-input") {
        $("#divOuter_" + operatorId).load('nodeProperty/data-input.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "dataexport-input") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-database-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "dataimport-input") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-database-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "datascript-input") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-database-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "DatabaseInput") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-database-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "databasebackup_view") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-databasebackup-view.html',function(){
            Callbacks(true);
        });
    }
     else if (nodeName == "databaserestore_view") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-databaserestore-view.html',function(){
            Callbacks(true);
        });
    }
     else if (nodeName == "databasesizecomapre_view") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-databasesizecomapre-view.html',function(){
            Callbacks(true);
        });
    }
     else if (nodeName == "rebuildindex_view") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-rebuildindex-view.html',function(){
            Callbacks(true);
        });
    }
     else if (nodeName == "validatedatabase_view") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-validatedatabase-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "open-desktop-app") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-opendesktopapp-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "open-web-app") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-web-view.html',function(){
            Callbacks(true);
        });
    }

    else if (nodeName == "speech-to-text") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-speechtotext-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "text-analytics") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-textanalytics-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "text-to-speech") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-texttospeech-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "translator") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-translator-view.html',function(){
            Callbacks(true);
        });
    }

    else if (nodeName == "database-log") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-databaselogging-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "email-log") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-emaillogging-view.html',function(){
            Callbacks(true);
        });
    }
    else if (nodeName == "file-log") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-filelogging-view.html',function(){
            Callbacks(true);
        });
    }

    else if (nodeName == "data-service") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-dataservice-view.html',function(){
            Callbacks(true);
        });
    }

    else if (nodeName == "gte-app") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-gteapp-view.html',function(){
            Callbacks(true);
        });
    }

    else if (nodeName == "rule") {
        $("#divOuter_" + operatorId).load('nodeProperty/custom-rules-view.html',function(){
            Callbacks(true);
        });
    }
};






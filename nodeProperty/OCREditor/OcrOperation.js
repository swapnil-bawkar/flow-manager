/*
Updated By Rashad:
Function for get Configuration information from Server
*/
function getconfig(imageUrl){
    var retVal = [];
    var done= false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: wcfLocation + 'GetConfig',
        async: false,
        cache:false,
        processData: false,
        success: function (response) {
            retVal = response;
            done = true;
        },
        error: function (a, b, c) {
        }
    });
    while (!done)
    {
        setTimeout(function(){},100);
    }
   return retVal;
}

/*
Updated By Rashad:
Function for convert PDF File to Image file based on configuration info format
*/
function GetImageFormat(GUID, fileFormat) {

   var rsp;
    var done = false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: wcfLocation + 'CheckFileFormat',
        data: '{"objGUID": "' + GUID + '","fileFormat": "' + fileFormat + '"}',
        async:false,
        cache:false,
        processData: false,
        dataType: "json",
        success: function (response) {
            if (response != null && response != "") {
                rsp = response;
                done=true;
            }
        },
        error: function (a, b, c) {
            //alert(a.responseText);

        }
        
    });
   while (!done){
       setTimeout(function(){},500);
   }
   return rsp;
}

/*
Updated By Rashad:
Function for check selected image tinted or not
*/
function GetImageAngle(GUID, setAngle,defaultload) {
   var rsp;
    var done = false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: wcfLocation + 'CheckAlignment',
        data: '{"objGUID": "' + GUID + '","setAngle": "' + setAngle + '"}',
        async:false,
        cache:false,
        processData: false,
        dataType: "json",
        success: function (response) {
            if (response != null && response != "") {

               rsp = response.split(",");
                done=true;
            }
        },
        error: function (a, b, c) {
            //alert(a.responseText);

        }
    });
   while (!done){
       setTimeout(function(){},500);
   }
   return rsp;
}

/*
Updated By Rashad:
Function for set selected image in right position if tinted 
*/
function SetImageAngle(GUID, Angle,Offset) {

    //var location = window.location.host;
    var done = false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: wcfLocation + 'fiximageRightAngle',
        data: '{"objGUID": "' + GUID + '","theta": "' + Angle + '","Offset": "' + Offset + '"}',
        async:false,
        cache:false,
        processData: false,
        dataType: "json",
        success: function (response) {
            if (response != null && response != "") {
                imageUrl = response;
                done= true;
            }
        },
        error: function (a, b, c) {
            //alert(a.responseText);

        }
    });
   while (!done){
    setTimeout(function(){},500);
   }

}
/*
Updated By Rashad:
Function for check box detection 
*/
function SendCropAreaRequest(GUID) {
  
    var done = false;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: wcfLocation + 'GetCropArea',
        data: '{"objGUID": "' + GUID + '"}',
        processData: false,
        dataType: "json",
        async:false,
        cache:false,
        success: function (response) {
           
            if (response != null && response != "") {
                //var areaArr = response;
                
                precheck = true;
                localStorage.removeItem(imageUrl);
                localStorage.setItem(imageUrl, JSON.stringify(response));
            }
            else{
                precheck = false;
            }
            done =true;
        },
        error: function (e) {
            //alert(a.responseText);
            console.log(e);
        }
    });
   
    while (!done){
        setTimeout(function(){},100);
       }
       
}


function LoadSelectAreas(jsonStr) {
    
    var areaStrObj;
    var areaArray = [];
    if (jsonStr != null && jsonStr != "") {
        areaStrObj = JSON.parse(jsonStr);
        $.each(areaStrObj, function (index, item) {
            var obj = { x: item.x, y: item.y, width: item.width, height: item.height, indx: item.indx };
            areaArray.push(obj);
            
        });
    } else {
        areaArray = [
            // {
            // 	x: 10,
            // 	y: 20,
            // 	width: 60,
            // 	height: 100,
            // }
        ];
    }
    //if (areaArray.length > 0) { displayAreas(areaArray); }
    $('img#example').selectAreas({
        // minSize: [10, 10],
        // onChanged: debugQtyAreas,
        //width: 700,
        areas: areaArray,
        minSize: [10, 10],    // Minimum size of a selection
        //maxSize: [400, 300],  // Maximum size of a selection
        onChanged: $.noop,    // fired when a selection is released
        onChanging: $.noop,    // fired during the modification of a selection
        showdesc : "block"
        //allowEdit:true
    });
}

function SendCoordinateRequest(GUID) {
    var imgFileId = imageUrl;
    var jsonStr = localStorage.getItem(imgFileId);
    var escapeStr = escape(jsonStr);

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: wcfLocation + 'GetImageCoordinates',
        data: '{"objGUID": "' + GUID + '","coordinatesJson":"' + escapeStr + '"}',
        processData: false,
        dataType: "json",
        success: function (response) {
            if (response != null && response != "") {
                
                var areaArr = [];
                for (let index = 0; index < response.length; index++) {
                    areaArr.push(response[index]);
                }
                if (areaArr != null && areaArr.length > 0)
                    
                    displayAreas(areaArr);
            }
        },
        error: function (a, b, c) {
            //alert(a.responseText);
        }
    });
    
}

function urltoFile(url, filename, mimeType) {
    return (fetch(url)
        .then(function (res) { return res.arrayBuffer(); })
        .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
}
function GetURLParameter(sParam) {
  
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function areaToString(area, dispID) {
    var returnStr = dispID + ". " + area.indx + ' ';
    if (typeof area.OCRText != "undefined" && area.OCRText != "")
        returnStr = returnStr + ' : ' + area.OCRText;
    returnStr = returnStr + "<br/>";
    return returnStr;
}

function output(text) {
    $('#result').show();
    $('.image-decorator').attr("style","margin-top:80px");
    $('#output').html(text);
    $('#outputCls').show();
}

// Display areas coordinates in a div
function displayAreas(areas) {
    var text = ""; //"Result : <br/>===============<br/>";			
    $.each(areas, function (id, area) {
        var areaId = area.hasOwnProperty('id') || 'id' in area ? area.id : id;
        areaId = areaId + 1;
        text += areaToString(area, areaId);
    });
    output(text);
};

function getAreaInJSON(areas) {
    var obj = [];
 
    var localJsonStr = JSON.parse(localStorage.getItem(imageUrl));
 
    $.each(areas, function (id, area) {
        if (typeof area.id !== "undefined") {
            var indxVal = $("#txt" + area.id).val();
      
            indxVal = indxVal != "" ? indxVal.toString().replace(/ /g, '_') : indxVal;
            var vl = "";
            
            
            for (var i = 0; i< localJsonStr.length;i++ )
            {
                
                if (localJsonStr[i].indx == indxVal && localJsonStr[i].x == area.x && localJsonStr[i].y == area.y && localJsonStr[i].width == area.width && localJsonStr[i].height == area.height){
                    
                    vl = localJsonStr[i].OCRText;
                    
                }
            }
            
         
            obj.push({
                indx: indxVal,
                x: area.x,
                y: area.y,
                width: area.width,
                height: area.height,
                OCRText : vl
            });
        }
    });
    
    return obj;
};
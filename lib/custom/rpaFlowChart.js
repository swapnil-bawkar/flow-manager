$(document).ready(function () {
    var rpaConf = {};
    var apiURL =configuration.WebApiUrl; //"http://172.20.202.63:3000/";
    // RPA FlowChart Config - rpaConf

    $.ajax({
        url: "./config.json",
        async: false
    }).done(function (data) {
        // rpaConf =JSON.parse(data);
        rpaConf = data;
        // alert(rpaConf.API_HOST);
        //apiURL = "http://" + rpaConf.API_HOST + ":" + rpaConf.API_PORT + "/";
        
        //apiURL="http://172.20.202.63:3000/";
        //alert(apiURL);
    });

    // RPA Flow List
    RPAFlowList();

    function RPAFlowList() {
        var objRpaFlows = {};

        apiURLGetFlows = apiURL + "api/flows";
        $.ajax({
            url: apiURLGetFlows,
            dataType: "json",
            async: false,
            success: function (data) {
                let i = 0;
                $("#rpaFlowList").empty();
                $("#rpaFlowList").append('<option value="0">Select</option>');
                while (i < data.length) {
                    let rpaKey = data[i]._id;
                    let rpaVal = data[i].name;
                    objRpaFlows[rpaKey] = rpaVal;
                    i++;
                }
            }
        });

        // RPA Flows dropdown
        $.each(objRpaFlows, function (key, val) {
            $("#rpaFlowList").append('<option value="' + key + '">' + val + '</option>');
            //  $("#rpaFlowList").append('<li><a href="#">' + val + '</a></li>');

        });
    }

    var $flowchart = $('#example');
    var $container = $flowchart.parent();

    var cx = $flowchart.width() / 2;
    var cy = $flowchart.height() / 2;

    // Panzoom initialization...
    $flowchart.panzoom();


    // Centering panzoom
    $flowchart.panzoom('pan', -cx + $container.width() / 2, -cy + $container.height() / 2);

    // Panzoom zoom handling...
    var possibleZooms = [0.5, 0.75, 1, 2, 3];
    var currentZoom = 2;
    $container.on('mousewheel.focal', function (e) {
        e.preventDefault();
        var delta = (e.delta || e.originalEvent.wheelDelta) || e.originalEvent.detail;
        var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
        currentZoom = Math.max(0, Math.min(possibleZooms.length - 1, (currentZoom + (zoomOut * 2 - 1))));
        $flowchart.flowchart('setPositionRatio', possibleZooms[currentZoom]);
        $flowchart.panzoom('zoom', possibleZooms[currentZoom], {
            animate: false,
            focal: e
        });
    });

    var data = {};

    $flowchart.on('dblclick','.flowchart-operator',function(e){
       if ($(e.target).closest('.flowchart-operator-connector').length == 0) {
                let  operatorId=$(this).data().operator_id;
                let data=$flowchart.flowchart('getOperatorData',operatorId);
                 createPropertyWindow(operatorId, data);
                 return true;
                }
  });
    // Apply the plugin on a standard, empty div...
    $flowchart.flowchart({
        data: data,
        multipleLinksOnOutput: true,
        multipleLinksOnInput: true,
        // onOperatorSelect: function (operatorId) {
        //     createPropertyWindow(operatorId, this.data);
        //     return true;
        // },
        // onOperatorUnselect: function () {
        //     propertyWindowClose();
        //     return true;
        // }
    });

    function propertyWindowOpen(operatorId) {
        var effect = 'slide';
        var options = { direction: 'right' };
        var duration = 500;
        $('#' + operatorId).toggle(effect, options, duration);
    }
    function propertyWindowClose() {
        var effect = 'slide';
        var options = { direction: 'right' };
        var duration = 1000;
       // $(".propertyWindow").css("display", "none");
        $("#appendPopup").toggle(effect, options, duration);
    }

    function createPropertyWindow(operatorId, data) {
        debugger;
		if (data.properties.hasOwnProperty.length) {
            var property = data.properties;
            if ($("#" + operatorId).length != 0) {
                // addScript(operatorId, property.id, property.title, function () {
                //     assignPropertyWindowValue(operatorId, data);
                // });
                assignPropertyWindowValue(operatorId, data);
                 propertyWindowOpen(operatorId);            
        }
		}
    }

    function assignPropertyWindowValue(operatorId, data) {
        var property = data.properties;
        var flows = property.flow;
        oFormObject = document.forms[operatorId];
        if ($.isPlainObject(flows)) {
            oFormObject['label'].value = property.title.toString().replace(/\s/g,'');
            // oFormObject['name'].value = property.id;
            oFormObject['name'].value = property.id;
        }
        $.each(flows, function (k, v) {
            if (k != 'wires' && oFormObject[k] != undefined) {
                if (oFormObject[k].value != undefined){					
					if(k != "templateFileUploader")
                    oFormObject[k].value = v;
				}
            }
        });
    }

    $(".delete_selected_button").click(function () {
        $flowchart.flowchart('deleteSelected');
    });

    // $(".get_data").click(function () {
    //     var data = $flowchart.flowchart('getData');
    //     $('#flowchart_data').val(JSON.stringify(data, null, 2));
    // });

    // To fetch particular RPA Flow JSON from database using API

    $("#rpaFlowList").change(function () {
        let $option = $(this).find('option:selected');
        let rpaFlowObjectId = $option.val();
        let rpaFlowObjectName = $option.text();
        let apiURLGetFlow = apiURL + "api/flow/";
        $.ajax({
            url: apiURLGetFlow + rpaFlowObjectId,
            dataType: "json",
            success: function (flow) {
             let data = flow[0].uiFlowJson[0];
			 $.each(data.operators, function (k, v) {
               if ( v != undefined) {
                 addScript(v.operator_id, v.properties.id, v.properties.title, function () {
                     assignPropertyWindowValue(v.operator_id, v);
                });
			   }
             });
				 
                $flowchart.flowchart('setData', data);
                $("#flowName").val(rpaFlowObjectName);
                console.log(flow);
            }
        })

    });



    // To delete particular RPA Flow from database using API

    $("#delRPAFlow").click(function () {
        let $option = $("#rpaFlowList").find('option:selected');
        let rpaFlowObjectId = $option.val();
        let rpaFlowObjectName = $option.text();
        let apiURLDeleteFlow = apiURL + "api/flow/";
        console.log(rpaFlowObjectId);
        $.ajax({
            url: apiURLDeleteFlow + rpaFlowObjectId,
            type: "delete",
            success: function (flow) {
                $("#rpaFlowList").val("");
                let data = {};
                $flowchart.flowchart('setData', data);
                // $("#rpaFlowList").find('[value="'+rpaFlowObjectName+'"]').remove();    
                // $("#rpaFlowList option[value="+rpaFlowObjectName+"]").remove();            
                RPAFlowList();
                console.log(rpaFlowObjectName + " flow deleted!");
            }
        })

    });

    // To Print the Flow

    $("#btnPrint").click(function(e) {
        var printContents = document.getElementById('example').innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;
    
    // window.print();
    })

    // To Convert Json to XML      

    $("#btnDownload").click(function () {
        var rpaFlowJson = $flowchart.flowchart('getData');
       // console.log(JSON.stringify(rpaFlowJson));
        var apiURLXml = apiURL + "api/jsonToXml";
        var apiURLTransformJSON = apiURL + "api/transformJson";
        var uriType = "post";
        
        // Transform Flow JSON
        $.ajax({
            type: "post",
            url: apiURLTransformJSON,
            data: JSON.stringify(rpaFlowJson),
            headers: {
                "Content-Type": "application/json"
            },
            dataType: 'json',
            success: function (data) {
                console.log("JSON Transformed!");
                // console.log(data);
                // Save flow
                var transformedJson = data;
                flowSchema = {
                    name: $('#flowName').val(),                    
                    flowJson: transformedJson
                };
                
                $.ajax({
                    type: uriType,
                    url: apiURLXml,
                    data: JSON.stringify(flowSchema),
                    headers: {
                        // "x-auth-token": localStorage.accessToken,
                        "Content-Type": "application/json"
                    },
                    dataType: 'json',
                    success: function (data) {
                        let ip = data.substring(0, 15);
                        let downloadURL = (data.replace(ip, apiURL).replace(/\\/g, "/"));
                        // window.location = downloadURL;
                        window.open(downloadURL, "_self");
                    }
                });
            }
        });
    });

    // To save RPA Flow into database using API

    $("#saveRpaFlow").click(function () {
        var rpaFlowJson = $flowchart.flowchart('getData');
        console.log(JSON.stringify(rpaFlowJson));
        var apiURLPostFlow = apiURL + "api/flow";
        var apiURLTransformJSON = apiURL + "api/transformJson";
        var uriType = "post";

        var rpaFlowList = $("#rpaFlowList");
        var slectedFlowSchema = {
            key: rpaFlowList.val(),
            value: rpaFlowList.find("option:selected").text()
        };

        if (slectedFlowSchema != null && !jQuery.isEmptyObject(slectedFlowSchema) && slectedFlowSchema.key != "0") {
            uriType = "put";
            apiURLPostFlow = apiURLPostFlow + "/" + slectedFlowSchema.key;
        }
        // Transform Flow JSON
        $.ajax({
            type: "post",
            url: apiURLTransformJSON,
            data: JSON.stringify(rpaFlowJson),
            headers: {
                "Content-Type": "application/json"
            },
            dataType: 'json',
            success: function (data) {
                console.log("JSON Transformed!");
                // console.log(data);
                // Save flow
                var transformedJson = data;
                flowSchema = {
                    name: $('#flowName').val(),
                    uiFlowJson: rpaFlowJson,
                    flowJson: transformedJson
                };
                
                $.ajax({
                    type: uriType,
                    url: apiURLPostFlow,
                    data: JSON.stringify(flowSchema),
                    headers: {
                        // "x-auth-token": localStorage.accessToken,
                        "Content-Type": "application/json"
                    },
                    dataType: 'json',
                    success: function (data) {
                        RPAFlowList();
                        console.log("Flow Saved!");
                    }
                });
            }
        });
    });
    var $draggableOperators = $('.draggable_operator');

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    function getOperatorData($element) {
        var nbInputs = parseInt($element.data('nb-inputs'));
        var nbOutputs = parseInt($element.data('nb-outputs'));
        var data = {
            operator_id: guid(),
            properties: {
                flow: {},
                id: $element[0].id,
                title: $element.text(),
                class: $element[0].id,
                inputs: {},
                outputs: {}
            }
        };

        var i = 0;
        for (i = 0; i < nbInputs; i++) {
            data.properties.inputs['input_' + i] = {
                label: 'Input ' + (i + 1)
            };
        }
        for (i = 0; i < nbOutputs; i++) {
            data.properties.outputs['output_' + i] = {
                label: 'Output ' + (i + 1)
            };
        }

        return data;
    }

    $draggableOperators.draggable({
        cursor: "move",
        opacity: 0.7,

        helper: 'clone',
        appendTo: 'body',
        zIndex: 1000,

        helper: function (e) {
            var $this = $(this);
            var data = getOperatorData($this);
            return $flowchart.flowchart('getOperatorElement', data);
        },
        stop: function (e, ui) {
            var $this = $(this);
            var elOffset = ui.offset;
            var containerOffset = $container.offset();
            if (elOffset.left > containerOffset.left &&
                elOffset.top > containerOffset.top &&
                elOffset.left < containerOffset.left + $container.width() &&
                elOffset.top < containerOffset.top + $container.height()) {

                var flowchartOffset = $flowchart.offset();

                var relativeLeft = elOffset.left - flowchartOffset.left;
                var relativeTop = elOffset.top - flowchartOffset.top;

                var positionRatio = $flowchart.flowchart('getPositionRatio');
                relativeLeft /= positionRatio;
                relativeTop /= positionRatio;

                var data = getOperatorData($this);
                data.left = relativeLeft;
                data.top = relativeTop;

              
               addScript(data.operator_id, data.properties.id, data.properties.title, function () {
                   // assignPropertyWindowValue(operatorId, data);
                     $flowchart.flowchart('addOperator', data);
                     assignPropertyWindowValue(data.operator_id, data);
                });
            }
        }
    });
});


function deleteOperator(operatorId) {
    var $flowchart = $('#example');
    $flowchart.flowchart('deleteOperator', operatorId);
    propertyWindowClose(operatorId);
}

function ChangeNodeLable(operatorId) {
    oFormObject = document.forms[operatorId];
    var lable = oFormObject['label'].value;
    var $flowchart = $('#example');
    $flowchart.flowchart('setOperatorTitle', operatorId, lable);
}

function propertyReset(operatorId) {
    var effect = 'slide';
    var options = { direction: 'right' };
    var duration = 1000;
    $('#' + operatorId).toggle(effect, options, duration);

    //$('#'+operatorId)[0].reset();
    //oFormObject = document.forms[operatorId];
    //oFormObject.reset();
}

function propertyWindowClose(operatorId) {
    var effect = 'slide';
    var options = { direction: 'right' };
    var duration = 1000;
    $('#' + operatorId).toggle(effect, options, duration);
    let oFormObject = document.forms[operatorId];
    var lable = oFormObject['label'].value;
   
    //if(lable=="GTEApp"){
        //var newLabel=oFormObject['gteapp-name'].value;
        var product=oFormObject['product'].value;
        var channel=oFormObject['channel'].value;
        var touchpoint=oFormObject['touchpoint'].value;
        var operation=oFormObject['operation'].value;
        var mode=oFormObject['mode'].value;
        
        var e = oFormObject['mode'];
        //var value = e.options[e.selectedIndex].value;
        
        if(mode=="Select Mode"){
            mode=""   
        } 
        else
        {
            mode = e.options[e.selectedIndex].text;
        }       
        var newlabel="["+ product +"/" + channel +"/"+touchpoint+"/"+operation +"/"+mode+"]";
        
        //document.getElementById("gteapp-name").setAttribute('value',label);
        //document.getElementById("label").value=label;

        var $flowchart = $('#example');
        $flowchart.flowchart('setOperatorTitle', operatorId, newlabel);
    //}
}
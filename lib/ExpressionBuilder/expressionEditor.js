function autocomplete(inp, arr) {
    debugger;   
    var currentFocus;   
    inp.addEventListener("input", function (e) {
        var matches_array;
        var a, b, i, val = this.value.trim();
        var _prefix, _array, val1, flag = false;
        var reamainingString;
        
        const regexString = /[a-zA-Z-]+/igm;       
        if (val.match(regexString)) {
            matches_array = val.match(regexString);
            val = matches_array[matches_array.length - 1];
            _prefix = matches_array[matches_array.length - 2];
            val1 = val.toString();
        }
        if (typeof (_prefix) != "undefined") {
            val = _prefix + "." + val;            
        }         
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;        
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");        
        this.parentNode.appendChild(a);       
        for (i = 0; i < arr.length; i++) {           
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                flag = true;                
                b = document.createElement("DIV");               
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                reamainingString = arr[i].substr(val.length);                
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";                
                b.addEventListener("click", function(e) {                    
                    inp.value += reamainingString;                    
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        if(flag==false)
        {
            for (i = 0; i < arr.length; i++) {               
                if (arr[i].substr(0, val1.length).toUpperCase() == val1.toUpperCase()) {   
                    b = document.createElement("DIV");                    
                    b.innerHTML = "<strong>" + arr[i].substr(0, val1.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val1.length);
                    reamainingString = arr[i].substr(val1.length);                    
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";                    
                    b.addEventListener("click", function(e) {                       
                        inp.value += reamainingString;                        
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        }
    });

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {            
            currentFocus++;           
            addActive(x);
        } else if (e.keyCode == 38) { 
            currentFocus--;           
            addActive(x);
        } else if (e.keyCode == 13) {           
            e.preventDefault();
            if (currentFocus > -1) {               
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {        
        if (!x) return false;        
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);        
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {        
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {        
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }    
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

//var expressions = ["$[greRequest]", "$[greResponse]", "greRequest", "greResponse", "@greHelper", "greHelper", ".fields", "fields", "transaction", "is-attest-pilot", "?", "value", "value", "or", "not", "createEmptyModel", "exchange", "security", "str-prd-ind", "contains", "complex-level", "checkValuesExist", "account", "account.enriched-legaltran-addresses-countrycodes-lists", "account.account", "account.acct-class", "strc-prd-ind", "side", "efsshared", "affiliation-role", "collateral-acct-ind", ];
var expressions = ["reqvars", "reqvars.pending-qty-422f", "reqvars.executed-qty-422f",
    "campaignmgr", "campaignmgr.acct-mail-legl-ctrycode-not-in-iaclist", "campaignmgr.acct-mail-legl-ctrycode-us", "campaignmgr.acct-mail-legl-ctrycode-not-available",
    "security", "security.convertible-code","security.affiliated-ind","security.age-threshold","security.aggregated-above-threshold","security.aggregated-below-threshold","security.ask-price","security.bid-price","security.choice-suspended-ind","security.complex-level","security.concn-nosol-key","security.covered-uncovered","security.cover-short-ind","security.cusip","security.do-not-reduce","security.enriched-lookup-message","security.enriched-lookup-status","security.entity-aggregated","security.entity-single-cusip","security.etf-etn-ind","security.etf-restriction","security.exchange","security.exch-group","security.executed-qty",
    "metadata", "metadata.order-rcd-racfid", "metadata.response-code", "metadata.response-status", "metadata.display", "metadata.statement",
    "transaction", "transaction.order-recv-primary-fa", "transaction.is-attest-pilot",
    "documentinfo", "documentinfo.enriched-lookup-message", "documentinfo.enriched-lookup-status", "documentinfo.enriched-doc-map","documentinfo.is-professional-client-certificate",
    "reqvars", "reqvars.doc-map-key", "reqvars.networth-pct185c", "reqvars.networth-pc185d", "reqvars.baseGuidline185c","reqvars.isStatusCheck","reqvars.securityconcentration",
    "substitution", "substitution.title-case-side",
    "account", "account.is-self-directed", "account.account", "account.acct-class", "account.acct-class-sub-class", "account.acct-closed", "account.acct-group-destination", "account.acct-margin-doc", "account.acct-sub-class", "account.age", "account.aml-business-type", "account.bank-sweep-ind", "account.bic-exemption-ind", "account.business-type-code", "account.category", "account.client-category", "account.collateral-acct-ind", "account.company-code", "account.discretionary-ind", "account.div-pay", "account.dol-in-scope-ind", "account.dta-indicator", "account.dvp.acct-ind", "account.emp-code", "account.enriched-lookup-message", "account.enriched-lookup-status", "account.regflag-blocked", "account.enriched-legaltran-addresses-countrycodes-lists",
    "old-account", "old-is-self-directed",
    "efsshared", "efsshared.placeholder-restricted-indicator", "efsshared.placeholder-security",
    "rls", "rls.enriched-lookup-message", "rls.enriched-lookup-status", "rls.rls-indicator", "rls.list", "rls.rls-message", "rls.rls-underlying-indicator", "rls.rls-underlying-list",
    "$[greRequest]", "greRequest", "@greHelper", "greRequest.fields", "fields", "greHelper.checkValuesExist", "greHelper.createEmptyModel", "value", ".value", "or", "not", "and", "exchange","attestation","assetconcentration","efs"
    
];


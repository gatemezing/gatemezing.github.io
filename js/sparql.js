function sparqlQuery(query, baseURL, format) {
	if(!format)
		format="application/json";
	var params={
		"default-graph": "",  "query": query,
		"debug": "on", "timeout": "", "format": format,
		"save": "display", "fname": ""
	};
	
	var querypart="";
	for(var k in params) {
		querypart+=k+"="+encodeURIComponent(params[k])+"&";
	}
	var queryURL=baseURL + '?' + querypart;
	if (window.XMLHttpRequest) {
  	xmlhttp=new XMLHttpRequest();
  }
  else {
  	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  var emptyResult = {results: {bindings: []}};
  try {
    xmlhttp.open("GET",queryURL,false);
    xmlhttp.send();
    if (xmlhttp.status < 200 || xmlhttp.status >= 300) {
      console.error("Sparql query failed: " + queryURL + " (status " + xmlhttp.status + ")");
      return emptyResult;
    }
    return JSON.parse(xmlhttp.responseText);
  } catch (e) {
    console.error("Sparql query error: " + queryURL, e);
    return emptyResult;
  }
}


function sparqlQueryAsychronous(query, baseURL, format, callback) {
	if(!format)
		format="application/json";
	var params={
		"default-graph": "",  "query": query,
		"debug": "on", "timeout": "", "format": format,
		"save": "display", "fname": ""
	};
	
	var querypart="";
	for(var k in params) {
		querypart+=k+"="+encodeURIComponent(params[k])+"&";
	}
	var queryURL=baseURL + '?' + querypart;
	
	$.get(queryURL, callback)
	.error(function() { 
		//alert("Sparql query error: " + queryURL  + " "+xmlhttp.status + " " + xmlhttp.responseText);
	});
		

  // xmlhttp.send(); 
}
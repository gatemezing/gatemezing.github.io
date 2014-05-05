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
  //TODO: catch the error of the URIs here
  xmlhttp.open("GET",queryURL,false);
  
  xmlhttp.send();
  
  return JSON.parse(xmlhttp.responseText);
  
  
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
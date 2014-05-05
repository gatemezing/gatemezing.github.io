function listGraphs(endpoint){
	query_list = "select distinct ?g where {graph ?g {?s ?p ?o .}filter (?g !=<http://www.openlinksw.com/schemas/virtrdf#> && ?g !=<http://www.w3.org/2002/07/owl#>)} limit 30";

	var json=sparqlQuery(query_list, endpoint);	
	var resp = json.results.bindings;	
	var graphs = new Array();	
	$.each(resp,function(index,value){
			graphs.push(value.g.value);
		});
   return graphs;
}


function findVocab(endpoint, graphUri) {
	var query = "prefix void: <http://rdfs.org/ns/void#> PREFIX voaf:<http://purl.org/vocommons/voaf#>SELECT  DISTINCT ?vocab FROM <"+graphUri+ "> WHERE{{?vocab a owl:Ontology} UNION {?vocab a voaf:Vocabulary} UNION {?d a void:Dataset ; void:vocabulary ?vocab}}";
	//query += "FROM <" +graphUri+ "WHERE{{?vocab a owl:Ontology} UNION {?vocab a voaf:Vocabulary}}";
   var json=sparqlQuery(query, endpoint);	
   var resp = json.results.bindings;	
   var vocabs = new Array();	
	$.each(resp,function(index,value){
			vocabs.push(value.vocab.value);
		});
   return vocabs;

}



//directly from LODStats. TODO: test with VoID
function findVocabFromVoid(voidURI) {
	var query = "prefix void: <http://rdfs.org/ns/void#> PREFIX voaf:<http://purl.org/vocommons/voaf#>SELECT  DISTINCT ?vocab  WHERE{ ?d a void:Dataset ; void:vocabulary ?vocab}";
	//query += "FROM <" +graphUri+ "WHERE{{?vocab a owl:Ontology} UNION {?vocab a voaf:Vocabulary}}";
   var json=sparqlQuery(query, endpoint);	
   var resp = json.results.bindings;	
   var vocabs = new Array();	
	$.each(resp,function(index,value){
			vocabs.push(value.vocab.value);
		});
   return vocabs;

}

//check from LOV
function checkLicense(vocabURI){
    //look up LOV endpoint
	var lovendpoint= "http://eventmedia.eurecom.fr/sparql"; //set now to be eventmedia
	//var license = "license";
	var vocabstring = vocabURI.toString();
	// vocabstring = vocabstring.substring(11, 16); //better split here 
	//var query ="PREFIX voaf:<http://purl.org/vocommons/voaf#> SELECT DISTINCT ?v ?l WHERE { ?v ?p ?l . ?v a voaf:Vocabulary. ?p rdfs:label ?pname. FILTER (contains(str(?pname),"+'"'+license+'"'+")) FILTER (contains(str(?v), "+'"'+vocabstring+'"'+ "))} ORDER BY ?l";
    var query ="PREFIX voaf:<http://purl.org/vocommons/voaf#>select distinct ?v ?l from <http://lov.okfn.org> where { ?v ?p ?l. ?v a voaf:Vocabulary. filter (?p !=rdf:type) filter (contains(str(?v), "+'"' +vocabstring+'"'+ "))}";
    var json=sparqlQuery(query, lovendpoint); 
    var resp = json.results.bindings; 
    
    var cat = new Array ;  
  $.each(resp,function(index,value){
      var tmp ={} ;
      tmp['vocab'] = value.v.value ;
      tmp['license'] = value.l.value ;
      cat.push(tmp) ;
    });
   return cat;
}
   

//check for ontolos in domain name
function checkDomainLicense(vocabURI){
    //look up LOV endpoint
	var lovendpoint= "http://eventmedia.eurecom.fr/sparql"; //set now to be eventmedia
	//var license = "license";
	var vocabstring = vocabURI.toString();
	vocabstring = vocabstring.substring(11, 16); //better split here 
	//var query ="PREFIX voaf:<http://purl.org/vocommons/voaf#> SELECT DISTINCT ?v ?l WHERE { ?v ?p ?l . ?v a voaf:Vocabulary. ?p rdfs:label ?pname. FILTER (contains(str(?pname),"+'"'+license+'"'+")) FILTER (contains(str(?v), "+'"'+vocabstring+'"'+ "))} ORDER BY ?l";
    var query ="PREFIX voaf:<http://purl.org/vocommons/voaf#>select distinct ?v ?l from <http://lov.okfn.org> where { ?v ?p ?l. ?v a voaf:Vocabulary. filter (?p !=rdf:type) filter (contains(str(?v), "+'"' +vocabstring+'"'+ "))}";
    var json=sparqlQuery(query, lovendpoint); 
    var resp = json.results.bindings; 
    
    var cat = new Array ;  
  $.each(resp,function(index,value){
      var tmp ={} ;
      tmp['vocab'] = value.v.value ;
      tmp['license'] = value.l.value ;
      cat.push(tmp) ;
    });

    
   return cat;
}

function launchQuery(query, baseURL, format) {
	if(!format)
		format="application/xml";
	var params={
	   "query": query,
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
  
   xmlhttp.send(null);
  
  //return JSON.parse(xmlhttp.responseText);
  return xmlhttp.responseXML;
  
  
} 
       
       
       




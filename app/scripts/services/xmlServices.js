/**
 * Created by Brinzoiu on 7/2/2016.
 */

angular.module('oaseApp')
  .service('xmlService', function ( ) {

    var getXMLReports = function () {

      var xmlhttp = new XMLHttpRequest();
      var url = 'http://localhost:8080/Diagnostics.xml';
      var xml = null;

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          return xml = getObject( xmlhttp.responseXML);

        }
      };
      xmlhttp.open("GET", url, false);
      xmlhttp.send();

      return xml;
    };


    var getObject =  function xmlToJson(xml) {

      // Create the return object
      var obj = {};
      if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
      }

      // do children
      if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof(obj[nodeName]) == "undefined") {
            obj[nodeName] = xmlToJson(item);
          } else {
            if (typeof(obj[nodeName].push) == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(xmlToJson(item));
          }
        }
      }
      return obj;
    };


    return {
      getXMLReports: getXMLReports
    };
  });



/*
var xmlhttp = new XMLHttpRequest();
var url =  'http://localhost:8080/Diagnostics.xml'

xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var myArr = xmlhttp.responseXML;
    myFunction(myArr);
  }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
  var parseString = require('xml2js').parseString;
  var xml = arr;
  parseString(xml, function (err, result) {
    console.dir(result);
  });
*/



/*

  GeoFormat.js
  
  version 1.0
  Dec.11.2013
  
  Copyright (c) 2013 by Naoki Ueda
  Published under the 2-clause BSD license.
  See http://openlayers.org/dev/license.txt for the full text of the license
  
*/
var GeoFormat = function(var0, var1, var2, var3, var4, var5 ) {
	this.valid = false;
	this.lat;
	this.lon;
	
	var geoprint = function(format, val, isLat){
		var calFactor = 10000000000;
		var isValid = true;
		var formattedString = "";
		
		if(format==null || format==""){
			format = "%f";	
		}
		//ConfirmFormatIndicator
		if(format.substr(0,1) != "%"){
			return null;
		}
		
		//Confirm type
		//	%f	
		//	%d
		//	%u
		if(format.substr(format.length-1,1) == "f"){
			//val=val;
		}else if(format.substr(format.length-1,1) == "d"){
			val = (val<0?(-1):1) * Math.floor(Math.abs(val));
		}else if(format.substr(format.length-1,1) == "u"){
			val = Math.floor(Math.abs(val));
		}else{
			//Format Error
			return null;
		}
		
		//Option
		var regexp = /^\%([+aA0 ]*)([\d]*)\.{0,1}([\d]*)([f|d|u])$/;
		var match_result = format.match(regexp)
		var option = RegExp.$1;
		var digitlen = RegExp.$2;
		var underlen = RegExp.$3;
		var type = RegExp.$4;
		
		//exclusive option
		if(option.indexOf(" ")>=0
		&& option.indexOf("0")>=0){
			return null;
		}
		if(option.indexOf("+")>=0
		&& option.indexOf("a")>=0
		&& option.indexOf("A")>=0){
			return null;
		}
		
		//Sign
		// " "(Space) spece fill
		// "0" zerofill 
		// "+" show"+" when positive
		// "a" aspect: n/s or e/w
		// "A" Aspect: N/S or E/W
		var signStr = "";
		if(option.indexOf("a")>=0){
			signStr = val>0?(isLat?"n":"e"):(isLat?"s":"w");
		}else if(option.indexOf("A")>=0){
			signStr = val>0?(isLat?"N":"E"):(isLat?"S":"W");
		}else if(option.indexOf("+")>=0){
			signStr = val>=0?"+":"-";
		}else{
			signStr = val>=0?"":"-";
		}
		
		var formattedString = "";
		//width and zerofill/spacefill
		if(option.indexOf("0")>=0){
			var fillStr = option.indexOf(" ")>=0?" ":"0";
			if(!isNaN(digitlen)){
				var digitpart = Math.floor(Math.abs(val));
				digitpart = digitpart + "";//toString
				for(var i =0; i < digitlen - signStr.length - digitpart.length - 0; i++){
					formattedString += fillStr;
				}
			}
			formattedString = signStr + formattedString + digitpart;
			
		}else if(option.indexOf(" ")>=0){
			var fillStr = option.indexOf(" ")>=0?" ":"0";
			if(!isNaN(digitlen)){
				var digitpart = Math.floor(Math.abs(val));
				digitpart = digitpart + "";//toString
				for(var i =0; i < digitlen - signStr.length - digitpart.length - 0; i++){
					formattedString += fillStr;
				}
			}
			formattedString = formattedString + signStr + digitpart;
			
		}else{
			formattedString = signStr + Math.floor(Math.abs(val));
		}
		
		//under decimal width
		if(type == "f"){
			var underdecimal = (Math.abs(val) * calFactor - Math.floor(Math.abs(val)) * calFactor) / calFactor;
			if(underlen -0 >0){
				underdecimal = underdecimal.toFixed(underlen -0);
				underdecimal = "" + underdecimal;//toString
			}else{
				if(underdecimal - 0 == 0){
					underdecimal = "0.0";
				}else{
					underdecimal = underdecimal.toFixed((calFactor+"").length-1);
					underdecimal = "" + underdecimal;//toString
				}
			}
			underdecimal += "";//toString
			formattedString += underdecimal.substr(1);
		}
		return(""+formattedString);
	}
	var latlonvalue = function(val,isLat){
		var calFactor = 10000000000;
		var sign = val<0?(-1):1;
		var d = Math.abs(val);
		var dint = Math.floor(d);
		var m = (d * calFactor - dint * calFactor) * 60 / calFactor;
		var mint = Math.floor(m);
		var s = (m * calFactor - mint * calFactor) * 60 / calFactor;
		var sint = Math.floor(s);
		var msec = (s * calFactor - sint * calFactor) * 1000 / calFactor;
		
		this.deg = function(format_formula){
			//signed, Degree, decimal, unit:degree
			return(geoprint(format_formula,sign * d ,isLat));
		};
		this.min = function(format_formula){
			//unsigned, under minutes, decimal, unit:minute
			return(geoprint(format_formula,m ,isLat));
		};
		this.sec = function(format_formula){
			//unsignedm under seconds, decimal, unit:second
			return(geoprint(format_formula,s ,isLat));
		};
		this.msec = function(format_formula){
			//unsignedm under milli seconds, decimal, unit=mill-second
			return(geoprint(format_formula,msec ,isLat));
		};
		this.fullmin = function(format_formula){
			//signed, lat or lon by minute unit, decimal
			return(geoprint(format_formula,sign * val * 60 ,isLat));
		};
		this.fullsec = function(format_formula){
			//signed, lat or lon by second unit, decimal
			return(geoprint(format_formula,sign * val * 3600 ,isLat));
		};
		this.fullmsec = function(format_formula){
			//signed, lat or lon by milli-second unit, decimal
			return(geoprint(format_formula,sign * val * 3600000 ,isLat));
		};
		this.rad = function(format_formula){
			//unsigned, lat or lon by radian, decimal
			return(geoprint(format_formula, 2 * Math.PI * (val<0?(360+val):val) / 360 ,isLat));
		};
	}

	//Parameter check and init
	if(!isNaN(var0) && !isNaN(var1) && isNaN(var2) && isNaN(var3) && isNaN(var4) && isNaN(var5)){
		this.lat = new latlonvalue(var0 - 0,true);
		this.lon = new latlonvalue(var1 - 0,false);
		this.valid = true;
	}else if(!isNaN(var0) && !isNaN(var1) && !isNaN(var2) && !isNaN(var3) && isNaN(var4) && isNaN(var5)){
		this.lat = new latlonvalue(((var0-0)<0?(-1):1) * (Math.abs(var0 - 0) + (Math.abs(var1 - 0))/60 - 0),true);
		this.lon = new latlonvalue(((var2-0)<0?(-1):1) * (Math.abs(var2 - 0) + (Math.abs(var3 - 0))/60 - 0),false);
		this.valid = true;
	}else if(!isNaN(var0) && !isNaN(var1) && !isNaN(var2) && !isNaN(var3) && !isNaN(var4) && !isNaN(var5)){
		this.lat = new latlonvalue(((var0-0)<0?(-1):1) * (Math.abs(var0 - 0) + Math.abs((var1 - 0)/60) + Math.abs((var2 - 0)/3600 - 0)),true);
		this.lon = new latlonvalue(((var3-0)<0?(-1):1) * (Math.abs(var3 - 0) + Math.abs((var4 - 0)/60) + Math.abs((var5 - 0)/3600 - 0)),false);
		this.valid = true;
	}else{
		this.lat = null;
		this.lon = null;
		this.valid = false;
	}
	
};

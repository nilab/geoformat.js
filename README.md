GeoFormat.js
============
<br />Small JavaScript class for formatting geographic coordinates value into string.
<br />
<br />How to use 
<br />1.	Create Instance with coordinate value. 
<br />	Parameter should be latitude first, then longitude follows. 
<br />	format of "degree", "degree/minute", or "degree/minute/second" are available. 
<br />	
<br />	Examples: 
<br />	var gf = new GeoFormat(35.12345, 135.12345); 
<br />	var gf = new GeoFormat(35, 7.407, 135, 7.407); 
<br />	var gf = new GeoFormat(35, 7, 24.42, 135, 7, 24.42);
<br />
<br />2.	GeoFormat instance has two object members, "lat" and "lon".
<br />	"lat" and "lon" both has following methods to return string value. 
<br />	deg(format_formula) //decimal degree. Signed. 
<br />	min(format_formula) //decimal value for minutes or less. Unsigned. 
<br />	sec(format_formula) //decimal value for second or less. Unsigned. 
<br />	msec(format_formula) //decimal value for milliseconds or less. Unsigned. 
<br />	fullmin(format_formula) //decimal degree in unit of minutes. Signed. 
<br />	fullsec(format_formula) //decimal degree in unit of seconds. Signed. 
<br />	fullmsec(format_formula)//decimal degree in unit of milliseconds. Signed. 
<br />	rad(format_formula) //decimal degree expressed in Radian. Unsigned.
<br />
<br />3.	Format Formula 
<br />	The format formula follows C/C++ printf format, and simplified and modified a little for GeoFormat.
<br />	<b>Types available: </b>
<br />	%d 	Signed Integer 
<br />	%u 	Unsigned Integer 
<br />	%f 	Signed Double
<br />	<b>Options available:</b> 
<br />	"+" 	add "+" when positive 
<br />	"a" aspect: add n/s(for latitude) or e/w(for longitude) *this is not in printf formula. 
<br />	"A" Aspect: add N/S(for latitude) or E/W(for longitude) *this is not in printf formula. 
<br />	" "(space) When width specified, fill with space 
<br />	"0" When width specified, fill with "0"
<br />	<b>Width and Precision:</b> 
<br />	"N" or "N.N" formula 
<br />	
<br />	<b>Examples for value 35.12345(latitude) </b>
<br />	"%04d" 	0035 
<br />	"%+04d" 	+035 
<br />	"%04.3f" 	0035.123 
<br />	"%.3f" 	35.123 
<br />	"%a.3f" 	n35.123 
<br />	"%A04.3f" 	N035.123
<br />	
<br />4.	Practical Example Code: 
<br />	
<br />	var gf = new GeoFormat(35.12345,135.12345); 
<br />	//For GoogleMaps URL 
<br />	var gmapurl = "www.google.co.jp/maps?q="+gf.lat.deg("%f")+","+gf.lon.deg("%f");
<br />	
<br />5.	Question/Opinion
<br />	nao(at)locapoint.com

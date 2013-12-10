geoformat.js
============

Small JavaScript class for formatting geographic coordinates value into string.

How to use
1. Create Instance with coordinate value.
Parameter should be latitude first, then longitude follows.
format of "degree", "degree/minute", or "degree/minute/second" are available.
Examples:
var gf = new GeoFormat(35.12345, 135.12345);
var gf = new GeoFormat(35, 7.407, 135, 7.407); //
var gf = new GeoFormat(35, 7, 24.42, 135, 7, 24.42);


GeoFormat instance has two object members, "lat" and "lon".


"lat" and "lon" both has following methods to return string value.
deg(format_formula)  //decimal degree. Signed. 
min(format_formula)  //decimal value for minutes or less. Unsigned.
sec(format_formula)  //decimal value for second or less. Unsigned.
msec(format_formula) //decimal value for milli minutes or less. Unsigned.
fullmin(format_formula) //decimal degree in unit of minutes. Signed. 
fullsec(format_formula) //decimal degree in unit of seconds. Signed.
fullmsec(format_formula)//decimal degree in unit of milli-seconds. Signed.
rad(format_formula)  //decimal degree expressed in Radian. Unsigned.

Format Formula
The format formula follows C/C++ printf format, and simplified and modified a little for GeoFormat.

Types available:
%d Signed Integer
%u Unsigned Integer
%f Signed Double

Options available:
"+" add "+" when positive
"a" aspect: add n/s(for latitude) or e/w(for longitude) *this is not in printf formula. 
"A" Aspect: add N/S(for latitude) or E/W(for longitude) *this is not in printf formula.
" "(space) When width specified, fill with space
"0" When width specified, fill with "0"

Width and Precision
"N" or "N.N" formula
Examples: 35.12345(latitude)
"%04d"   0035
"%+04d"   +035
"%04.3f"   0035.123
"%.3f"  35.123
"%a.3f"  n35.123
"%A04.3f" N035.123


Practical Example:
    var gf = new GeoFormat(35.12345,135.12345);
    //For GoogleMaps URL
    var gmapurl = "www.google.co.jp/maps?q="+gf.lat.deg("%f")+","+gf.lon.deg("%f");


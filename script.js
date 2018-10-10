var bgcolors = ["#EFF", "#FEF", "#FFE", "#FEE", "#EFE", "#EEF"];
var hicolors = ["#F0A", "#FA0", "#A0F", "#AF0", "#0FA", "#0AF"];
function without(arr, x) {
  var i = arr.indexOf(x);
  if (i < 0) return arr;
  return arr.slice(0, i).concat(arr.slice(i + 1, arr.length));
}

function updateColors(prevStyle, prevbg, prevhi) {
  var bgoptions = prevbg ? without(bgcolors, prevbg) : bgcolors;
  var hioptions = prevhi ? without(hicolors, prevhi) : hicolors;

  var bgcolor = bgoptions[Math.floor(Math.random() * (bgoptions.length))];
  var hicolor = hioptions[Math.floor(Math.random() * (hioptions.length))];
  
  if (prevStyle) {
    console.log("found prev style!")
    document.head.removeChild(prevStyle)
  }
  var style = document.createElement("style");
	style.appendChild(document.createTextNode(""));
	document.head.appendChild(style);
	style.sheet.insertRule("#header { background-color: " + bgcolor + 
	    "; border-color: " + hicolor + " }", 0);
	style.sheet.insertRule(".underline::after { border-color: " + hicolor + " }", 1);
  style.sheet.insertRule("a { color: " + hicolor + " }", 2);
  // if hicolor matches our hover color (#A0F = purple), 
  // change the hover color #0AF = blue)
  if (hicolor == "#A0F")
    style.sheet.insertRule("a:hover { color: #0AF !important }", 3);
    
  setTimeout(function(){ updateColors(style, bgcolor, hicolor); }, 
      Math.floor(Math.random() * 1200 + 2200));
}
window.onload = updateColors();


// ["#E5FFFF", "#FFE5FF", "#FFFFE5", "#FFE5E5", "#E5FFE5", "#E5E5FF"]

var colors = {
  "bg": ["#EFF", "#FEF", "#FFE", "#FEE", "#EFE", "#EEF"],
  "hi": ["#F0A", "#FA0", "#A0F", "#AF0", "#0FA", "#0AF"]
}

function without(arr, x) {
  var i = arr.indexOf(x)
  if (i < 0) return arr
  return arr.slice(0, i).concat(arr.slice(i + 1, arr.length))
}

function updateColors(prevStyle, prevColors, shouldUpdate) {
  var newColors = {}
  for (key in colors) {
    var colorOptions = {}
    if (shouldUpdate[key]) {
      colorOptions[key] = key in prevColors ?
        without(colors[key], prevColors[key]) : colors[key]
    }
    newColors[key] = shouldUpdate[key] ?
      colorOptions[key][Math.floor(Math.random() * (colorOptions[key].length))]
      : prevColors[key]
  }

  if (prevStyle) document.head.removeChild(prevStyle)
  var style = document.createElement("style")
  style.appendChild(document.createTextNode(""))
  document.head.appendChild(style)

  style.sheet.insertRule("#header { background-color: " + newColors.bg +
    "; border-color: " + newColors.hi + " }", 0)

  style.sheet.insertRule(".underline::after { border-color: " + newColors.hi + " }", 1)
  style.sheet.insertRule("a { color: " + newColors.hi + " }", 2)
  // if hicolor matches our hover color (#A0F = purple), 
  // change the hover color #0AF = blue)
  if (newColors.hi == "#A0F")
    style.sheet.insertRule("a:hover { color: #0AF !important }", 3)

  setTimeout(function () {
    updateColors(style, newColors, { bg: !shouldUpdate.bg, hi: !shouldUpdate.hi })
  }, Math.floor(Math.random() * 800 + 1000))
}

window.onload = updateColors(null, {}, { 'bg': false, 'hi': true })

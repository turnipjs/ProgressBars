// color reference for ease of reading (sometime i may create a system that supports more colors and/or custom hex codes)
var colors = {
  blue: "primary",
  green: "success",
  lightBlue: "info",
  yellow: "warning",
  red: "danger",
}
// contains a list of currently existing bars by containing active barIDs
var bars = [];

// this function creates progress bar html given the input of a barID
function createBarHTML(barID) {
  // [TO BE CREATED]
}

// this function will find the values of a bar with id barID and compute the percent to be displayed
function getValue(barID) {
  var done = $(".done " + barID).val();
  var outOf = $(".outOf " + barID).val();
  if (done >= 0 && outOf > 0 && outOf >= done) {
    return done / outof;
  }
  return 0;
}

function update() {
  for (var barID in bars) {
    // this section previously had its own function called getValue
    var outOf = $(".outOf " + barID).val();
    var done = $(".done " + barID).val();
    var value = 1000 * done / outOf;
    value = Math.round(value);
    value = value * .1;
    // updates object
    eval("bar" + barID + ".barName = $('.name " + barID + "').val();");
    eval("bar" + barID + ".outOf = $('.outOf " + barID + "').val();");
    eval("bar" + barID + ".done = $('.done " + barID + "').val();");
    eval("bar" + barID + ".color = $('.color " + barID + "').val();");
    // updates html
    $(".progress-bar " + barID).attr("style", "width:" + value + "%;");
    $(".value " + barID).html(value);
    // updates cookies
    // [TO BE CREATED], cookies hav not been implemented at all
  }
}
// done (? maybe some logic errors in this one)
function getNewBarID(counter) {
  var i = counter || 0;
  if (bars[i] == i) {
    ++i;
    getNewBarID(i);
  } else {
    return i;
  }
}
// done
function Bar() {
  this.barName = "Rename Me!";
  this.outOf = null;
  this.done = null;
  this.color = "primary";
}
// done
function createBar() {
  var newBarID = getNewBarID();
  bars.splice(newBarID, 0, newBarID);
  eval("bar" + newBarID + "= new Bar();");
  $("#bars").append(createBarHTML(newBarID));
}

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
    return false;
  }
  return true;
}

// done
//runs after page is fully loaded (acts like a "$(document).ready(function(){})")
$(function() {
  // init page
  // [STILL TO ADD COOKIES FUNCTIONALITY]
  createBar();
  update();
  // jquery listners
  $("input").keyup(update());
  $("#add-a-bar").click(createBar()); //listens to + button and creates new bars
  $(); //listens to x buttons and deletes that bar when it is pressed
});

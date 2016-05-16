/*requirejs.config({
  paths: {
    jquery: "jquery.min",
    bootstrap: "bootstrap.min"
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    }
  }
});

//Define dependencies and pass a callback when dependencies have been loaded
require(["jquery", "bootstrap"], function ($) {
  var page = parseInt(location.search.split('page=')[1] || 1);
  $('a.next').attr("href", "?page=" + (page + 1));
  if (page === 1)
    $('a.previous').parent().addClass('disabled');
  else
    $('a.previous').attr("href", "?page=" + (page - 1));
});*/

function getDate(timestamp) {
  var date = new Date(timestamp);
  var month = ("0"+(date.getMonth()+1)).substr(-2);
  var day = ("0"+date.getDate()).substr(-2);
  var hours = ("0"+date.getHours()).substr(-2);
  var minutes = ("0"+date.getMinutes()).substr(-2);
  return day + "/" + month + " " + hours + ":" + minutes;
}


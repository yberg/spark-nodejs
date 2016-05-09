requirejs.config({
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
  $('form#search').on('submit', function(e) {
    console.log($('input[name="user"]').val());
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8090/', // add stuff
      data: {
        appName: 'test',
        name: $('input[name="user"]').val()
      },
      success: function(res) {
        console.log('success: ');
        console.log(res);
      },
      error: function(res) {
        console.log('error: ');
        console.log(res);
      }
    });
  });
});



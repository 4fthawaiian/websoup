/*
 * app.js
 * Copyright (C) 2014 BEM <brad@projectpixelpress.com>
 *
 * Distributed under terms of the MIT license.
 */

(function() {
  var $_GET = {};

  document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
    function decode(s) {
      return decodeURIComponent(s.split("+").join(" "));
    }

    $_GET[decode(arguments[1])] = decode(arguments[2]);
  });

  var route = {
    URL: "/v1/recipes",
    template: "recipe_line",
    placeHolder: $("#recipes")
  }
  if ($_GET['recipe_id']) {
    route.URL = '/v1/recipes/'+$_GET['recipe_id'];
    route.template = "recipe_single";
    route.placeHolder = $("body");
  }
  var recipe_template = $('#'+route.template).html();
  var template = Handlebars.compile(recipe_template);
  $.get(route.URL,function(data,status,xhr){
    $.each(data,function(index,element){
      var html = template(element);
      route.placeHolder.append(html);
    });
  });
}).call(this)

Handlebars.registerHelper("everyOther", function (index, amount, scope) {
    if ( ++index % amount ) 
        return scope.inverse(this);
    else 
        return scope.fn(this);
});

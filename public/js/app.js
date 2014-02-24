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

  var searchTerm="Search by name";
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
  if ($_GET['where']) {
    route.URL = '/v1/recipes/?where='+$_GET['where'];
    searchTerm=$_GET['where'];
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

searchRecipes = function() {
  document.location.href="/?where="+$("#where").val();
}

function imageExists(image_url){
    var http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}

Handlebars.registerHelper('parsedInstructions', function(instructions) {
  return instructions.replace(/(\r|\n)/gm, "<br />");
});
Handlebars.registerHelper('recipeImage', function() {
  console.log("id from helper: %s", this.id);
  var imagePath = '/images/recipe_images/'+this.id+'-Image1.jpg';
  if(imageExists("http://"+document.location.host+imagePath)) {
    console.log(imagePath);
    return imagePath;
  }
  return false;
});

$(function() {
    $("#where").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('#search_button').click();
            return false;
        } else {
            return true;
        }
    });
});

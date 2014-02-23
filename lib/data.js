/*
 * data.js
 * Copyright (C) 2014 BEM <brad@projectpixelpress.com>
 *
 * Distributed under terms of the MIT license.
 */

var sqlite3 = require('sqlite3').verbose(),
    datafile = "./data/yummy.sql";

var db = new sqlite3.Database(datafile);

get_recipes = function(req, res, next) {
  var return_value={recipes: []};
  var query = "SELECT * from ZRECIPES";
  (req.params.id) && (query = "SELECT * from ZRECIPES where ZUNIQUEID='"+req.params.id+"'");
  var dbSelectStmt = db.prepare(query);
  dbSelectStmt.each(function (err, row) {
    ingredients_array=row.ZINGREDIENTSARRAY.replace(/{|  |\n/gm, "");
    ingredients_array=ingredients_array.replace(/..$/, "");
    ingredients_array=ingredients_array.replace(/^./, "");
    ingredients_array=ingredients_array.split("}");
    ingredients_array=ingredients_array.map(function(ing) {
      ing=(ing.replace(/^,/, ""));
      ing=(ing.replace(/\"/gm, ""));
      ingObj = {};
      ing.split(";").forEach(function(ing_el) {
        ing_els=ing_el.split(" = ");
        if(ing_els[0] !== "") ingObj[ing_els[0]]=ing_els[(ing_els.length-1)];
      });
      return ingObj;
    });
    return_value.recipes.push({
      id: row.ZUNIQUEID,
      name: row.ZNAME,
      description: row.ZRECIPEDESCRIPTION,
      ingredients: ingredients_array,
      cooking_time: row.ZCOOKINGTIME,
      prep_time: row.ZPREPTIME,
      instructions: row.ZDIRECTIONS,
    });
  }, function() {
    dbSelectStmt.finalize(function(){
      res.status('200').send(return_value.recipes);
    });
  });
}

module.exports = {
  recipes: get_recipes,
  db: db
}
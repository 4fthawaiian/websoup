/*
 * app.js
 * Copyright (C) 2014 BEM <brad@projectpixelpress.com>
 *
 * Distributed under terms of the MIT license.
 */

    // Open a database
    var db = SQL.open('../data/Library Database.SQL');

    // Run a command in the database
    function dbrun(commands) {
      try {
        var data = db.exec(commands.replace(/\n/g, '; '));
        return(JSON.stringify(data, null, '  '));
      } catch(e) {
        return(e);
      }
    }

/*
 * test.js
 * Copyright (C) 2015 bradleymccrorey <bradleymccrorey@Bradleys-MacBook-Air.local>
 *
 * Distributed under terms of the MIT license.
 */
var config = require('./config');
var dbox  = require("dbox")
var app   = dbox.app({ "app_key": config.dbox_key, "app_secret": config.dbox_secret })
//  Step 2
//  
//  Authorization is a three step process.
//  
//  a) Get a request token...

app.requesttoken(function(status, request_token){
  console.log(request_token)
})

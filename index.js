const express = require("express");
let mysql = require("mysql2");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded( { extendede: true }));


/**
 * last update: Jan 14, 2021
 *
 * wait for input from the queue and insert it to mysql
 * requires:
 * 	npm install mysql2 --save
 * 	npm install amqplib --save
 */

"use strict";
const util = require("util");
var mysql = require("mysql2");
var dbcon;
var amqp = require("amqplib/callback_api");
var rqcon;
const q = "inmqtt";

function dbInit(dbname) {
	dbcon = mysql.createConnection({
		host: "localhost",
		user: "dodo2021",
		password: "BC+6*y~G",
		database: dbname,
	});

	dbcon.connect(function (err) {
		if (err) {
			console.log("error", "Error connecting to DB, stopping process " + err);
			process.exit(1);
		}
		console.log("debug", "DB-Connection established");

		// to keep the mysql connection open generate query every 30 minutes
		setInterval(function () {
			dbcon.query("SELECT 1");
		}, 1800000);
	});
}

function dbquery(query, logger) {
	dbcon.query(query, function (err, results, fields) {
		if (err) {
			console.log("error", "Error querying " + util.inspect(err));
			return;
		}
		console.log("debug", util.inspect(results));
		return results;
	});
}

function bail(err) {
	console.log(err);
	process.exit(1);
}

// Publisher
function publisher(conn) {
	conn.createChannel(on_open);
	function on_open(err, ch) {
		if (err != null) bail(err);
		//ch.assertExchange('amq.topic');
		ch.assertQueue(q, { durable: true });
		ch.bindQueue(q, "usersx", "promo");
	}
}

// Consumer
function consumer(conn) {
	var ok = conn.createChannel(on_open);
	function on_open(err, ch) {
		if (err != null) bail(err);
		console.log("listenting to queue: ", q);
		ch.assertQueue(q);
		ch.consume(q, function (msg) {
			if (msg !== null) {
				console.log(msg.content.toString());
				// --- should put here your code  -----
				ch.ack(msg);
			}
		});
	}
}

require("amqplib/callback_api").connect("amqp://localhost", function (err, conn) {
	if (err != null) bail(err);
	console.log("Connected to RabbitMQ");
	consumer(conn);
	//publisher(conn);
});

// ------ Initializer function ---------
// -------------------------------------
function start() {
	dbInit("telemetry");
}

start();

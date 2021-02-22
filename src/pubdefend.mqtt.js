/* 
https://www.eclipse.org/paho/index.php?page=clients/js/index.php
https://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html
 */

import { pd } from "./pubdefend.init";
import { config } from "./pubdefend.config";
import { customEvent } from "./pubdefend.events";

export function MqttClient() {
	var host = "wss://" + config.endpoints.ws + "." + config.endpoints.base + "/ws";
	var cid = "cid_" + parseInt(Math.random() * 100, 10);
	var self = this;

	self.topic = "test";
	self.client = new Paho.MQTT.Client(host, cid);
	self.client.onMessageArrived = MessageArrived;
	self.client.onConnectionLost = ConnectionLost;
	Connect();

	/*Initiates a connection to the MQTT broker*/
	function Connect() {
		self.client.connect({
			onSuccess: Connected,
			onFailure: ConnectionFailed,
			keepAliveInterval: 30,
			useSSL: true,
			timeout: 3,
		});
	}

	/*Callback for successful MQTT connection */
	function Connected() {
		logger.log("pubdefend:: ws Connected");
		self.client.subscribe(self.topic, {
			qos: 1,
		});

		customEvent(config.constants.ws, "Connected");
	}

	/*Callback for failed connection*/
	function ConnectionFailed(res) {
		logger.log("Connect failed:" + res.errorMessage);
	}

	/*Callback for lost connection*/
	function ConnectionLost(res) {
		if (res.errorCode !== 0) {
			logger.log("Connection lost:" + res.errorMessage);
			Connect();
		}
	}

	/*Callback for incoming message processing */

	function MessageArrived(message) {
		//logger.log(message.destinationName + " : " + message.payloadString);
		/* switch (message.payloadString) {
			case "ON":
				displayClass = "on";
				break;
			case "OFF":
				displayClass = "off";
				break;
			default:
				displayClass = "unknown";
		}
		var topic = message.destinationName.split("/");
		if (topic.length == 3) {
			var ioname = topic[1];
			UpdateElement(ioname, displayClass);
		} */
	}

	function createMessage(topic, payload, qos, retain) {
		var message = new Paho.MQTT.Message(payload);
		message.destinationName = topic;
		message.qos = Number(qos) || 0;
		message.retained = !!retain;

		return message;
	}

	self.publish = function (topic, payload, options, callback) {
		var message = createMessage(topic, payload, options && options.qos, options && options.retain);
		if (callback) {
			if (message.qos < 1) {
				setTimeout(callback);
			} else {
				message.callback = callback;
				messageCache.push(message);
			}
		}
		self.client.send(message);
	};

	self.pub = function (data, callback) {
		if (!data) return;

		var message = new Paho.MQTT.Message(data);
		message.destinationName = self.topic;
		if (callback) {
			setTimeout(callback);
		}
		self.client.send(message);
	};

	return self;
}

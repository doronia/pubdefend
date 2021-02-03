/* 
https://www.eclipse.org/paho/index.php?page=clients/js/index.php
https://www.eclipse.org/paho/files/jsdoc/Paho.MQTT.Client.html
 */

import { pd } from './pubdefend.init';
import { config } from './pubdefend.config';

export var MqttClient = function() {
    var self = this;

    self.endpoint = config.endpoints;
    self.wsbroker = endpoint.websocket + '.' + endpoint.domain
    self.wsport = 443;
    self.cid = "cid_" + parseInt(Math.random() * 100, 10);
    self.subscription = "test";

    self.client = new Paho.MQTT.Client(self.wsbroker, self.wsport, "/ws", self.cid);
    self.client.onMessageArrived = self.MessageArrived;
    self.client.onConnectionLost = self.ConnectionLost;
    self.Connect();




    /*Initiates a connection to the MQTT broker*/
    self.Connect = function() {
        self.client.connect({
            onSuccess: Connected,
            onFailure: ConnectionFailed,
            keepAliveInterval: 30,
            useSSL: true,
        });
    }

    /*Callback for successful MQTT connection */
    self.Connected = function() {
        console.log("Connected");
        mqttClient.subscribe(subscription);
    }

    /*Callback for failed connection*/
    self.ConnectionFailed = function(res) {
        console.log("Connect failed:" + res.errorMessage);
    }

    /*Callback for lost connection*/
    self.ConnectionLost = function(res) {
        if (res.errorCode !== 0) {
            console.log("Connection lost:" + res.errorMessage);
            self.Connect();
        }
    }

    /*Callback for incoming message processing */

    self.MessageArrived = function(message) {
        console.log(message.destinationName + " : " + message.payloadString);
        switch (message.payloadString) {
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
        }
    }

    var createMessage = function(topic, payload, qos, retain) {
        var message = new Paho.MQTT.Message(payload);
        message.destinationName = topic;
        message.qos = Number(qos) || 0;
        message.retained = !!retain;

        return message;
    };

    self.publish = function(topic, payload, options, callback) {
        var message = createMessage(topic, payload, options && options.qos, options && options.retain);
        if (callback) {
            if (message.qos < 1) {
                setTimeout(callback);
            } else {
                message.callback = callback;
                self.messageCache.push(message);
            }
        }
        self.client.send(message);
    };


    return self;
};

var client = new MqttClient();
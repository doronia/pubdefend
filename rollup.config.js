import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "rollup-plugin-replace";
import banner from "rollup-plugin-banner";

import { decode, encode } from "universal-base64url";

const { NODE_ENV = "development", DOMAIN = "" } = process.env;

const isProduction = NODE_ENV === "production";

const ANALYZE = process.env.ANALYZE ? process.env.ANALYZE === "true" : false;

const publisher = isProduction ? "/" + DOMAIN + "/" : "";

//var base64query = encode("domain:" + DOMAIN + ",analytics:true,block:soft");
var base64query = encode("domain:" + DOMAIN);
console.log(base64query);
console.log(decode(base64query));

const output = isProduction ? base64query : `pubdefendnd.js`;

var terserReserved = ["payload", "googletag", "pubads", "isEmpty", "errorMessage", "getSlots", "slot", "getSlotElementId", "getSlots", "getSlotId", "client", "timeout", "userName", "password", "willMessage", "keepAliveInterval", "cleanSession", "useSSL", "invocationContext", "onSuccess", "onFailure", "hosts", "ports", "mqttVersion", "onMessageArrived", "onConnectionLost", "qos", "invocationContext", "destinationName"];

const terserOptions_v2 = {
	parse: {
		// parse options
	},
	compress: {
		// compress options
		//drop_console: true,
	},
	mangle: {
		// mangle options

		properties: {
			reserved: terserReserved,
			keep_quoted: true,
		},
	},
	format: {
		comments: false,
	},

	ecma: 5, // specify one of: 5, 2015, 2016, etc.
	keep_classnames: false,
	keep_fnames: false,
	ie8: false,
	module: false,
	nameCache: null, // or specify a name cache object
	safari10: false,
	toplevel: true,
};
const terserOptions_prod = {
	parse: {
		// parse options
	},
	compress: {
		// compress options
		drop_console: true,
	},
	mangle: {
		// mangle options

		properties: {
			reserved: terserReserved,
			keep_quoted: true,
		},
	},
	format: {
		comments: false,
	},

	ecma: 5, // specify one of: 5, 2015, 2016, etc.
	keep_classnames: false,
	keep_fnames: false,
	ie8: false,
	module: false,
	nameCache: null, // or specify a name cache object
	safari10: false,
	toplevel: true,
};

const terserOptions = {
	toplevel: true,
	/* compress: {
		passes: 1,
	}, */
	mangle: {
		safari10: true,
		properties: {
			reserved: terserReserved,
			keep_quoted: true,
		},
	},
	format: {
		comments: false,
	},
};
var xxx;
module.exports = [
	{
		input: "src/pubDefend.js",
		output: [
			{
				//dev
				file: "dist/pubDefend.iife.js",
				name: "pubdefend",
				format: "iife",
			},
			{
				//dev
				file: "dist/pubDefend.iife.min.js",
				name: "pubdefend",
				format: "iife",
				plugins: [terser(terserOptions_v2)],
			},
			{
				//prod
				file: "dist/" + publisher + output + ".js", //"dist/" + publisher + "pubDefend",
				name: "pubdefend",
				format: "iife",
				plugins: [terser(terserOptions_prod), banner("PubDefend 1.1\nCopyright (c) 2021 Doron Miterani")],
			},
		],
		plugins: [
			resolve({
				browser: true,
			}),
			babel({
				exclude: "node_modules/**",
				babelrc: false,
				presets: [
					[
						"@babel/preset-env",
						{
							targets: {
								browsers: "ie >= 11",
								//browsers: "> 0.5%, ie >= 11"
							},
							debug: ANALYZE,
							modules: false,
							useBuiltIns: false,
						},
					],
				],
			}),
			commonjs(),
			replace({
				exclude: "node_modules/**",
				//ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
				ENV: JSON.stringify(process.env.DOMAIN),
			}),
		],
	},
];

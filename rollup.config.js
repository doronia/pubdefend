import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "rollup-plugin-replace";
import banner from "rollup-plugin-banner";

const { NODE_ENV = "development", DOMAIN = "" } = process.env;

const isProduction = NODE_ENV === "production";
const ANALYZE = process.env.ANALYZE ? process.env.ANALYZE === "true" : false;

const publisher = isProduction ? "/" + DOMAIN + "/" : "";

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
			reserved: ["googletag", "pubads", "errorMessage", "getSlots", "slot", "getSlotElementId", "client", "timeout", "userName", "password", "willMessage", "keepAliveInterval", "cleanSession", "useSSL", "invocationContext", "onSuccess", "onFailure", "hosts", "ports", "mqttVersion", "onMessageArrived", "onConnectionLost", "qos", "invocationContext", "destinationName"],
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
			reserved: ["googletag", "pubads", "errorMessage", "getSlots", "slot", "getSlotElementId", "client", "timeout", "userName", "password", "willMessage", "keepAliveInterval", "cleanSession", "useSSL", "invocationContext", "onSuccess", "onFailure", "hosts", "ports", "mqttVersion", "onMessageArrived", "onConnectionLost", "qos", "invocationContext", "destinationName"],
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
			reserved: ["googletag", "pubads", "getSlots", "slot", "getSlotElementId", "client", "timeout", "userName", "password", "willMessage", "keepAliveInterval", "cleanSession", "useSSL", "invocationContext", "onSuccess", "onFailure", "hosts", "ports", "mqttVersion", "onMessageArrived", "onConnectionLost"],
			keep_quoted: true,
		},
	},
	format: {
		comments: false,
	},
};

module.exports = [
	{
		input: "src/pubDefend.js",
		output: [
			{
				file: "dist/pubDefend.iife.js",
				name: "pubdefend",
				format: "iife",
			},
			{
				file: "dist/" + publisher + "pubDefend.iife.min.js",
				name: "pubdefend",
				format: "iife",
				plugins: [terser(terserOptions_v2)],
			},
			{
				file: "dist/" + publisher + "pubDefend.js",
				name: "pubdefend",
				format: "iife",
				plugins: [terser(terserOptions_prod), banner("PubDefend 1.1.1\nCopyright (c) 2020 Doron Miterani")],
			},
		],
		plugins: [
			resolve({
				browser: true,
			}),
			/* babel({
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
			}), */
			commonjs(),
			replace({
				exclude: "node_modules/**",
				//ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
				ENV: JSON.stringify(process.env.DOMAIN),
			}),
		],
	},
];

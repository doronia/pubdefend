const { exec } = require("child_process");

const { NODE_ENV = "development", DOMAIN = "" } = process.env;

exec("rollup -c --environment NODE_ENV:production,DOMAIN:sponser.co.il", (error, stdout, stderr) => {
	if (error) {
		console.log(`error: ${error.message}`);
		return;
	}
	if (stderr) {
		console.log(`stderr: ${stderr}`);
		return;
	}
	console.log(`stdout: ${stdout}`);
});

/* const env = "--environment NODE_ENV:production,DOMAIN:sponser.co.il";
const cmd = `rollup -c ${env}`;

function build(cmd, data, callback) {
	exec(cmd, function (err, stdout, stderr) {
		callback(err, stdout, stderr, data);
	});
}
 */

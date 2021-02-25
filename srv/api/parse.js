var msg = "eyJmaXAiOiI2MzQyODM5MDcuMjI2OTc1NjQ3NSIsImhvcyI6ImxvY2FsaG9zdCIsInB1YiI6eyJvcmciOiJzcG9uc2VyLmNvLmlsIiwicHJvcCI6InNwb25zZXIuY28uaWwifSwic2lkIjoxNTQ0NjYxMDg2LCJicnciOiJjaHJvbWUiLCJhYiI6ImZhbHNlIiwiZ2RzIjoyLCJncnMiOjJ9";

let buff = new Buffer.from(msg, "base64");
let text = buff.toString("ascii");

/* var decodeMsg = decode(msg);*/
var { sid, fip, host, pub, brw, ab, gds, grs } = JSON.parse(text);

console.log(pub);

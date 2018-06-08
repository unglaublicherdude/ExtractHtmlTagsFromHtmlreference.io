var https = require("https");
var fs = require("fs");

var req = https.get("https://htmlreference.io/", (res) => {
	var body = '';
	res.on('data', (d) => {
		body += d;
	});
	res.on('end', () => {
		var regex = /data-element-name="([^"]*)"/g;
		var matches = [];
		while (match = regex.exec(body)) {
			matches.push(match);
		}
		var stream = fs.createWriteStream("tags.txt");
		stream.once('open', (fd) => {
			for(var i=0;i<matches.length;i++) {
				stream.write(matches[i][1]+"\n");
			}	
			stream.end();
		});
	});
});

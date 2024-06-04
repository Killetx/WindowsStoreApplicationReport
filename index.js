var express = require('express');
var app = express();
const cors = require('cors');
const fs = require('fs')
const bodyParser = require('body-parser');
const { request } = require('express');

const port = process.env.PORT || 8080;

const corsoptions = {
    origin: ["*"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
};

app.use(bodyParser.json());
app.use(cors(corsoptions));


function log(log, logFile = "log.txt") {
    var date = new Date()
    fs.appendFileSync(logFile, `\n${date} | ` + log);
}

log("Backend Process Started.")

app.post('/scriptReport', (req, res) => {
    console.log('Received request:', req.headers); //logs header of request

    if (req.headers.key != "KEY") { //this is a key check, should you desire the extra security. If you want, replace "KEY" with a secure string in both this line of text, and the Powershell Script
        log("\n\n\n\n\nUNAUTHORIZED REQUEST RECEIVED ! ! ! !\n\n\n\n".repeat(3));
        log(req.body);
        log(req.headers);
        log("\n\n\n\n\nUNAUTHORIZED REQUEST RECEIVED ! ! ! !\n\n\n\n".repeat(3));
    } else { 
 


        log(`Inbound request from ${req.headers.host} on ${req.headers.device} in relation to ${req.headers.name}`)

        switch(req.headers.name) {
            case 'Report_Applications':
                var appJSON = JSON.parse(fs.readFileSync("applications.json")) /*reading applications.json, so that the data can be manipulated */
                try {
                    for(let i = 0; i < req.body.length -1; i++) { /*looping for every windows store application on the device that is reporting*/
    
                        if(appJSON[req.body[i].Name]) { /*checks if the application has already been reported*/
                            if(appJSON[req.body[i].Name][req.body[i].PackageFullName]) { //if it has, then it will check if the specific version has been reported
                                console.log(`${JSON.stringify(appJSON[req.body[i].Name])}, PackageFullName exists, adding device!`)
                                appJSON[req.body[i].Name][req.body[i].PackageFullName].push(req.headers.device);//if it has, then it will simply add the device to the list.
                            } else {
                                appJSON[req.body[i].Name][req.body[i].PackageFullName] = {}//if the specific version hasn't been reported, it will add it here...
                                appJSON[req.body[i].Name][req.body[i].PackageFullName] = [req.headers.device];//...then it will add the device to the list
                            }
                        } else {                            
                            appJSON[req.body[i].Name] = {};//if the application hadn't been seen by the script up until this point, it adds it to the json.
                            appJSON[req.body[i].Name][req.body[i].PackageFullName] = {}//then adds the specific version of the application
                            appJSON[req.body[i].Name][req.body[i].PackageFullName] = [req.headers.device];//and finally adds the device
                        }
                    }
                } catch(err) {
                    console.log("ERR", err)//err logging, just in case
                }
                fs.writeFileSync('applications.json', JSON.stringify(appJSON)); /*updates json file*/
                break;
                
        }
        res.send('Response');//lets the script know we got the information
    }
});

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
});

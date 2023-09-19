The purpose of this project is a script that can be mass ran on multiple machines, and report back to a node.js backend.
This was used in mass, thanks to "ManageEngine/EndpointCentral"
Specifically, it will generate a JSON of every microsoft store application installed on a computer, and each individual version.
See applications.json for an example output that has been somewhat obfuscated so that you can get the idea, but it doesn't leak anything.
See log.txt for an example output form the node.js api. 


To Use:
-Delete "applications.json", this is an example of the output.
-Same with "log.txt"
-Open ReportApplications, and modify the "YOURIP" with the ip of the machine hosting index.js.
-Download necessary Node.js Dependencies (download node.js, restart pc, open cmd, navigate to index.js's folder, run the below commands)

```
npm init (((((press enter until this command is complete)))))
npm install express
npm install axios
npm install body-parser
npm install cors
npm install fs
```

Run the program. `node .`
Run "ReportApplications.ps1" on all machines you're looking to report.

#Powershell script to report all windows store applications to a node.js api


 $head = @{
     "time" = get-date
     "key" = "KEY"
     "name" = "Report_Applications"
     "device"=[System.Net.Dns]::GetHostName()
 }


 $body = get-appxpackage | select Name, packagefullname | ConvertTo-JSON

 Invoke-RestMethod -Method 'Post' -Uri "http://YOURIP:8080/scriptReport" -Body $body -headers $head -ContentType "application/json"
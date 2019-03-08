$outputFile = 'C:/Scouting/eventdata.csv' 
Set-Content -Path $outputFile -Value "Match,Team,Event Number,Time"
$input = "go"
while ($input.tolower() -ne "q")
{
    $input = Read-Host -Prompt "Input QR scan"
    #to do: match 2 numbers separated by a space and a $ sign rather than 1 digit
    if ($input -notmatch "^\d") { 
        if ($input -ne "q") {
            Write-Host 'Did not detect valid match input, use "q" to exit' 
        }
        continue 
    }
    $matchdata = $input.split("#")
    foreach ($matchitem in $matchdata) 
    {
        $events = $matchitem.split("$")
        $robot = $events[0].Split(" ")[1]
        $match = $events[0].Split(" ")[0]
        foreach ($event in $events) 
        {
            if ($event -eq $events[0] -OR !$event ) {continue}
            $code = $event.split(" ")[0]
            $value = $event.split(" ")[1]
            $outline = $match + ',' + $robot + ',' + $code + ',' + $value
            Write-Host $outline
            Add-Content -Path $outputFile -Value $outline
            $destFile = 'C:/Scouting/Backup/eventdata_' + $match + $robot +'.csv' 
            Copy-Item -Path $outputFile -Destination $destFile 
        }
    }
    Clear-Host
} 
Write-Host "Thanks for using the scan collector!"

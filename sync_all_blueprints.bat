
@echo off
echo Syncing all blueprint files to suite command format...

for %%F in (blueprints\*.json) do (
    set "filename=%%~nF"
    echo Processing %%F...
    python tools\sync.py --from "blueprints\%%~nxF" --to "api\%%~nF_command.json"
)

echo Done syncing all blueprints.
pause

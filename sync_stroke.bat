
@echo off
echo Syncing stroke blueprint to suite command...
python tools\sync.py --from blueprints\stroke.json --to api\stroke_command.json
pause

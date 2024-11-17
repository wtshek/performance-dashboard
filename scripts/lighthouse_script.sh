#!/bin/bash

test_url=$1
filename=$2

# Create a directory for reports on the Desktop
REPORT_DIR="./reports"

echo "" > "$REPORT_DIR/$filename.json"

chmod 666 "$REPORT_DIR/$filename.json"
lighthouse $test_url --output=json --output-path="$REPORT_DIR/$filename.json" --quiet --chrome-flags="--headless" --emulatedUserAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36"




#!/bin/bash

test_url=$1
test_name=$2

# Create a directory for reports on the Desktop
REPORT_DIR="./reports"
mkdir -p "$REPORT_DIR"




# Loop to run Lighthouse 10 times with incremental filenames
for i in {1..10}
do
    echo "" > "$REPORT_DIR/$2$i.json"

    chmod 666 "$REPORT_DIR/$2$i.json"
    lighthouse $test_url --output=json --output-path="$REPORT_DIR/$2$i.json" --emulatedUserAgent="Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36"
done



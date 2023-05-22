#!/bin/bash

# Number of times to execute the curl command
iterations=10

# Function to execute curl command
execute_curl() {
    url="http://localhost:3030/upload"  # Replace with your desired URL
    account="$1"  # First parameter for the account variable
    id="$2"  # Second parameter for the id variable
    file="$3"  # Third parameter for the uploaded_file variable

    response=$(curl -s -F "account=$account" -F "id=$id" -F "uploaded_file=@$file" "$url")
    echo "Response: $response"
}

# Loop to execute curl command
for ((i=1; i<=$iterations; i++)); do
    account="test$i"  # Example: Change the account value for each iteration
    id="id$i"  # Example: Change the id value for each iteration
    file="./hcrt.ttl"  # Example: Change the file name for each iteration

    execute_curl "$account" "$id" "$file" &
done

# Wait for all background processes to finish
wait

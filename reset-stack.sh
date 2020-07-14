#!/bin/bash

sudo rm /tmp/localstack/data/recorded_api_calls.json
until echo $(curl --proxy http://localhost:8091 http://localhost:4583/ping) | grep '404 Not Found'; do sleep 1; done
awslocal ecr create-repository --repository-name aws-cdk/assets
awslocal ssm put-parameter \
    --name "/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-gp2" \
    --value "ami-09d95fab7fff3776c" \
    --type String \
    --data-type "text"

# bootstrap
npx cdk bootstrap aws://000000000000/us-east-1 --bootstrap-bucket-name LocalBucket --proxy http://localhost:8091 --endpoint-url http://localhost:4566 --profile localadmin

# deploy
npx cdk deploy --proxy http://localhost:8091 --endpoint-url http://localhost:4566 --bootstrap-bucket-name LocalBucket --profile localadmin --execute

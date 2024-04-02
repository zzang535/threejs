#!/bin/bash

# color print method
print_colored() {
  local COLOR=$1
  local MSG=$2
  printf "\e[${COLOR}m${MSG}\e[0m\n"
}

# color code
YELLOW="33"

# build
npm run build
print_colored $YELLOW "Built the project."

# s3 sync
aws s3 sync ./dist s3://threejs-material.bird89.com --profile=default
print_colored $YELLOW "Finished deployment."
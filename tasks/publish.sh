#!/bin/bash

# Start in tasks/ even if run from root directory
cd "$(dirname "$0")"

# Go to root
cd ..
root_path=$PWD

if [ -n "$(git status --porcelain)" ]; then
  echo "Your git status is not clean. Please commit your changes before publish.";
  exit 1;
fi

# Remove dist
rm -rf dist

# Compile
npm run build

# Go!
npm publish
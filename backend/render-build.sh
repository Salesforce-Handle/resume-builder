#!/usr/bin/env bash
set -o errexit  # Exit on error

npm install

# Puppeteer cache persistence (optional but helpful on Render)
if [[ ! -d $PUPPETEER_CACHE_DIR ]]; then 
  echo "Copying Puppeteer cache from build cache..."
  cp -R $XDG_CACHE_HOME/puppeteer/ $PUPPETEER_CACHE_DIR
else 
  echo "Storing Puppeteer cache in build cache..."
  cp -R $PUPPETEER_CACHE_DIR $XDG_CACHE_HOME
fi

#!/bin/sh
# Health check script for Docker container
# Verifies that nginx is serving the application

set -e

# Check if nginx is responding
if wget --quiet --tries=1 --spider http://localhost:4003/ ; then
  echo "Health check passed: nginx is responding"
  exit 0
else
  echo "Health check failed: nginx is not responding"
  exit 1
fi

#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_error() {
  echo -e "${RED}Error: $1${NC}" >&2
}

print_success() {
  echo -e "${GREEN}$1${NC}"
}

print_info() {
  echo "$1"
}

print_step() {
  echo -e "${BLUE}==> $1${NC}"
}

print_end() {
  echo -e "${BLUE}=== $1 ===${NC}"
}

usage() {
  echo "Usage: $0 <RELEASE_PATH> <EXB_PATH>"
  echo ""
  echo "Arguments:"
  echo "  RELEASE_PATH  Path to zip relase"
  echo "  EXB_PATH   Path to EXB root directory"
  echo ""
  echo "Example:"
  echo "  $0 ./street-view-1.0.0-exb_1.11.zip /Users/nino/Documents/dev/exb11"
  exit 1
}

EXB_PATH="$2"
RELEASE_PATH="$1"

# Validate EXB path is provided
if [[ -z "$EXB_PATH" ]]; then
  print_error "EXB path is required"
  usage
fi

# Validate EXB path exists
if [[ ! -d "$EXB_PATH" ]]; then
  print_error "EXB path does not exist: $EXB_PATH"
  exit 1
fi

# Validate EXB structure
EXB_CLIENT="$EXB_PATH/client"
EXB_DIST_WIDGETS="$EXB_CLIENT/dist/widgets"

if [[ ! -d "$EXB_CLIENT" ]]; then
  print_error "Invalid EXB path. Could not find: $EXB_CLIENT"
  print_info "Make sure you point to the root of your EXB installation."
  exit 1
fi

if [[ ! -d "$EXB_DIST_WIDGETS" ]]; then
  print_error "Invalid EXB path. Could not find: $EXB_DIST_WIDGETS"
  print_info "Make sure you point to the root of your EXB installation."
  exit 1
fi

echo ""
print_step "Step 1: Copy and extract release to $EXB_DIST_WIDGETS"

print_info "Copying release..."
cp "$RELEASE_PATH" "$EXB_DIST_WIDGETS/release.zip"
print_success "Release copied"

# Extract with override
print_info "Extracting release..."
unzip -o "$EXB_DIST_WIDGETS/release.zip" -d "$EXB_DIST_WIDGETS"
print_success "Release extracted"

echo ""
print_step "Step 2: Add street-view entry to widgets-info.json"

WIDGETS_INFO_FILE="$EXB_DIST_WIDGETS/widgets-info.json"
TO_COPY_FILE="$EXB_DIST_WIDGETS/to-copy-in-widgets-info.json"

if [[ -f "$WIDGETS_INFO_FILE" ]]; then
  print_info "Copying street-view entry..."
  node -e "
    const fs = require('fs');
    const widgetsInfo = JSON.parse(fs.readFileSync('$WIDGETS_INFO_FILE', 'utf8'));
    const streetViewEntry = JSON.parse(fs.readFileSync('$TO_COPY_FILE', 'utf8'));
    const filteredWidgetsInfo = widgetsInfo.filter(widget => widget.name !== 'street-view' );
    filteredWidgetsInfo.push(streetViewEntry);
    fs.writeFileSync('$WIDGETS_INFO_FILE', JSON.stringify(filteredWidgetsInfo, null, 2));
  "
  print_success "Copied street-view entry"
else
  print_error "widgets-info.json not found at: $WIDGETS_INFO_FILE"
  exit 1
fi

echo ""
print_step "Step 3: Cleaning up..."

print_info "deleting $EXB_DIST_WIDGETS/release.zip and $EXB_DIST_WIDGETS/to-copy-in-widgets-info.json..."
rm "$EXB_DIST_WIDGETS/release.zip" "$EXB_DIST_WIDGETS/to-copy-in-widgets-info.json"
print_success "deleted $EXB_DIST_WIDGETS/release.zip and $EXB_DIST_WIDGETS/to-copy-in-widgets-info.json"

echo ""
print_end "Release installed to $EXB_PATH"

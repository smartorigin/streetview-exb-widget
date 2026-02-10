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

print_warning() {
  echo -e "${YELLOW}Warning: $1${NC}"
}

print_info() {
  echo "$1"
}

print_step() {
  echo -e "${BLUE}==> $1${NC}"
}

usage() {
  echo "Usage: $0 <EXB_PATH> <EXB_VERSION>"
  echo ""
  echo "Arguments:"
  echo "  EXB_PATH      Path to Experience Builder installation"
  echo "  EXB_VERSION   Experience Builder version (e.g., 11, 12)"
  echo ""
  echo "Example:"
  echo "  $0 /path/to/exb 12"
  exit 1
}

# Script configuration
WIDGET_NAME="street-view"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

EXB_PATH="$1"
EXB_VERSION="$2"

NODE_VERSION="22"

# Set node version based on exb version
case $2 in
19 | 18 | 17)
  NODE_VERSION="22"
  ;;
16 | 15)
  NODE_VERSION="20"
  ;;
14)
  NODE_VERSION="18"
  ;;
13 | 12 | 11 | 10)
  NODE_VERSION="16"
  ;;
9 | 8 | 7 | 6 | 5 | 4)
  NODE_VERSION="14"
  ;;
esac

# Validate EXB path is provided
if [[ -z "$EXB_PATH" ]]; then
  print_error "Experience Builder path is required"
  usage
fi

# Validate EXB version is provided
if [[ -z "$EXB_VERSION" ]]; then
  print_error "Experience Builder version is required"
  usage
fi

# Validate EXB path exists
if [[ ! -d "$EXB_PATH" ]]; then
  print_error "Experience Builder path does not exist: $EXB_PATH"
  exit 1
fi

# Validate EXB structure
EXB_CLIENT="$EXB_PATH/client"
EXB_YOUR_EXTENSIONS="$EXB_CLIENT/your-extensions/widgets"
EXB_DIST_WIDGETS="$EXB_CLIENT/dist/widgets"

if [[ ! -d "$EXB_CLIENT" ]]; then
  print_error "Invalid Experience Builder path. Could not find: $EXB_CLIENT"
  print_info "Make sure you point to the root of your Experience Builder installation."
  exit 1
fi

# Check for widget source in this project
WIDGET_SOURCE="$SCRIPT_DIR/src/$WIDGET_NAME"
if [[ ! -d "$WIDGET_SOURCE" ]]; then
  print_error "Widget source not found at: $WIDGET_SOURCE"
  print_info "Make sure you run this script from the widget project root."
  exit 1
fi

print_info "Found widget source at: $WIDGET_SOURCE"

# Check for manifest.json
MANIFEST_FILE="$WIDGET_SOURCE/manifest.json"
if [[ ! -f "$MANIFEST_FILE" ]]; then
  print_error "manifest.json not found at: $MANIFEST_FILE"
  exit 1
fi

# Read widget version from manifest.json
WIDGET_VERSION=$(node -p "require('$MANIFEST_FILE').version")
print_info "Widget version: $WIDGET_VERSION"

echo ""
print_step "Step 1: Copy widget to your-extensions"

# Create your-extensions directory if it doesn't exist
if [[ ! -d "$EXB_YOUR_EXTENSIONS" ]]; then
  print_info "Creating your-extensions directory..."
  mkdir -p "$EXB_YOUR_EXTENSIONS"
fi

# Destination in your-extensions
YOUR_EXTENSIONS_DEST="$EXB_YOUR_EXTENSIONS/$WIDGET_NAME"

# Check if widget already exists in your-extensions
if [[ -d "$YOUR_EXTENSIONS_DEST" ]]; then
  print_warning "Widget already exists in your-extensions"
  print_info "Removing old version..."
  rm -rf "$YOUR_EXTENSIONS_DEST"
fi

# Copy widget to your-extensions
print_info "Copying widget to: $YOUR_EXTENSIONS_DEST"
cp -r "$WIDGET_SOURCE" "$YOUR_EXTENSIONS_DEST"
print_success "Widget copied to your-extensions!"

echo ""
print_step "Step 2: Build widget"

cd "$EXB_CLIENT"

# Get the current node version
CURRENT_NODE_VERSION=$(node -v 2>/dev/null | sed 's/v//' | cut -d'.' -f1)

# Switch the node version using nvm/fnm
if [[ "$CURRENT_NODE_VERSION" != "$NODE_VERSION" ]]; then
  if [ -x "$(command -v fnm)" ]; then
    print_info "Switching to node $NODE_VERSION ..."
    fnm use "$NODE_VERSION"
  elif [ -x "$(command -v nvm)" ]; then
    print_info "Switching to node $NODE_VERSION ..."
    nvm use "$NODE_VERSION"
  else
    print_error "Fnm or nvm are required to switch node version"
    exit 1
  fi
fi

# Check if node_modules exists
if [[ ! -d "node_modules" ]]; then
  print_error "node_modules not found in $EXB_CLIENT"
  print_info "Please run 'npm install' in your Experience Builder client directory first."
  exit 1
fi

# Build the widget (this builds all widgets in your-extensions)
print_info "Running: npm run build:dev"
print_warning "This will build all widgets in your-extensions (EXB doesn't support building individual widgets)"
npm run build:dev

cd "$SCRIPT_DIR"

echo ""
print_step "Step 3: Create release"

# Create temporary directory for release output
TEMP_DIST="$SCRIPT_DIR/.temp-dist"
rm -rf "$TEMP_DIST"
mkdir -p "$TEMP_DIST"

cp -r "$EXB_DIST_WIDGETS/street-view" "$TEMP_DIST/street-view"

# Extract only the street-view entry from widgets-info.json
WIDGETS_INFO_FILE="$EXB_DIST_WIDGETS/widgets-info.json"
if [[ -f "$WIDGETS_INFO_FILE" ]]; then
  print_info "Extracting street-view entry from widgets-info.json..."
  node -e "
    const fs = require('fs');
    const widgetsInfo = JSON.parse(fs.readFileSync('$WIDGETS_INFO_FILE', 'utf8'));
    const streetViewEntry = { 'street-view': widgetsInfo['street-view'] };
    fs.writeFileSync('$TEMP_DIST/street-view/to-copy-in-widgets-info.json', JSON.stringify(streetViewEntry, null, 2));
  "
  print_success "Extracted street-view entry"
else
  print_error "widgets-info.json not found at: $WIDGETS_INFO_FILE"
  exit 1
fi

# Create zip from temp directory
cd "$TEMP_DIST"
zip -r "$SCRIPT_DIR/street-view-$WIDGET_VERSION-exb_1.$EXB_VERSION.zip" "street-view"
cd "$SCRIPT_DIR"

# Clean up temp directory
rm -rf "$TEMP_DIST"

print_success "Release created: street-view-$WIDGET_VERSION-$EXB_VERSION.zip"

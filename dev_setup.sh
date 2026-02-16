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

usage() {
	echo "Set up local EXB widget development"
	echo ""
	echo "Usage: $0 <EXB_PATH>"
	echo ""
	echo "Arguments:"
	echo "  EXB_PATH      Path to the EXB root directory"
	echo ""
	echo "Behavior:"
	echo "  - Symlinks EXB packages (node_modules, jimu-*) into this repo"
	echo "  - Copies EXB tsconfig.json and scopes it to ./src"
	echo ""
	echo "Example:"
	echo "  $0 /Users/nino/Documents/dev/exb"
	exit 1
}

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

EXB_PATH="$1"

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

if [[ ! -d "$EXB_CLIENT" ]]; then
	print_error "Invalid EXB path"
	print_info "Missing: $EXB_CLIENT"
	print_info "Point to the root of your EXB installation"
	exit 1
fi

echo ""
print_step "Linking EXB dependencies"

# Link dependencies
ln -s "$EXB_CLIENT/node_modules" "$SCRIPT_DIR/node_modules"
ln -s "$EXB_CLIENT/jimu-ui" "$SCRIPT_DIR/jimu-ui"
ln -s "$EXB_CLIENT/jimu-icons" "$SCRIPT_DIR/jimu-icons"
ln -s "$EXB_CLIENT/jimu-core" "$SCRIPT_DIR/jimu-core"
ln -s "$EXB_CLIENT/jimu-arcgis" "$SCRIPT_DIR/jimu-arcgis"
ln -s "$EXB_CLIENT/jimu-for-builders" "$SCRIPT_DIR/jimu-for-builder"

print_success "Dependencies linked"

echo ""
print_step "Creating tsconfig.json"

print_info "Importing: $EXB_CLIENT/tsconfig.json"
cp "$EXB_CLIENT/tsconfig.json" "$SCRIPT_DIR/tsconfig.json"
print_success "tsconfig.json imported"

TSCONFIG_FILE="$SCRIPT_DIR/tsconfig.json"
if [[ -f "$TSCONFIG_FILE" ]]; then
	print_info "Scoping tsconfig include to ./src"
	node -e "
    const fs = require('fs');
    const tsConfig = JSON.parse(fs.readFileSync('$TSCONFIG_FILE', 'utf8'));
    tsConfig.include = [\"src\"]
    fs.writeFileSync('$TSCONFIG_FILE', JSON.stringify(tsConfig, null, 2));
  "
	print_success "tsconfig updated"
else
	print_error "tsconfig.json not found"
	print_info "Expected: $SCRIPT_DIR/tsconfig.json"
	exit 1
fi

echo ""
print_success "Dev environment ready"
echo ""
print_info "Add to your .gitignore:"
print_info "jimu-*"
print_info "tsconfig.json"
print_info "node_modules"

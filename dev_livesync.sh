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
  echo "Sync an EXB widget to your Experience Builder install"
  echo ""
  echo "Usage: $0 <WIDGET_NAME> <EXB_PATH>"
  echo ""
  echo "Arguments:"
  echo "  WIDGET_NAME   Widget folder name under ./src"
  echo "  EXB_PATH      Path to the EXB root directory"
  echo ""
  echo "Behavior:"
  echo "  - Runs a one-time rsync to <EXB_PATH>/client/your-extensions/widgets"
  echo "  - If fswatch is installed, starts continuous sync on changes"
  echo ""
  echo "Example:"
  echo "  $0 street-view /Users/nino/Documents/dev/exb"
  exit 1
}

# Check if rsync is installed
if ! [ -x "$(command -v rsync)" ]; then
  echo ""
  print_error "rsync is required"
  print_info "Install with: brew install rsync"
  exit 1
fi

# Check if fswatch is installed
if ! [ -x "$(command -v fswatch)" ]; then
  echo ""
  print_error "fswatch is not installed"
  print_info "Live sync will be disabled. Install with: brew install fswatch"
fi

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

WIDGET_NAME="$1"
EXB_PATH="$2"

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
EXB_WIDGETS="$EXB_PATH/client/your-extensions/widgets"
if [[ ! -d "$EXB_WIDGETS" ]]; then
  print_error "Invalid EXB structure"
  print_info "Missing: $EXB_WIDGETS"
  print_info "Point to the root of your EXB installation"
  exit 1
fi

# Validate widget source
WIDGET_SOURCE="$SCRIPT_DIR/src/$WIDGET_NAME"
if [[ ! -d $WIDGET_SOURCE ]]; then
  print_error "Widget source not found"
  print_info "Expected: $WIDGET_SOURCE"
  exit 1
fi

SRC=$WIDGET_SOURCE
DST="$EXB_WIDGETS"

echo ""
print_step "Sync $SRC -> $DST"

rsync -avu --delete "$SRC" "$DST"
print_success "Sync complete"

# Sync with watch if fswatch is installed
if [ -x "$(command -v fswatch)" ]; then
  echo ""
  print_step "Live sync enabled (watching $SRC)"

  fswatch -o "$SRC" | xargs -n1 -I{} rsync -avu --delete "$SRC" "$DST"
else
  echo ""
  print_info "Live sync is off (fswatch not installed)"
  print_info "Install: brew install fswatch"
fi

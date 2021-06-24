# Download Contrast Security Agent javascript action

This action downloads a Contrast Security agent in a directory.

## Inputs

### `agent-type`

**Required** Type of Contrast Agent to download. Default `"java"`.

### `download-location`

**Required** Location where Contrast Security agent will be downloaded to. Default `"local"`.

## Outputs

### `success-message`

String generated confirming successful download of Contrast Security agent

## Example usage

uses: admiralappsec/contrast-github-actions@main
with:
  agent-type: 'java'
  download-location: 'local'

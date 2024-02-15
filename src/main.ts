import { generateReport } from "./report";

import settings from "../data/settings.json"

/* Main module */
/* This module orchestrates the whole app. */

// Check if the VPN is off, as that prevents communication with
// the Spreadsheets API. If it is on, an attempt is made to turn
// it off and everything crashes if that attempt fails.
function isTheVpnOff() {
    // stub
}

// Check if Anki is running, so that its API can receive calls.
// If it isn't, an attempt is made to start it and everything
// crashes if that attempt fails.
function isAnkiRunning() {
    // stub
}

// Check if the latest sync happened less than 12 hours ago.
// Sync can be forced with the CLI option --force.
function validateRecency() {
    if (process.argv.includes('--force')) return true;
    const now = Date.now();
    const last_updated = Date.parse(settings.last_updated);
    return now - (12 * 60 * 60 * 1000) > last_updated;
}

// Set up conditions for the sync to work
function setup() {
    isAnkiRunning()
    isTheVpnOff()
    validateRecency()
}

function isWetRun(): boolean {
    return !process.argv.includes("--dry-run")
}

function saveChanges(report: AnkinatorReport): void {

}

// Synchronize between the Google Spreadsheet and Anki.
// Whenever this runs, there should be a bijection between rows
// in the spreadsheet and cards in the deck, meaning all fronts,
// backs and IDs match.
//
// A report is generated first, to describe what work needs to
// be done. If the --dry-run CLI option is not set, the changes
// are written both to Sheets and Anki.
function main(): void {
    setup()

    const report = generateReport()

    if (isWetRun()) {
        saveChanges(report)
    }
}

main();


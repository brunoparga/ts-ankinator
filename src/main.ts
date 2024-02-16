import { createFlashcards } from "./anki";
import { updateSpreadsheet } from "./google-sheets";
import { generateReport } from "./report";
import { setup } from "./setup";

/* Main module */
/* This module orchestrates the whole app. */

// Determine if this is a dry or wet run, to save on API hits.
function isWetRun(): boolean {
    // eslint-disable-next-line sonar/process-argv
    return !process.argv.includes("--dry-run");
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
function saveChanges(report: AnkinatorReport): void {
    const insertions = createFlashcards(report)

    updateSpreadsheet(insertions)
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
    setup();

    const report = generateReport();

    if (isWetRun()) {
        saveChanges(report);
    }
}

main();

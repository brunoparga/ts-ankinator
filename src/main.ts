import type { GoogleSpreadsheetWorksheet } from "google-spreadsheet";

import { createFlashcards } from "./anki";
import type { AnkinatorReport } from "./ankinator";
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

async function saveChanges(
    sheet: GoogleSpreadsheetWorksheet,
    report: AnkinatorReport,
): Promise<void> {
    const insertions = createFlashcards(report);

    await updateSpreadsheet(insertions);
}

// Synchronize between the Google Spreadsheet and Anki.
// Whenever this runs, there should be a bijection between rows
// in the spreadsheet and cards in the deck, meaning all fronts,
// backs and IDs match.
//
// A report is generated first, to describe what work needs to
// be done. If the --dry-run CLI option is not set, the changes
// are written both to Sheets and Anki.
async function main(): Promise<void> {
    setup();

    const sheet = loadSpreadsheet();
    const report: AnkinatorReport = generateReport(sheet);

    if (isWetRun()) {
        await saveChanges(sheet, report);
    }
}

await main();

import type { GoogleSpreadsheetWorksheet } from "google-spreadsheet";

import type { AnkinatorReport } from "./ankinator";

/* Reports */

// Read from both sources and generate a report of what needs to
// be done.

export function generateReport(
    ignore: GoogleSpreadsheetWorksheet,
): AnkinatorReport {
    return {
        deckNeedsCard: [],
        divergentEntries: [],
        errors: [],
        perfectMatches: 0,
        sheetNeedsId: [],
        totalFlashcards: 0,
        totalSheetRows: 0,
    };
}

import type {
    GoogleSpreadsheetRow,
    GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

import type { Insert } from "./ankinator";

function insertIdInRow(accumulator: undefined, ignore: GoogleSpreadsheetRow) {
    return accumulator;
}

export function loadSpreadsheet(): GoogleSpreadsheetWorksheet {}

// Make all corrections that might be required in the spreadsheet:
// inserts of IDs of newly created cards and updates of cards that
// diverged between both sources.
export async function updateSpreadsheet(
    sheet: GoogleSpreadsheetWorksheet,
    inserts: readonly Insert[],
): Promise<void> {
    inserts.reduce(insertIdInRow);
    await sheet.saveUpdatedCells();
}

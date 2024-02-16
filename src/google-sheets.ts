/* eslint-disable no-duplicate-imports, import/no-duplicates, putout/putout */
import { JWT } from "google-auth-library";
import type { GoogleSpreadsheetWorksheet } from "google-spreadsheet";
import { GoogleSpreadsheet } from "google-spreadsheet";

import credentials from "../data/api_key.json";
import settings from "../data/settings.json";
import type { Insert } from "./ankinator";

function buildJwt(): JWT {
    return new JWT({
        email: credentials.client_email,
        key: credentials.private_key,
        scopes: credentials.scopes,
    });
}

// Read the spreadsheet from Google and return it.
export async function loadSpreadsheet(): Promise<GoogleSpreadsheetWorksheet> {
    const document: GoogleSpreadsheet = new GoogleSpreadsheet(
        settings.file_id,
        buildJwt(),
    );

    try {
        await document.loadInfo();
    } catch {
        throw new Error("Couldn't load Google Spreadsheet.");
    }

    const {
        sheetsByTitle: { [settings.deck_name]: sheet },
    } = document;

    if (sheet === undefined) {
        throw new Error(
            `Couldn't read worksheet ${settings.deck_name} from Google Spreadsheet.`,
        );
    } else {
        return sheet;
    }
}

// Make all corrections that might be required in the spreadsheet:
// inserts of IDs of newly created cards and updates of cards that
// diverged between both sources.
export async function updateSpreadsheet(
    sheet: GoogleSpreadsheetWorksheet,
    inserts: readonly Insert[],
): Promise<void> {
    inserts.flat();

    try {
        await sheet.saveUpdatedCells();
    } catch {
        throw new Error("Couldn't save the changes to Google Spreadsheet.");
    }
}

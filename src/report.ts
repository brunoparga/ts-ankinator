/* Reports */

// Read from both sources and generate a report of what needs to
// be done.

export function generateReport(): AnkinatorReport {
  return {
    deckNeedsCard: [],
    divergentEntries: [],
    errors: [],
    perfectMatches: 0,
    sheetNeedsId: [],
    totalFlashcards: 0,
    totalSheetRows: 0
  }
}
/* Reports */

// Read from both sources and generate a report of what needs to
// be done.

export function generateReport(): AnkinatorReport {
  return {
  totalSheetRows: 0,
  totalFlashcards: 0,
  perfectMatches: 0,
  sheetNeedsId: [],
  divergentEntries: [],
  deckNeedsCard: [],
  errors: []
}
}
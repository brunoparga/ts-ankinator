type TargetLanguageText = string
type SupportLanguageText = string
type cardID = number

interface Duo {
  front: TargetLanguageText,
  back: SupportLanguageText
}

interface Trio extends Duo {
  ID: cardID
}

type MismatchError = {
  sheetRow: Trio,
  flashcard: Trio
}

type AnkinatorReport = {
  totalSheetRows: number,
  totalFlashcards: number,
  perfectMatches: number,
  sheetNeedsId: Array<Duo>,
  divergentEntries: Array<Trio>,
  deckNeedsCard: Array<Duo>,
  errors: Array<MismatchError>
}
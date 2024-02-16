type TargetLanguageText = string
type SupportLanguageText = string
type CardID = number
// stub type
type Insertion = undefined

interface Duo {
  readonly front: TargetLanguageText,
  readonly back: SupportLanguageText
}

interface Trio extends Duo {
  readonly id: CardID
}

type MismatchError = {
  readonly sheetRow: Trio,
  readonly flashcard: Trio
}

type AnkinatorReport = {
  readonly totalSheetRows: number,
  readonly totalFlashcards: number,
  readonly perfectMatches: number,
  readonly sheetNeedsId: readonly Duo[],
  readonly divergentEntries: readonly Trio[],
  readonly deckNeedsCard: readonly Duo[],
  readonly errors: readonly MismatchError[]
}
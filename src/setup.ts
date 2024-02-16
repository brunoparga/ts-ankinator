// eslint-disable-next-line import/extensions
import settings from "../data/settings.json";

// Check if the VPN is off, as that prevents communication with
// the Spreadsheets API. If it is on, an attempt is made to turn
// it off and everything crashes if that attempt fails.
function isTheVpnOff(): void {
    // stub
}

// Check if Anki is running, so that its API can receive calls.
// If it isn't, an attempt is made to start it and everything
// crashes if that attempt fails.
function isAnkiRunning(): void {
    // stub
}

// Functions can have at most 10 statements, using the ESLint config
// that I am using. So this extracts a few statements
// from `validateRecency`. Of course one cannot just have magical
// numbers lying around.
function twelveHours(): number {
    const minimumHours = 12;
    const minutesInOneHour = 60;
    const secondsInOneMinute = 60;
    const millisecondsInOneSecond = 1000;

    return (
        minimumHours *
        minutesInOneHour *
        secondsInOneMinute *
        millisecondsInOneSecond
    );
}

// Check if the latest sync happened more than 12 hours ago.
// Sync can be forced with the CLI option --force.
function validateRecency(): void {
    // eslint-disable-next-line sonar/process-argv
    if (process.argv.includes("--force")) {
        return;
    }

    const now = Date.now();
    const lastUpdated = Date.parse(settings.last_updated);

    if (lastUpdated > now - twelveHours()) {
        throw new Error(
            "The collections have been synchronized less than 12 hours ago.",
        );
    }
}

// Set up conditions for the sync to work. Anki must be running,
// my VPN should not and the most recent sync must have been at
// least twelve hours ago.
export function setup() {
    isAnkiRunning();
    isTheVpnOff();
    validateRecency();
}

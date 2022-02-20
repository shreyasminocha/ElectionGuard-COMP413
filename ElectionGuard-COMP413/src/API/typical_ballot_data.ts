/* eslint-disable */
export class LanguageText {
    languageID: string;
    text: string;
}

export enum BallotMarkerType {
    Wizard = 0,
    List = 1,
    Grid = 2
}

export enum ErrorType {
    MissingElectionName = 0,
    MissingBallotPartyId = 1,
    MissingBallotPartyName = 2,
    MissingPrecinctName = 3,
    MissingPrecintId = 4,
    MissingBallotId = 5,
    MissingBallotItems = 6,
    MissingBallotOptions = 7,
    MissingCandidateName = 8,
    MissingCandidateId = 9,
    MissingCandidatePartyId = 10,
    MissingCandidatePartyName = 11
}

export class Ballot {
    id: string;
    electionName: LanguageText[];
    /// These are fields that we probably won't need ///
    title: LanguageText[];
    subTitle: LanguageText[];
    text1: LanguageText[];
    text2: LanguageText[];
    markingInstructions: LanguageText[];
    printableInstructions: LanguageText[];
    ///////////////////////////////////////////////////
    partyId: string;
    partyName: LanguageText[];
    precinctName: string;
    precinctId: string;
    ballotMarkerLayoutType: BallotMarkerType;

    //wizard types
    ballotItems: BallotItem[];

    //List and grid types
    ballotPages: BallotPage[];

    constructor(id: string, electionName: string, ballotItems: BallotItem[]) {
        this.id = id;
        this.ballotItems = ballotItems;
        let eName = new LanguageText();
        eName.text = electionName;
        this.electionName = [eName];
    }

}
export class BallotPage {
    gridRows: GridRow[];
    ballotItems: BallotItem[];
}
export class GridRow {
    id: string;
    order: number;
    label: LanguageText[];
}


export class BallotItem {
    id: string;
    order: number;
    type: BallotItemType;
    title: LanguageText[];
    subTitle: LanguageText[];
    instructions: LanguageText[];
    referendum: LanguageText[];
    text1: LanguageText[];
    text2: LanguageText[];
    partyId: string;
    partyName: LanguageText[];
    writeInText: LanguageText[];
    voteForMax: number;
    writeIns: number;

    ballotOptions: BallotOption[];

    selectionsRemaining: number;

    // behavior
    undervoteWarningEnabled: boolean;
    overvoteWarningEnabled: boolean;

    constructor(ballotId: string, order: number, ballotOptions: BallotOption[]) {
        this.id = ballotId;
        this.order = order;
        this.ballotOptions = ballotOptions;
    }
}

export enum BallotItemType {
    Office = 1,
    Question = 2,
    Office_RankedChoice = 10
}

export class BallotOption {

    id: string;
    object_id: string;
    order: number; // the order of the selection
    type: BallotOptionType;
    candidateId: string;
    title: LanguageText[]; // candidate name
    subTitle: LanguageText[];
    text1: LanguageText[];
    text2: LanguageText[];
    partyId: string;
    partyName: LanguageText[];
    selected: boolean = false;
    writeInSelection: string;
    rank: number;

    constructor(candidateName: string, selected: boolean, order: number) {
        // let name = new LanguageText();
        // name.text = candidateName;
        this.object_id = candidateName;
        this.order = order;
        // this.title = [name];
        this.selected = selected;
    }
}

export enum BallotOptionType {
    Typical = 1,
    WriteIn = 2,
    Typical_RightSideMark = 10,
    WriteIn_RightSideMark = 11,
    RankedChoice = 20,
    GroupHeader = 50,
    NoCandidate = 99,
    Empty = 100
}

export class EncryptBallotOutput {
    seed: string = "-1";
    hash: string = "-1";

    constructor(seed: string, hash: string) {
        this.seed = seed;
        this.hash = hash;
    }
}

// This is a class that represent error ballot input 
export class ErrorBallotInput {
    errorType: number;
    errorMsg: string;
    constructor(errorType: number, errorMsg: string) {
        this.errorType = errorType;
        this.errorMsg = errorMsg;
    }

    getErrorType() {
        return this.errorType;
    }

    getErrorMsg() {
        return this.errorMsg;
    }
}
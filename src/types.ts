export interface IIntents {
    intent: string
    language: string
    utterances: string[]
    answers: IAnswer[]
}

export interface IMapEntry {
    id: string
    ownerID: string
    intents: IIntents[]
}

export interface IUtterance {
    text: string
    parameters: IParameter[]
}

export interface IParameter {
    name: string
    value: string
}

export interface IAnswer {
    text: string
    actions: string[]
}

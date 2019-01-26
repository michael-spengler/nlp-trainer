export interface IIntent {
    name: string
    language: string
    utterances: string[]
    answers: IAnswer[]
}

export interface ICurriculum {
    id: string
    ownerID: string
    intents: IIntent[]
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

import * as uniqid from "uniqid"
import { exampleMap } from "./example-data"
import { IAnswer, IIntent, IMapEntry as IDataEntry } from "./types"

export class NLPTrainer {

    private static validateTrainingData(intents: IIntent[]): string[] {
        const errors: string[] = []
        const utterances: string[] = []
        const actions: string[] = []

        intents.forEach((intent: IIntent) => {
            intent.answers.forEach((answer: IAnswer) => {
                answer.actions.forEach((action: string) => {
                    actions.push(action)
                })
            })
        })

        intents.forEach((intent: IIntent) => {
            intent.utterances.forEach((utterance: string) => {
                utterances.push(utterance)
            })
        })

        actions.forEach((action: string) => {
            if (!utterances.some((utterance: string) => utterance === action)) {
                errors.push(`Please add an utterance for action: ${action}`)
            }
        })

        return errors
    }

    private trainingDataLibrary: IDataEntry[] = []

    public constructor() {
        const exampleMapEntry: IDataEntry = {
            id: "exampleMap",
            intents: exampleMap,
            ownerID: "exampleUser",
        }
        this.trainingDataLibrary.push(exampleMapEntry)
    }

    public deleteTrainingDataEntry(id: string, ownerID: string): void {
        const index: number = this.trainingDataLibrary.indexOf(
            this.trainingDataLibrary.filter((entry: IDataEntry) => {
                if (entry.id === id && entry.ownerID === ownerID) {
                    return entry
                }
            })[0])
        if (index !== -1) {
            this.trainingDataLibrary.splice(index, 1)
        }
    }

    public saveTrainingDataEntry(id: string, trainingData: IIntent[]): IDataEntry {

        if (this.trainingDataLibrary.some((entry: IDataEntry) => id === entry.id)) {
            throw new Error(`tried to save duplicate entries for id ${id}`)
        }

        if (NLPTrainer.validateTrainingData(trainingData).length > 0) {
            throw new Error(`Errors while validating training data: \n${NLPTrainer.validateTrainingData(trainingData)}`)
        } else {

            const newMapEntry: IDataEntry = {
                id,
                intents: trainingData,
                ownerID: uniqid(`ownerID-${new Date().toISOString()}`),
            }

            this.trainingDataLibrary.push(newMapEntry)

            return newMapEntry
        }
    }

    public getTrainingMap(id: string): IIntent[] | undefined {

        const filteredMaps: IDataEntry[] =
            this.trainingDataLibrary.filter((map: IDataEntry) => map.id === id)

        if (filteredMaps.length > 1) {
            throw new Error(`duplicate entries for id ${id}`)
        } else if (filteredMaps.length === 1) {
            return filteredMaps[0].intents
        } else {
            return undefined
        }
    }
}

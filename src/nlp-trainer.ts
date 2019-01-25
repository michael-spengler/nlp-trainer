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

    private readonly trainingDataLibrary: IDataEntry[] = []

    public constructor() {
        const exampleMapEntry: IDataEntry = {
            id: "exampleMap",
            intents: exampleMap,
            ownerID: "exampleUser",
        }
        this.trainingDataLibrary.push(exampleMapEntry)
    }

    public async deleteMapEntry(id: string, ownerID: string): Promise<void> {

        // delete from DB can be implemented here

        const index: number = this.trainingDataLibrary.indexOf(
            this.trainingDataLibrary.filter((entry: IDataEntry) => {
                if (entry.id === id && entry.ownerID === ownerID) {
                    return entry
                }
            })[0])
        if (index === -1) {
            throw new Error(`tried to delete something which is not there id: ${id} ownerID: ${ownerID}`)
        } else {
            this.trainingDataLibrary.splice(index, 1)
        }
    }

    public async saveMapEntry(id: string, trainingData: IIntent[]): Promise<IDataEntry> {

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

            // save to DB can be implemented here
            return newMapEntry
        }
    }

    public async getIntents(id: string): Promise<IIntent[]> {

        // read from DB can be implemented here

        const filteredMaps: IDataEntry[] =
            this.trainingDataLibrary.filter((map: IDataEntry) => map.id === id)

        if (filteredMaps.length === 1) {
            return filteredMaps[0].intents
        } else {
            throw new Error(`Could not find distinct training data for id: ${id}`)
        }
    }
}

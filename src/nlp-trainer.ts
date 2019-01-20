import * as uniqid from "uniqid"
import { exampleMap } from "./example-data"
import { IAnswer, IIntent, IMapEntry } from "./types"

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

    private maps: IMapEntry[] = []

    public constructor() {
        const exampleMapEntry: IMapEntry = {
            id: "exampleMap",
            intents: exampleMap,
            ownerID: "exampleUser",
        }
        this.maps.push(exampleMapEntry)
    }

    public deleteTrainingMap(id: string, ownerID: string): void {
        this.maps.slice(0, 1)
    }

    public saveTrainingData(id: string, trainingData: IIntent[]): IMapEntry {

        if (this.maps.some((entry: IMapEntry) => id === entry.id)) {
            throw new Error(`tried to save duplicate entries for key ${id}`)
        }

        if (NLPTrainer.validateTrainingData(trainingData).length > 0) {
            throw new Error(`Errors while validating training data: \n${NLPTrainer.validateTrainingData(trainingData)}`)
        } else {

            const newMapEntry: IMapEntry = {
                id,
                intents: trainingData,
                ownerID: uniqid(new Date().toISOString()),
            }

            this.maps.push(newMapEntry)

            return newMapEntry
        }
    }

    public getTrainingMap(id: string): IIntent[] {

        const filteredMaps: IMapEntry[] =
            this.maps.filter((map: IMapEntry) => map.id === id)

        if (filteredMaps.length > 1) {
            throw new Error(`duplicate entries for id ${id}`)
        }

        return filteredMaps[0].intents
    }
}

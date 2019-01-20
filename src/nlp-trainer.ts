import * as uniqid from "uniqid"
import { exampleMap } from "./example-data"
import { IIntents, IMapEntry } from "./types"

export class NLPTrainer {

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

    public saveTrainingMap(id: string, trainingData: IIntents[]): IMapEntry {
        if (this.maps.some((entry: IMapEntry) => id === entry.id)) {
            throw new Error(`tried to save duplicate entries for key ${id}`)
        }
        const newMapEntry: IMapEntry = {
            id,
            intents: trainingData,
            ownerID: uniqid(new Date().toISOString()),
        }

        this.maps.push(newMapEntry)

        return newMapEntry
    }

    public getTrainingMap(id: string): IIntents[] {
        const filteredMaps: IMapEntry[] =
            this.maps.filter((map: IMapEntry) => map.id === id)

        if (filteredMaps.length > 1) {
            throw new Error(`duplicate entries for id ${id}`)
        }

        return filteredMaps[0].intents
    }
}

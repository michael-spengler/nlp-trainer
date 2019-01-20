import { exampleMap } from "./example-data"
import { NLPTrainer } from "./nlp-trainer"
import { IIntent, IMapEntry } from "./types"

let nlpTrainer: NLPTrainer

describe("NLPTrainer", () => {
    beforeEach(async () => {
        nlpTrainer =
            new NLPTrainer()
    })

    it("saves and provides trainingdata", async () => {
        const newMap: IMapEntry =
            await nlpTrainer.saveMapEntry("Unit Test Map", exampleMap)

        expect(newMap.id)
            .toEqual("Unit Test Map")

        expect(newMap.ownerID)
            .toBeDefined()

        expect(await nlpTrainer.getIntents("Unit Test Map"))
            .toEqual(exampleMap)
    })

    it("deletes trainingdata entry", async () => {
        const newMapEntry: IMapEntry =
            await nlpTrainer.saveMapEntry("Unit Test Map", exampleMap)

        await nlpTrainer.deleteMapEntry("Unit Test Map", newMapEntry.ownerID)

        try {
            await nlpTrainer.getIntents("Unit Test Map")
            fail("should raise an error")
        } catch (error) {
            // works as defined
        }
    })

    it("does not delete trainingdata when ownerID is wrong", async () => {
        await nlpTrainer.saveMapEntry("4711", exampleMap)

        try {
            await nlpTrainer.deleteMapEntry("4711", "12345")
            fail("error expected")
        } catch (error) {
            expect(await nlpTrainer.getIntents("4711"))
                .toEqual(exampleMap)
        }
    })

    it("throws an error for duplicate entries", async () => {
        await nlpTrainer.saveMapEntry("Unit Test Map", exampleMap)

        try {
            await nlpTrainer.saveMapEntry("Unit Test Map", exampleMap)
            fail("should have thrown an error for duplicate entries")
        } catch (error) {
            // works as designed
        }
    })

    it("rejects inconsistent training data", async () => {
        const intentContainingAnswerWithUnknownAction: IIntent = {
            answers: [{
                actions: ["unknownAction"],
                text: "42",
            }],
            language: "en",
            name: "answer-contains-unknown-action",
            utterances: ["42"],
        }
        const map: IIntent[] = exampleMap
        map.push(intentContainingAnswerWithUnknownAction)
        try {
            await nlpTrainer.saveMapEntry("inconsistentTrainingData", map)

            fail("please let me think about it")

        } catch (error) {
            // works as designed
        }
    })

})

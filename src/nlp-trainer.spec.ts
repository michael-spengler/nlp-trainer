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
            nlpTrainer.saveTrainingDataEntry("Unit Test Map", exampleMap)

        expect(newMap.id)
            .toEqual("Unit Test Map")

        expect(newMap.ownerID)
            .toBeDefined()

        expect(nlpTrainer.getTrainingMap("Unit Test Map"))
            .toEqual(exampleMap)
    })

    it("deletes trainingdata entry", async () => {
        const newMap: IMapEntry =
            nlpTrainer.saveTrainingDataEntry("Unit Test Map", exampleMap)

        nlpTrainer.deleteTrainingDataEntry("Unit Test Map", newMap.ownerID)

        expect(nlpTrainer.getTrainingMap("Unit Test Map"))
            .toEqual(undefined)
    })

    it("does not delete trainingdata when ownerID is wrong", async () => {
        const newMap: IMapEntry =
            nlpTrainer.saveTrainingDataEntry("4711", exampleMap)

        nlpTrainer.deleteTrainingDataEntry("4711", "12345")

        expect(nlpTrainer.getTrainingMap("4711"))
            .toEqual(exampleMap)
    })

    it("throws an error for duplicate entries", async () => {
        nlpTrainer.saveTrainingDataEntry("Unit Test Map", exampleMap)

        try {
            nlpTrainer.saveTrainingDataEntry("Unit Test Map", exampleMap)
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
            await nlpTrainer.saveTrainingDataEntry("inconsistentTrainingData", map)

            fail("please let me think about it")

        } catch (error) {
            // works as designed
        }
    })

})

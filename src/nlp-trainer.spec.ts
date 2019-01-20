import { exampleMap } from "./example-data"
import { NLPTrainer } from "./nlp-trainer"
import { IMapEntry } from "./types"

let nlpTrainer: NLPTrainer

describe("NLPTrainer", () => {
    beforeEach(async () => {
        nlpTrainer =
            new NLPTrainer()
    })

    it("saves and provides trainingdata", async () => {
        const newMap: IMapEntry =
            nlpTrainer.saveTrainingMap("Unit Test Map", exampleMap)

        expect(newMap.id)
            .toEqual("Unit Test Map")

        expect(newMap.ownerID)
            .toBeDefined()

        expect(nlpTrainer.getTrainingMap("Unit Test Map"))
            .toEqual(exampleMap)
    })

    it("throws an error for duplicate entries", async () => {

        nlpTrainer.saveTrainingMap("Unit Test Map", exampleMap)

        try {
            nlpTrainer.saveTrainingMap("Unit Test Map", exampleMap)
            fail("should have thrown an error for duplicate entries")
        } catch (error) {
            // works as designed
        }
    })
})

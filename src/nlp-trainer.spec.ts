import { exampleIntents } from "./example-intents"
import { NLPTrainer } from "./nlp-trainer"
import { ICurriculum, IIntent } from "./types"

describe("NLPTrainer", () => {

    it("saves and provides trainingdata", async () => {
        const nlpTrainer: NLPTrainer = new NLPTrainer()

        const trainingDataEntry: ICurriculum =
            await nlpTrainer.saveIntents("Unit Test Curriculum", exampleIntents)

        expect(trainingDataEntry.id)
            .toEqual("Unit Test Curriculum")

        expect(trainingDataEntry.ownerID)
            .toBeDefined()

        expect(await nlpTrainer.getIntents("Unit Test Curriculum"))
            .toEqual(exampleIntents)
    })

    it("deletes trainingdata entry", async () => {
        const nlpTrainer: NLPTrainer = new NLPTrainer()

        const curriculum: ICurriculum =
            await nlpTrainer.saveIntents("Unit Test Curriculum", exampleIntents)

        await nlpTrainer.deleteIntents("Unit Test Curriculum", curriculum.ownerID)

        try {
            await nlpTrainer.getIntents("Unit Test Curriculum")
            fail("should raise an error")
        } catch (error) {
            expect(error.message)
                .toEqual("Could not find distinct training data for id: Unit Test Curriculum")
        }
    })

    it("does not delete trainingdata when ownerID is wrong", async () => {
        const nlpTrainer: NLPTrainer = new NLPTrainer()

        await nlpTrainer.saveIntents("4711", exampleIntents)

        try {
            await nlpTrainer.deleteIntents("4711", "12345")
            fail("error expected")
        } catch (error) {
            expect(await nlpTrainer.getIntents("4711"))
                .toEqual(exampleIntents)
        }
    })

    it("throws an error for duplicate entries", async () => {
        const nlpTrainer: NLPTrainer = new NLPTrainer()

        await nlpTrainer.saveIntents("Unit Test Curriculum", exampleIntents)

        try {
            await nlpTrainer.saveIntents("Unit Test Curriculum", exampleIntents)
            fail("should have thrown an error for duplicate entries")
        } catch (error) {
            expect(error.message)
                .toEqual("tried to save duplicate entries for id Unit Test Curriculum")
        }
    })

    it("rejects inconsistent training data", async () => {
        const nlpTrainer: NLPTrainer = new NLPTrainer()

        const intentContainingAnswerWithUnknownAction: IIntent = {
            answers: [{
                actions: ["unknownAction"],
                text: "42",
            }],
            language: "en",
            name: "answer-contains-unknown-action",
            utterances: ["42"],
        }
        const intents: IIntent[] = exampleIntents
        intents.push(intentContainingAnswerWithUnknownAction)
        try {
            await nlpTrainer.saveIntents("inconsistentTrainingData", intents)

            fail("please let me think about it")

        } catch (error) {
            expect(error.message)
                .toEqual("Errors while validating training data: \nPlease add an utterance for action: unknownAction")
        }
    })

})

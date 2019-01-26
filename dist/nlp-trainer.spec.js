"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_intents_1 = require("./example-intents");
const nlp_trainer_1 = require("./nlp-trainer");
describe("NLPTrainer", () => {
    it("saves and provides trainingdata", async () => {
        const nlpTrainer = new nlp_trainer_1.NLPTrainer();
        const trainingDataEntry = await nlpTrainer.saveIntents("Unit Test Curriculum", example_intents_1.exampleIntents);
        expect(trainingDataEntry.id)
            .toEqual("Unit Test Curriculum");
        expect(trainingDataEntry.ownerID)
            .toBeDefined();
        expect(await nlpTrainer.getIntents("Unit Test Curriculum"))
            .toEqual(example_intents_1.exampleIntents);
    });
    it("deletes trainingdata entry", async () => {
        const nlpTrainer = new nlp_trainer_1.NLPTrainer();
        const curriculum = await nlpTrainer.saveIntents("Unit Test Curriculum", example_intents_1.exampleIntents);
        await nlpTrainer.deleteIntents("Unit Test Curriculum", curriculum.ownerID);
        try {
            await nlpTrainer.getIntents("Unit Test Curriculum");
            fail("should raise an error");
        }
        catch (error) {
            expect(error.message)
                .toEqual("Could not find distinct training data for id: Unit Test Curriculum");
        }
    });
    it("does not delete trainingdata when ownerID is wrong", async () => {
        const nlpTrainer = new nlp_trainer_1.NLPTrainer();
        await nlpTrainer.saveIntents("4711", example_intents_1.exampleIntents);
        try {
            await nlpTrainer.deleteIntents("4711", "12345");
            fail("error expected");
        }
        catch (error) {
            expect(await nlpTrainer.getIntents("4711"))
                .toEqual(example_intents_1.exampleIntents);
        }
    });
    it("throws an error for duplicate entries", async () => {
        const nlpTrainer = new nlp_trainer_1.NLPTrainer();
        await nlpTrainer.saveIntents("Unit Test Curriculum", example_intents_1.exampleIntents);
        try {
            await nlpTrainer.saveIntents("Unit Test Curriculum", example_intents_1.exampleIntents);
            fail("should have thrown an error for duplicate entries");
        }
        catch (error) {
            expect(error.message)
                .toEqual("tried to save duplicate entries for id Unit Test Curriculum");
        }
    });
    it("rejects inconsistent training data", async () => {
        const nlpTrainer = new nlp_trainer_1.NLPTrainer();
        const intentContainingAnswerWithUnknownAction = {
            answers: [{
                    actions: ["unknownAction"],
                    text: "42",
                }],
            language: "en",
            name: "answer-contains-unknown-action",
            utterances: ["42"],
        };
        const intents = example_intents_1.exampleIntents;
        intents.push(intentContainingAnswerWithUnknownAction);
        try {
            await nlpTrainer.saveIntents("inconsistentTrainingData", intents);
            fail("please let me think about it");
        }
        catch (error) {
            expect(error.message)
                .toEqual("Errors while validating training data: \nPlease add an utterance for action: unknownAction");
        }
    });
});

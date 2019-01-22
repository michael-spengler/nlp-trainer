"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_data_1 = require("./example-data");
const nlp_trainer_1 = require("./nlp-trainer");
let nlpTrainer;
describe("NLPTrainer", () => {
    beforeEach(async () => {
        nlpTrainer =
            new nlp_trainer_1.NLPTrainer();
    });
    it("saves and provides trainingdata", async () => {
        const newMap = await nlpTrainer.saveMapEntry("Unit Test Map", example_data_1.exampleMap);
        expect(newMap.id)
            .toEqual("Unit Test Map");
        expect(newMap.ownerID)
            .toBeDefined();
        expect(await nlpTrainer.getIntents("Unit Test Map"))
            .toEqual(example_data_1.exampleMap);
    });
    it("deletes trainingdata entry", async () => {
        const newMapEntry = await nlpTrainer.saveMapEntry("Unit Test Map", example_data_1.exampleMap);
        await nlpTrainer.deleteMapEntry("Unit Test Map", newMapEntry.ownerID);
        try {
            await nlpTrainer.getIntents("Unit Test Map");
            fail("should raise an error");
        }
        catch (error) {
            // works as defined
        }
    });
    it("does not delete trainingdata when ownerID is wrong", async () => {
        await nlpTrainer.saveMapEntry("4711", example_data_1.exampleMap);
        try {
            await nlpTrainer.deleteMapEntry("4711", "12345");
            fail("error expected");
        }
        catch (error) {
            expect(await nlpTrainer.getIntents("4711"))
                .toEqual(example_data_1.exampleMap);
        }
    });
    it("throws an error for duplicate entries", async () => {
        await nlpTrainer.saveMapEntry("Unit Test Map", example_data_1.exampleMap);
        try {
            await nlpTrainer.saveMapEntry("Unit Test Map", example_data_1.exampleMap);
            fail("should have thrown an error for duplicate entries");
        }
        catch (error) {
            // works as designed
        }
    });
    it("rejects inconsistent training data", async () => {
        const intentContainingAnswerWithUnknownAction = {
            answers: [{
                    actions: ["unknownAction"],
                    text: "42",
                }],
            language: "en",
            name: "answer-contains-unknown-action",
            utterances: ["42"],
        };
        const map = example_data_1.exampleMap;
        map.push(intentContainingAnswerWithUnknownAction);
        try {
            await nlpTrainer.saveMapEntry("inconsistentTrainingData", map);
            fail("please let me think about it");
        }
        catch (error) {
            // works as designed
        }
    });
});

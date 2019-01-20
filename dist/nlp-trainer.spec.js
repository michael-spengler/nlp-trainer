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
        const newMap = nlpTrainer.saveTrainingDataEntry("Unit Test Map", example_data_1.exampleMap);
        expect(newMap.id)
            .toEqual("Unit Test Map");
        expect(newMap.ownerID)
            .toBeDefined();
        expect(nlpTrainer.getTrainingMap("Unit Test Map"))
            .toEqual(example_data_1.exampleMap);
    });
    it("deletes trainingdata entry", async () => {
        const newMap = nlpTrainer.saveTrainingDataEntry("Unit Test Map", example_data_1.exampleMap);
        nlpTrainer.deleteTrainingDataEntry("Unit Test Map", newMap.ownerID);
        expect(nlpTrainer.getTrainingMap("Unit Test Map"))
            .toEqual(undefined);
    });
    it("does not delete trainingdata when ownerID is wrong", async () => {
        const newMap = nlpTrainer.saveTrainingDataEntry("4711", example_data_1.exampleMap);
        nlpTrainer.deleteTrainingDataEntry("4711", "12345");
        expect(nlpTrainer.getTrainingMap("4711"))
            .toEqual(example_data_1.exampleMap);
    });
    it("throws an error for duplicate entries", async () => {
        nlpTrainer.saveTrainingDataEntry("Unit Test Map", example_data_1.exampleMap);
        try {
            nlpTrainer.saveTrainingDataEntry("Unit Test Map", example_data_1.exampleMap);
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
            await nlpTrainer.saveTrainingDataEntry("inconsistentTrainingData", map);
            fail("please let me think about it");
        }
        catch (error) {
            // works as designed
        }
    });
});

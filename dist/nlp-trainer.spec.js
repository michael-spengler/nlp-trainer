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
        const newMap = nlpTrainer.saveTrainingMap("Unit Test Map", example_data_1.exampleMap);
        expect(newMap.id)
            .toEqual("Unit Test Map");
        expect(newMap.ownerID)
            .toBeDefined();
        expect(nlpTrainer.getTrainingMap("Unit Test Map"))
            .toEqual(example_data_1.exampleMap);
    });
    it("throws an error for duplicate entries", async () => {
        nlpTrainer.saveTrainingMap("Unit Test Map", example_data_1.exampleMap);
        try {
            nlpTrainer.saveTrainingMap("Unit Test Map", example_data_1.exampleMap);
            fail("should have thrown an error for duplicate entries");
        }
        catch (error) {
            // works as designed
        }
    });
});

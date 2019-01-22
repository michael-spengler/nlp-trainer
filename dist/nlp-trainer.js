"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid = require("uniqid");
const example_data_1 = require("./example-data");
class NLPTrainer {
    constructor() {
        this.trainingDataLibrary = [];
        const exampleMapEntry = {
            id: "exampleMap",
            intents: example_data_1.exampleMap,
            ownerID: "exampleUser",
        };
        this.trainingDataLibrary.push(exampleMapEntry);
    }
    static validateTrainingData(intents) {
        const errors = [];
        const utterances = [];
        const actions = [];
        intents.forEach((intent) => {
            intent.answers.forEach((answer) => {
                answer.actions.forEach((action) => {
                    actions.push(action);
                });
            });
        });
        intents.forEach((intent) => {
            intent.utterances.forEach((utterance) => {
                utterances.push(utterance);
            });
        });
        actions.forEach((action) => {
            if (!utterances.some((utterance) => utterance === action)) {
                errors.push(`Please add an utterance for action: ${action}`);
            }
        });
        return errors;
    }
    async deleteMapEntry(id, ownerID) {
        // delete from DB can be implemented here
        const index = this.trainingDataLibrary.indexOf(this.trainingDataLibrary.filter((entry) => {
            if (entry.id === id && entry.ownerID === ownerID) {
                return entry;
            }
        })[0]);
        if (index === -1) {
            throw new Error(`tried to delete something which is not there id: ${id} ownerID: ${ownerID}`);
        }
        else {
            this.trainingDataLibrary.splice(index, 1);
        }
    }
    async saveMapEntry(id, trainingData) {
        if (this.trainingDataLibrary.some((entry) => id === entry.id)) {
            throw new Error(`tried to save duplicate entries for id ${id}`);
        }
        if (NLPTrainer.validateTrainingData(trainingData).length > 0) {
            throw new Error(`Errors while validating training data: \n${NLPTrainer.validateTrainingData(trainingData)}`);
        }
        else {
            const newMapEntry = {
                id,
                intents: trainingData,
                ownerID: uniqid(`ownerID-${new Date().toISOString()}`),
            };
            this.trainingDataLibrary.push(newMapEntry);
            // save to DB can be implemented here
            return newMapEntry;
        }
    }
    async getIntents(id) {
        // read from DB can be implemented here
        const filteredMaps = this.trainingDataLibrary.filter((map) => map.id === id);
        if (filteredMaps.length > 1) {
            throw new Error(`duplicate entries for id ${id}`);
        }
        else if (filteredMaps.length === 1) {
            return filteredMaps[0].intents;
        }
        else {
            throw new Error(`Could not find training data for id: ${id}`);
        }
    }
}
exports.NLPTrainer = NLPTrainer;

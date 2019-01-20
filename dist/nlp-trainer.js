"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid = require("uniqid");
const example_data_1 = require("./example-data");
class NLPTrainer {
    constructor() {
        this.maps = [];
        const exampleMapEntry = {
            id: "exampleMap",
            intents: example_data_1.exampleMap,
            ownerID: "exampleUser",
        };
        this.maps.push(exampleMapEntry);
    }
    deleteTrainingMap(id, ownerID) {
        this.maps.slice(0, 1);
    }
    saveTrainingMap(id, trainingData) {
        if (this.maps.some((entry) => id === entry.id)) {
            throw new Error(`tried to save duplicate entries for key ${id}`);
        }
        const newMapEntry = {
            id,
            intents: trainingData,
            ownerID: uniqid(new Date().toISOString()),
        };
        this.maps.push(newMapEntry);
        return newMapEntry;
    }
    getTrainingMap(id) {
        const filteredMaps = this.maps.filter((map) => map.id === id);
        if (filteredMaps.length > 1) {
            throw new Error(`duplicate entries for id ${id}`);
        }
        return filteredMaps[0].intents;
    }
}
exports.NLPTrainer = NLPTrainer;

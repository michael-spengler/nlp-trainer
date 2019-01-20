import { IIntents, IMapEntry } from "./types";
export declare class NLPTrainer {
    private maps;
    constructor();
    deleteTrainingMap(id: string, ownerID: string): void;
    saveTrainingMap(id: string, trainingData: IIntents[]): IMapEntry;
    getTrainingMap(id: string): IIntents[];
}

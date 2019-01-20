import { IIntent, IMapEntry } from "./types";
export declare class NLPTrainer {
    private maps;
    constructor();
    deleteTrainingMap(id: string, ownerID: string): void;
    saveTrainingMap(id: string, trainingData: IIntent[]): IMapEntry;
    getTrainingMap(id: string): IIntent[];
}

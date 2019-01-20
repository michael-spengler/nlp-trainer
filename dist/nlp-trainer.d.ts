import { IIntent, IMapEntry as IDataEntry } from "./types";
export declare class NLPTrainer {
    private static validateTrainingData(intents);
    private trainingDataLibrary;
    constructor();
    deleteTrainingDataEntry(id: string, ownerID: string): void;
    saveTrainingDataEntry(id: string, trainingData: IIntent[]): IDataEntry;
    getTrainingMap(id: string): IIntent[] | undefined;
}

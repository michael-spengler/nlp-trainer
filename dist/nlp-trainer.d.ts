import { IIntent, IMapEntry as IDataEntry } from "./types";
export declare class NLPTrainer {
    private static validateTrainingData;
    private readonly trainingDataLibrary;
    constructor();
    deleteMapEntry(id: string, ownerID: string): Promise<void>;
    saveMapEntry(id: string, trainingData: IIntent[]): Promise<IDataEntry>;
    getIntents(id: string): Promise<IIntent[]>;
}

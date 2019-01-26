import { IIntent, IMapEntry as IDataEntry } from "./types";
export declare class NLPTrainer {
    private static validateTrainingData;
    private readonly trainingDataLibrary;
    constructor();
    deleteIntents(id: string, ownerID: string): Promise<void>;
    saveIntents(id: string, trainingData: IIntent[]): Promise<IDataEntry>;
    getIntents(id: string): Promise<IIntent[]>;
}

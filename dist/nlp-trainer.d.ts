import { ICurriculum, IIntent } from "./types";
export declare class NLPTrainer {
    private static validateTrainingData;
    private readonly trainingDataLibrary;
    constructor();
    deleteIntents(id: string, ownerID: string): Promise<void>;
    saveIntents(id: string, trainingData: IIntent[]): Promise<ICurriculum>;
    getIntents(id: string): Promise<IIntent[]>;
}

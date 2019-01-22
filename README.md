# Natural Language Processing Trainer
As simple as it gets  
This package is e.g. used in [this package](https://www.npmjs.com/package/nlp-with-actions)

## Usage Example
    import { IIntent, NLPTrainer, exampleData, IMapEntry } 
        from "nlp-trainer"

    const nlpTrainer: NLPTrainer = new NLPTrainer()

    const newMapEntry: IMapEntry = 
        await nlpTrainer.saveMapEntry("1234", exampleMap)

    const intents: IIntent[] = await nlpTrainer.getIntents("1234")
    
    await nlpTrainer.deleteTrainingDataEntry("1234", newMapEntry.ownerID)


## Feedback
If you find any issues or want to share improvement proposals in general feel free to open an issue [here](https://github.com/michael-spengler/nlp-trainer/issues).


## Contribute
I am interested in save and useful enhancements. Feel free to create [Pull Requests](https://github.com/michael-spengler/nlp-trainer/pulls) on my Repository.
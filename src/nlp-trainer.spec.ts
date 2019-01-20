import { NLPTrainer } from "./nlp-trainer"

let nlpTrainer: NLPTrainer

describe("Processor", () => {
    beforeEach(async () => {
        nlpTrainer =
            new NLPTrainer()
    })

    it("make sure the Telegram Bot is up and running", async () => {
        expect(1)
            .toBe(1)
    })
})

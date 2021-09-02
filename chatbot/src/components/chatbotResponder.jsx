import { answers } from './answers';
import { answerIdGenerator, idGenerator } from './utils';

export const chatbot = new class Chatbot {
    constructor() {
        this.answers = answers;
        this.genericResponse = "Sorry, I can't understand what you're asking. ";
        this.multipleResponses = "What did you mean exactly? ";
    }

    ask(questionObject) {
        const answer = this.answers.filter(element => element.question.includes(questionObject.text));
        const responseArray = [];

        if (!answer.length) {
            responseArray.push(buildMessage(this.genericResponse));
            return responseArray;
        }

        if (answer.length === 1) {
            responseArray.push(buildMessage(answer[0].answer));
            return responseArray;
        };

        responseArray.push(buildMessage(this.multipleResponses));
        for (var i = 0; i < answer.length; i++) {
            responseArray.push(buildMessage(`${i+1}) ${answer[i].question}`));
        }
        return responseArray;
    }

    initialMessage() {
        return {
            text: "Hi, I'm a helper bot, ask me anything and I might be able to help you :)",
            key: answerIdGenerator.next().value,
            sentByMe: false
        }
    }
}()

const buildMessage = (text) => {
    return {
        text,
        key: idGenerator.next().value,
        sentByMe: false
    }
}
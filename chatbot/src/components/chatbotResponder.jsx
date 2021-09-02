import { answers } from './answers';
import { answerIdGenerator } from './utils';

export const chatbot = new class Chatbot {
    constructor() {
        this.answers = answers;
        this.genericResponse = "Sorry, I can't understand what you're asking. ";
        this.multipleResponses = "What did you mean exactly? ";
        this.initialResponse = "Hi, I'm a helper bot, ask me anything and I might be able to help you :)";
    }

    ask(questionObject) {
        const answer = this.answers.filter(element => element.question.includes(questionObject.text));
        const responseArray = [];

        // Array leer (keine Übereinstimmung gefunden)
        if (!answer.length) {
            responseArray.push(buildMessage(this.genericResponse));
            return responseArray;
        }

        // Array der Länge 1 (eine Antwort gefunden)
        if (answer.length === 1) {
            responseArray.push(buildMessage(answer[0].answer));
            return responseArray;
        };

        // Array der Länge > 1 (mehrere Antworten gefunden)
        responseArray.push(buildMessage(this.multipleResponses));
        for (var i = 0; i < answer.length; i++) {
            responseArray.push(buildMessage(`${i+1}) ${answer[i].question}`));
        }
        return responseArray;
    }

    initialMessage() {
        return buildMessage(this.initialResponse);
    }
}()

const buildMessage = (text) => {
    return {
        text,
        key: answerIdGenerator.next().value,
        sentByMe: false
    }
}
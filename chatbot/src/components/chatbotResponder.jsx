import { answerIdGenerator } from './utils';

export const chatbot = new class Chatbot {
    constructor(answers, genericResponse) {
        this.answers = [
            {
                question: "How are you today?",
                answer: "Im great, thanks for asking. How can I help you? "
            }
        ];
        this.genericResponse = "Sorry, I can't understand what you're asking. ";
    }

    ask(questionObject) {
        const answer = this.answers.filter(element => element.question.includes(questionObject.text));

        if (!answer.length) {
            return {
                text: this.genericResponse,
                key: answerIdGenerator.next().value,
                sentByMe: false
            }
        }

        return {
            text: answer[0].answer,
            key: answerIdGenerator.next().value,
            sentByMe: false
        }
        // Falls das Array länger sein sollte, dann kann man theoretisch auch mehrere Messages konstruieren
    }

    initialMessage() {
        return {
            text: "Hi, I'm a helper bot, ask me anything and I might be able to help you :)",
            key: answerIdGenerator.next().value,
            sentByMe: false
        }
    }
}()
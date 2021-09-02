function* generateId() {
    let id = 1;

    while (true) {
        yield id;
        id++;
    }
}

export const idGenerator = generateId();

function* generateAnswerId() {
    let id = -1;
    while (true) {
        yield id;
        id--;
    }
}

export const answerIdGenerator = generateAnswerId();
function* generateId() {
    let id = 1;
    while (true) {
        yield id;
        id++;
    }
}

function* generateAnswerId() {
    let id = -1;
    while (true) {
        yield id;
        id--;
    }
}

export const idGenerator = generateId();
export const answerIdGenerator = generateAnswerId();
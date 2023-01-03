// Copyright (C) 2022 WCSystems

import * as pseudorandom from "./pseudorandom.js";

// Functions
export function sum(list) {
    let S = 0;
    for (const x of list)
        S = S + x;
    return S;
}

export function * range(start, end) {
    for (let i = start; i <= end; i++)
        yield i;
}

export function shuffle(seed, list) {
    let random = pseudorandom.lcg(seed);

    list = list.slice(0);

    let shuffled = [];
    for (const _ of range(1, list.length)) {
        let i = random() % list.length;
        let x = list[i];
        shuffled.push(x);
        list.splice(i, 1);
    }

    return shuffled;
}

export function inversions(list) {
    let I = 0;
    let n = list.length - 1;
    for (const i of range(0, n))
        for (const j of range(i + 1, n))
            if (list[j] < list[i])
                I = I + 1;
    return I;
}

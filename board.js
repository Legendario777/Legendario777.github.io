// Copyright (C) 2022 WCSystems

import * as cell from "./cell.js";
import * as list from "./list.js";

// Functions
export function html(n, t_x) {
    let board = document.createElement("x-board");

    for (const i of list.range(0, n - 1)) {
        let row = document.createElement("x-row");
        for (const j of list.range(0, n - 1)) {
            let t = to1D(n, i, j);
            row.append(cell.html(t, x(t_x, t)));
        }
        board.append(row);
    }

    return board;
}

function to1D(n, i, j) {
    return i * n + j;
}

function to2D(n, t) {
    return [Math.floor(t / n), t % n];
}

export function x(t_x, t) {
    return t in t_x ? t_x[t] : null;
}

export function initial(n, seed) {
    // TODO Shuffle - Solvable -> Return ; Shuffle...
    let t_x = list.shuffle(seed, final(n));

    if (solvable(n, t_x))
        return t_x;
    else
        return initial(n, seed + 1);
}

function final(n) {
    if (n <= 0) return [];

    let n_n = n * n;
    let t_x = [...list.range(1, n_n)];
    t_x[n_n - 1] = 0;

    return t_x;
}

export function solvable(n, t_x) {
    // Where is Zero
    let t = t_x.indexOf(0);

    if (t === -1) return true;

    // Distance
    let d = manhattan(...to2D(n, t), n - 1, n - 1);

    // 0 -> n*n
    t_x = t_x.slice(0);
    t_x[t] = n*n;

    // Inversions
    let N = list.inversions(t_x);

    return (-1) ** d === (-1) ** N;
}

export function push(n, t_x, pressed) {
    return holes(t_x).filter(h => {
        let [x_1, x_2] = to2D(n, h);
        let [y_1, y_2] = to2D(n, pressed);

        return manhattan(x_1, x_2, y_1, y_2) === 1;
    });
}

function holes(t_x) {
    return t_x.map((x, t) => [t, x])
              .filter(([_, x]) => x === 0)
              .map(([t, _]) => t);
}

function manhattan(x_1, x_2, y_1, y_2) {
    return Math.abs(x_1 - y_1) + Math.abs(x_2 - y_2);
}

export function end(n, t_x) {
    return JSON.stringify(final(n)) === JSON.stringify(t_x);
}

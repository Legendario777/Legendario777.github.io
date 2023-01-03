// Copyright (C) 2022 WCSystems

// Functions
export function html(t, x) {
    let cell = document.createElement("x-cell");

    if (x !== null && x !== 0) {
        cell.append(x);
    }

    cell.onclick = (e) => {
        e.cell_t = t;
    };

    return cell;
}

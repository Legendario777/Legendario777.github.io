// Copyright (C) 2022 WCSystems

// Functions
export function html() {
    let win = document.createElement("x-win");
    let a   = document.createElement("a");

    a.innerText = "↺";

    a.href = "";

    win.append(a);

    return win;
}

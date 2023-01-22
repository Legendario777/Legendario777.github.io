// Copyright (C) 2022 WCSystems

// Functions
export function html() {
    let win = document.createElement("x-win");
    let a   = document.createElement("a");
    let b   = document.createElement("a");

    a.innerText = "←";
    b.innerText = "↺";

    a.href = "index.html";
    b.href = "";

    win.append(a, b);

    return win;
}

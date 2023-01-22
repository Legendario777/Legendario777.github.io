// Copyright (C) 2022 WCSystems

import * as win   from "./win.js";
import * as board from "./board.js";

// Functions
export function html(n) {
    let game  = document.createElement("x-game");
    let moves = document.createElement("x-moves");
    let time  = document.createElement("x-time");
    
    n = limit(n);
    let t_0 = Date.now();
    let t_x = board.initial(n, t_0);
    let m   = 0;

    let interval = setInterval(() => time.replaceChildren(timeFormat(Date.now() - t_0)), 1000);

    let slide = new Audio("slide.opus");
    let boom  = new Audio("boom.opus");

    game.append(moves, time, board.html(n, t_x));
        moves.append(m);
        time.append(timeFormat(0));

    game.onclick = (e) => {
        e.end = false;

        let pressed = e.cell_t;

        if (pressed === null)      return ;
        if (pressed === undefined) return ;

        board.push(n, t_x, pressed).slice(0, 1).forEach(changed => {
            let x = board.x(t_x, pressed);
            let y = board.x(t_x, changed);

            t_x[pressed] = y;
            t_x[changed] = x;
            m = m + 1;

            e.end = board.end(n, t_x);

            if (e.end) {
                e.time = Date.now() - t_0;
                clearInterval(interval);
            }

            slide.cloneNode(true).play();

            game.replaceChildren(moves, time, board.html(n, t_x));
                moves.replaceChildren(m);

            if (e.end) {
                boom.cloneNode(true).play();
                game.append(win.html());
                game.onclick = () => {};
            }
        });
    };

    return game;
}

function timeFormat(t) {
    t = t / 1000;

    let h = Math.floor((t / 3600)   ).toString().padStart(2, "0");
    let m = Math.floor((t / 60) % 60).toString().padStart(2, "0");
    let s = Math.floor((t % 60)     ).toString().padStart(2, "0");

    return h === "00" ? `${m}:${s}` : `${h}:${m}:${s}`;
}

function limit(n) {
    if (n  <= 3) return 3;
    if (10 <= n) return 10;
    return n;
}

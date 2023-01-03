// Copyright (C) 2022 WCSystems

export function number(text) {
    try {
        if (typeof(text) !== "string") return null;
        if (text         === ""      ) return null;
        let n = new Number(text).valueOf();
        return isFinite(n) ? n : null;
    } catch (e) {
        return null;
    }
}

export function string(n) {
    try {
        if (typeof(n) !== "number") return null;
        return isFinite(n) ? n.toString() : null;
    } catch (e) {
        return null;
    }
}

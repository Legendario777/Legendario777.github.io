// Copyright (C) 2022 WCSystems

export function parameters(search) {
    return [...new URLSearchParams(search).values()];
}

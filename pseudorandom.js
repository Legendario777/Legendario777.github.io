// Copyright (C) 2022 WCSystems

// Functions
export function lcg(seed) {
    // Linear Congruential Generator
    // ANSI Parameters (1103515245 * seed + 12345) % 2147483648;
    return () => {
        seed = seed + 1;
        return seed;
    }
}

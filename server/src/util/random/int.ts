export function randomInt(min = 0, max = 1): number {
    const range = max - min + 1;
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    const maxValid = Math.floor(256 ** bytesNeeded / range) * range;

    let value: number;
    do {
        const bytes = crypto.getRandomValues(new Uint8Array(bytesNeeded));
        value = bytes.reduce((acc, b) => acc * 256 + b, 0);
    } while (value >= maxValid);

    return (value % range) + min;
}

export function randomSampleInts(min = 0, max = 1, count = 1): number[] {
    const pool = Array.from({ length: max - min + 1 }, (_, i) => i + min);

    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    return pool.slice(0, count);
}
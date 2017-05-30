'use strict';

const parseColorString = require('csscolorparser').parseCSSColor;
const cache = {};

module.exports = function parseColor(input) {
    if (typeof input === 'string') {
        if (!cache[input]) {
            const rgba = parseColorString(input);
            if (!rgba) { return undefined; }

            // GL expects all components to be in the range [0, 1] and to be
            // multipled by the alpha value.
            cache[input] = [
                rgba[0] / 255 * rgba[3],
                rgba[1] / 255 * rgba[3],
                rgba[2] / 255 * rgba[3],
                rgba[3]
            ];
        }

        return cache[input];
    } else if (Array.isArray(input)) {
        return input;
    } else {
        return undefined;
    }
};

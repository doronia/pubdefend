import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";

const terserOptions = {
    compress: {
        passes: 2
    },
    mangle: {
        safari10: true,
        properties: {
            keep_quoted: true
        },
    },
    format: {
        comments: false
    }
};



module.exports = [{
        input: "src/pubDefend.js",
        output: [{
                file: "dist/pubDefend.amd.js",
                format: "amd"
            },
            {
                file: "dist/pubDefend.amd.min.js",
                format: "amd",
                plugins: [terser(terserOptions)]
            },

            {
                file: "dist/pubDefend.iife.js",
                name: "pubdefend",
                format: "iife",
            },
            {
                file: "dist/pubDefend.iife.min.js",
                name: "pubdefend",
                format: "iife",
                plugins: [terser(terserOptions)]
            },
            {
                file: "dist/pubDefend.js",
                name: "pubdefend",
                format: "umd"
            },
            {
                file: "dist/pubDefend.min.js",
                name: "pubdefend",
                format: "umd",
                plugins: [terser(terserOptions)]
            }
        ],
        plugins: [
            resolve(),
            babel({
                exclude: "node_modules/**"
            })
        ]
    },
    {
        input: "src/pubDefend.js",
        output: [{
                file: "dist/pubDefend.esm.js",
                format: "esm"
            },
            {
                file: "dist/pubDefend.esm.min.js",
                format: "esm",
                plugins: [terser(terserOptions)]
            }
        ]
    }
];
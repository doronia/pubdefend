import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from '@rollup/plugin-commonjs'
import replace from 'rollup-plugin-replace';

const { NODE_ENV = 'development', DOMAIN = '' } = process.env;

const isProduction = NODE_ENV === 'production';
const ANALYZE = process.env.ANALYZE ? process.env.ANALYZE === 'true' : false;

const publisher = isProduction ? "/" + DOMAIN + "/" : '';



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
            file: "dist/pubDefend.iife.js",
            name: "pubdefend",
            format: "iife",
        },
        {
            file: "dist/" + publisher + "pubDefend.iife.min.js",
            name: "pubdefend",
            format: "iife",
            plugins: [terser(terserOptions)]
        }
    ],
    plugins: [
        resolve({
            browser: true,
        }),
        babel({
            exclude: 'node_modules/**',
            babelrc: false,
            presets: [
                [
                    '@babel/preset-env',
                    {
                        targets: {
                            browsers: "> 0.5%, ie >= 11"
                        },
                        debug: ANALYZE,
                        modules: false,
                        useBuiltIns: false,
                    },
                ],
            ],
        }),
        commonjs(),
        replace({
            exclude: 'node_modules/**',
            //ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            ENV: JSON.stringify(process.env.DOMAIN),
        }),
    ]
}];
/// <reference path="../../artefact.ts" />

namespace Artefact {
    export class CharUtils {
        /// Define the particular symbols

        static isWhitespace(char: any) {
            return /[ \t\r\f\v\u00A0\u2028\u2029]/.test(char);
        }

        static isNewline(char: any) {
            return char === '\n' || char === '\r\n';
        }

        static isOperator(char: any) {
            return char === '+' || char === '-' || char === '*' || char === '/'
                || char === '=' || char === '>' || char === '<' || char === '!'
                || char === '&' || char === '|' || char === '%' || char === '~'
                || char === '$' || char === '~' || char === '^';
        }
    }
}
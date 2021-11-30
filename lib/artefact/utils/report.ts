/// <reference path="../../artefact.ts" />

namespace Artefact {
    export class Report {
        /// Custom Message for a better readability

        static error (line: number, column: number, message: string) {
            /// A function to return a proper error
            if (line === undefined || column === undefined) {
                return message;
            }

            return `${line + 1}:${column + 1}: ${message}`;
        }
    }
}
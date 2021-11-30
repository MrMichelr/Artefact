

namespace Artefact {
    export enum TokenType {

        // Artifacts
        Heading = '*',

        /// ... ///
        Newline = '\n',
        EndOfInput = 'EndOfInput',
        Unrecognized = 'Unrecognized'
    }

    export class Token {
        /// Initialise the Token Object

        type : TokenType
        /// - type.     A 'TokenType' corresponding to the type 
        ///             of the newly created 'Token'.

        value : String
        /// - value.    The 'String' value of the token.
        ///             Contains all the characters in the Token

        line : Number
        /// - line.    The line number where the token
        ///             was encountered in the source code.

        column : [Number, Number]
        /// - column.    The column numbers where the token
        ///             was encountered in the source code.

        constructor (type: TokenType, value: String, line: Number, column: [Number, Number]) {
            this.type   = type
            this.value  = value
            this.line   = line
            this.column = column
        }

        toString() {
            return '<' + this.type + ', ' + this.value + ', ' + this.line + ':' + this.column + '>';
        }

    }
}
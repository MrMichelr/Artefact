

namespace Artefact {

    export function run () {
        console.log('Welcome to Artefact 0.0.1');
        console.log('Type in expressions to have them evaluated.');
        console.log('Type :quit to quit.');
    }

    function execute(input: any) {
        let lexer = new Lexer(input)

        let token = lexer.nextToken()

        while (token != undefined && token.type === TokenType.Newline) {
            token = lexer.nextToken();
        }

        switch (token != undefined && token.type) {
            default:
                return evaluateExpression(input)
        }
    }

    function evaluateExpression(input: any) {}
}
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Artefact extension is now active!');

    // Define the token types and modifiers
    const tokenTypes = ['variable', 'function', 'class', 'method', 'property', 'parameter', 'type', 'enum', 'interface', 'namespace', 'constant', 'string', 'number', 'boolean', 'null', 'object', 'heading', 'link', 'citation', 'comment', 'text', 'anchor'];
    const tokenModifiers = ['declaration', 'readonly', 'static', 'async', 'deprecated', 'inline', 'block', 'h1', 'h2', 'h3', 'comment', 'text', 'highlight'];

    // Create a semantic tokens legend
    const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);

    // Register the document semantic tokens provider
    context.subscriptions.push(
        vscode.languages.registerDocumentSemanticTokensProvider('artefact', {
            provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.SemanticTokens {
                const tokensBuilder = new vscode.SemanticTokensBuilder();
                const text = document.getText();

                // Tokenize headings
                const headingRegex = /^\* (.+)$/gm;
                let match;
                while ((match = headingRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    const headingLevel = match[0].startsWith('**') ? 1 : match[0].startsWith('***') ? 2 : 3;
                    tokensBuilder.push(startLine, startChar, match[0].length, 2, headingLevel); // Token type: heading, modifier: none, heading level: 1, 2, or 3
                }

                // Tokenize variables
                const variableRegex = /\$([a-zA-Z_]\w*)/g;
                while ((match = variableRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 1, 0); // Token type: variable, modifier: none
                }

                // Tokenize links
                const linkRegex = /@([a-zA-Z_]\w*)/g;
                while ((match = linkRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 6, 0); // Token type: link, modifier: none
                }

                // Tokenize inline links
                const inlineLinkRegex = /@\/([a-zA-Z_]\w*)/g;
                while ((match = inlineLinkRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 6, 0); // Token type: link, modifier: none
                }

                // Tokenize citations
                const citationRegex = /"([^"]+)"/g;
                while ((match = citationRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 12, 0); // Token type: citation, modifier: none
                }   

                // Tokenize citation Authors
                const citationAuthorRegex = /"([^"]+)"/g;
                while ((match = citationAuthorRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 12, 0); // Token type: citation, modifier: none
                }
                
                // Tokenize comments
                const commentRegex = /\/\/(.*)/g;
                while ((match = commentRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 19, 0); // Token type: comment, modifier: none
                }

                // Tokenize meta tags
                const metaTagRegex = /\/-\((\w+)\)\s*(.+)/g;
                while ((match = metaTagRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 9, 0); // Token type: meta tag, modifier: none
                }
                
                // Tokenize anchors
                const anchorRegex = /\±- (\w+)/g;
                while ((match = anchorRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 10, 0); // Token type: anchor, modifier: none
                }

                // Tokenize images
                const imageRegex = /!\[([^\]]+)\]\(([^)]+)\)/g;
                while ((match = imageRegex.exec(text)) !== null) {
                    const startLine = document.positionAt(match.index).line;
                    const startChar = document.positionAt(match.index).character;
                    tokensBuilder.push(startLine, startChar, match[0].length, 1, 0); // Token type: image, modifier: none
                }
                
                return tokensBuilder.build();
            }
        }, legend)
    );

    // Register code actions
    context.subscriptions.push(
        vscode.languages.registerCodeActionsProvider('artefact', {
            provideCodeActions(document: vscode.TextDocument, range: vscode.Range): vscode.CodeAction[] {
                const actions: vscode.CodeAction[] = [];

                const insertHeadingAction = new vscode.CodeAction('Insert Heading', vscode.CodeActionKind.QuickFix);
                insertHeadingAction.command = {
                    command: 'artefact.insertHeading',
                    title: 'Insert Heading'
                };
                actions.push(insertHeadingAction);

                const insertLinkAction = new vscode.CodeAction('Insert Link', vscode.CodeActionKind.QuickFix);
                insertLinkAction.command = {
                    command: 'artefact.insertLink',
                    title: 'Insert Link'
                };
                actions.push(insertLinkAction);

                const insertCitationAction = new vscode.CodeAction('Insert Citation', vscode.CodeActionKind.QuickFix);
                insertCitationAction.command = {
                    command: 'artefact.insertCitation',
                    title: 'Insert Citation'
                };
                actions.push(insertCitationAction);

                const insertCommentAction = new vscode.CodeAction('Insert Comment', vscode.CodeActionKind.QuickFix);
                insertCommentAction.command = {
                    command: 'artefact.insertComment',
                    title: 'Insert Comment'
                };
                actions.push(insertCommentAction);

                // insert meta tag action
                const insertMetaTagAction = new vscode.CodeAction('Insert Meta Tag', vscode.CodeActionKind.QuickFix);
                insertMetaTagAction.command = {
                    command: 'artefact.insertMetaTag',
                    title: 'Insert Meta Tag'
                };
                actions.push(insertMetaTagAction);
                
                // insert anchor action
                const insertAnchorAction = new vscode.CodeAction('Insert Anchor', vscode.CodeActionKind.QuickFix);
                insertAnchorAction.command = {
                    command: 'artefact.insertAnchor',
                    title: 'Insert Anchor'
                };
                actions.push(insertAnchorAction);

                return actions;
            }
        })
    );

    // Register commands
    const insertHeadingCommand = vscode.commands.registerCommand('artefact.insertHeading', () => {
        vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString('* ${1:Heading Title}'));
    });
    const insertLinkCommand = vscode.commands.registerCommand('artefact.insertLink', () => {
        vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString('@ ${1:Link Text} (${2:URL})'));
    });
    const insertCitationCommand = vscode.commands.registerCommand('artefact.insertCitation', () => {
        vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString('" ${1:Citation Text}"'));
    });
    const insertCommentCommand = vscode.commands.registerCommand('artefact.insertComment', () => {
        vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString('// ${1:Comment}'));
    });
    const insertMetaTagCommand = vscode.commands.registerCommand('artefact.insertMetaTag', () => {
        vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString('/- (${1:Tag Name}) ${2:Tag Value}'));
    });
    const insertAnchorCommand = vscode.commands.registerCommand('artefact.insertAnchor', () => {
        vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString('±- (${1:Anchor Name})'));
    });

    // Add hover provider
    context.subscriptions.push(vscode.languages.registerHoverProvider('artefact', {
        provideHover(document, position) {
            const range = document.getWordRangeAtPosition(position);
            const line = document.getText(range).trim().split('/n')[0];
            const tokenType = extractTokenType(document.getText(range)); 
            return new vscode.Hover(`You hovered ${tokenType} - Content "${line}"`);
        }
    }));

    // Add completion provider
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('artefact', {
        provideCompletionItems(document, position) {
            const completionItems = [
                new vscode.CompletionItem('* Heading', vscode.CompletionItemKind.Snippet),
                new vscode.CompletionItem('@ Link', vscode.CompletionItemKind.Snippet),
                new vscode.CompletionItem('$ Variable', vscode.CompletionItemKind.Snippet),
                new vscode.CompletionItem('" Citation', vscode.CompletionItemKind.Snippet),
                new vscode.CompletionItem('// Comment', vscode.CompletionItemKind.Snippet),
                new vscode.CompletionItem('/- Meta Tag', vscode.CompletionItemKind.Snippet),
                new vscode.CompletionItem('±- Anchor', vscode.CompletionItemKind.Snippet)
            ];
            return completionItems;
        }
    }));

    context.subscriptions.push(insertHeadingCommand, insertLinkCommand, insertCitationCommand, insertCommentCommand, insertMetaTagCommand, insertAnchorCommand);
}

export function deactivate() {}

// Function to extract token type from text
function extractTokenType(text: string): string {
    // Implement logic to determine token type from text
    if (text.startsWith('*')) {
        return 'heading';
    } else if (text.startsWith('$')) {
        return 'variable';
    } else if (text.startsWith('@')) {
        return 'link';
    } else if (text.startsWith('"') && text.endsWith('"')) {
        return 'citation';
    } else if (text.startsWith('//')) {
        return 'comment';
    } else if (text.startsWith('/-')) {
        return 'meta tag';
    } else if (text.startsWith('±-')) {
        return 'anchor';
    } 
    return "Text"; // Placeholder
}
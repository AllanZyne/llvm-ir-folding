// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let outputChannel: vscode.OutputChannel;

class MyFoldingRangeProvider implements vscode.FoldingRangeProvider {
    provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): vscode.FoldingRange[] {
		// outputChannel.appendLine('provideFoldingRanges!');
        return this.detectRanges(document).map(({ lineStart, lineEnd }) => new vscode.FoldingRange(lineStart, lineEnd));
    }

	detectRanges(document: vscode.TextDocument) {
		let ranges = [];
		let text = document.getText();
        let lines = text.split("\n");

		let n = lines.length;
		if (n > 1) {
			let lastLine = 0;
			for (let i = 1; i < n; ++i) {
				if (lines[i].startsWith('*** ')) {
					ranges.push({
						lineStart: lastLine, lineEnd: i-1
					});
					lastLine = i;
				}
			}
			ranges.push({
				lineStart: lastLine, lineEnd: n-1
			});
		}

		return ranges;
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	outputChannel = vscode.window.createOutputChannel("LLVM IR Dump Folding");
	outputChannel.appendLine('Congratulations, your extension "llvm-ir-dump-folding" is now active!');

	vscode.languages.registerFoldingRangeProvider({ scheme: 'file', language: 'llvm' }, new MyFoldingRangeProvider());
}

// this method is called when your extension is deactivated
export function deactivate() {}

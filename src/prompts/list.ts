import { window, QuickPickItem, QuickPickOptions } from 'vscode';
import Prompt from './prompt';
import EscapeException from '../utils/EscapeException';
const isFn = require('is-fn');

export default class ListPrompt extends Prompt {

	constructor(question: any, answers: any) {
		super(question, answers);
	}

	public render() {
		var optChoices = this._question.choices;
		if (isFn(optChoices)) {
			optChoices = optChoices(this._answers);
		}
		const choices = optChoices.reduce((result, choice) => {
			result[choice.name] = choice.value;
			return result;
		}, {});

		const options: QuickPickOptions = {
			 placeHolder: this._question.message
		};

		return window.showQuickPick(Object.keys(choices), options)
			.then(result => {
				if (result === undefined) {
					throw new EscapeException();
				}

				return choices[result];
			});
	}
}

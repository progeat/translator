export interface Position {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface TextSelectionSchema {
	textSelected: string | null;
	translatedText: string | null;
	position: Position | null;
}

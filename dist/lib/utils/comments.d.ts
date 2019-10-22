import { TodoComment } from '../../definitions';
export declare const getRegex: (customTags?: string[]) => string;
export declare const prepareComment: (match: string[], line: number, filename?: string) => TodoComment;

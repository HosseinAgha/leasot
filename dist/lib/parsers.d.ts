import { ExtensionsDb, ParseConfig, TodoComment } from '../definitions';
/**
 * Extend the extensions database at runtime, by either adding support for new extensions or overriding existing ones
 * @param extendedDb The extension database to extend with
 */
export declare const associateExtWithParser: (extendedDb: ExtensionsDb) => void;
/**
 * Check whether the provided extension is currently supported
 * @param extension the extension to check
 */
export declare const isExtensionSupported: (extension: string) => boolean;
/**
 * Parse the provided content and return an array of parsed items
 * @param content The contents to parse
 * @param config The parse configuration
 */
export declare const parse: (content: string, config: ParseConfig) => TodoComment[];

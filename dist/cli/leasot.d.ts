import commander from 'commander';
import { BuiltinReporters, ExtensionsDb, ReporterName, Tag } from '../definitions';
/**
 * @hidden
 */
export interface ProgramArgs extends commander.CommanderStatic {
    readonly associateParser?: ExtensionsDb;
    readonly exitNicely?: boolean;
    readonly filetype?: string;
    readonly ignore?: string[];
    readonly inlineFiles?: boolean;
    readonly reporter?: BuiltinReporters | ReporterName;
    readonly skipUnsupported?: boolean;
    readonly tags?: Tag[];
}

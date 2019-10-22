import commander from 'commander';
import { BuiltinReporters, ReporterName } from '../definitions';
/**
 * @hidden
 */
export interface ReporterProgramArgs extends commander.CommanderStatic {
    readonly exitNicely?: boolean;
    readonly ignore?: string[];
    readonly reporter?: BuiltinReporters | ReporterName;
}

import { ReportItems, ReporterConfig, TodoComment } from '../definitions';
/**
 * Load the given reporter
 */
export declare const loadReporter: (reporter: string | ReportItems) => void | ReportItems;
/**
 * Report the provided items
 * @param items The items to report
 * @param reporter The reporter to use
 * @param config Reporter configuration
 */
export declare const report: (items: TodoComment[], reporter?: string | ReportItems, config?: ReporterConfig) => any;

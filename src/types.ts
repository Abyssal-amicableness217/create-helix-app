import { VALID_FRAMEWORKS, VALID_PRESETS } from './validation.js';

/** Derived from the canonical VALID_FRAMEWORKS array in validation.ts. */
export type Framework = (typeof VALID_FRAMEWORKS)[number];

export type ComponentBundle =
  | 'all'
  | 'core'
  | 'forms'
  | 'navigation'
  | 'data-display'
  | 'feedback'
  | 'layout';

export interface TemplateConfig {
  id: Framework;
  name: string;
  description: string;
  hint: string;
  color: (text: string) => string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  features: string[];
}

/**
 * A custom template definition loaded from a user-provided templateDir.
 * Follows the same structure as TemplateConfig but with an unconstrained
 * string id and an isCustom flag for display purposes.
 */
export interface CustomTemplateConfig {
  id: string;
  name: string;
  description: string;
  hint: string;
  color: (text: string) => string;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  features: string[];
  isCustom: true;
}

/** Union of built-in and custom template configs. */
export type AnyTemplateConfig = TemplateConfig | CustomTemplateConfig;

export interface ProjectOptions {
  name: string;
  directory: string;
  framework: Framework;
  componentBundles: ComponentBundle[];
  typescript: boolean;
  eslint: boolean;
  designTokens: boolean;
  darkMode: boolean;
  installDeps: boolean;
  dryRun?: boolean;
  force?: boolean;
  verbose?: boolean;
  /** Custom templates loaded from templateDir — used by scaffold for dependency lookup. */
  customTemplates?: AnyTemplateConfig[];
}

export interface ComponentBundleConfig {
  id: ComponentBundle;
  name: string;
  description: string;
  components: string[];
}

/** Derived from the canonical VALID_PRESETS array in validation.ts. */
export type DrupalPreset = (typeof VALID_PRESETS)[number];

export interface PresetConfig {
  id: DrupalPreset;
  name: string;
  description: string;
  sdcList: string[];
  dependencies: Record<string, string>;
  templateVars: Record<string, string>;
  architectureNotes: string;
}

export interface DrupalOptions {
  themeName: string;
  directory: string;
  preset: DrupalPreset;
}

/**
 * Per-phase timing data collected during scaffold operations.
 * All durations are in milliseconds.
 */
export interface ScaffoldPhaseTiming {
  validationMs: number;
  templateResolutionMs: number;
  fileGenerationMs: number;
  fileWritingMs: number;
}

/**
 * Full timing summary produced after a scaffold run.
 */
export interface ScaffoldTiming {
  totalMs: number;
  phases: ScaffoldPhaseTiming;
  fileCount: number;
  bytesWritten: number;
  dependencyCount: number;
}

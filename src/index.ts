#!/usr/bin/env node

import { runCLI } from './cli.js';
import { logger } from './logger.js';

runCLI().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  logger.error(message);
  process.exit(1);
});

import fs from 'fs';
import { promisify } from 'util';

/* Creates a promise version of 'fs' module's 'unlink' function. */
export const unlinkAsync = promisify(fs.unlink)
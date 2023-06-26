import { Environment } from '@src/common/models/config/environment.model';
import { DEFAULT_ENV, envs } from './envs';

let envName = process.env.ENV || DEFAULT_ENV;
const forcedAppUrl = process.env.APP_URL;

if (envName && !envs[envName]) {
    console.error(`Unknown environment "${envName}". Falling back to default...`);
    envName = DEFAULT_ENV;
}

export const config: Environment = envs[envName];

if (forcedAppUrl) {
    config.appUrl = forcedAppUrl;
}

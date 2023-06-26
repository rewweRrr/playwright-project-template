import { Environment } from '@src/common/models/config/environment.model';

export const DEFAULT_ENV = 'app-1';

export const envs: Record<string, Environment> = {
    'app-1': {
        appUrl: 'https://jsonplaceholder.typicode.com/',
    },
    'app-2': {
        appUrl: 'https://app-02.com',
    },
};

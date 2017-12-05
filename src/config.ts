const pkg = require('../package.json'); // tslint:disable-line

export interface IConfig {
  app: {
    name: string;
    version: string;
  };
  auth: {
    ttl: string;
    secret: string;
  };
}

const config: IConfig = {
  app: {
    name: pkg.name,
    version: pkg.version,
  },
  auth: {
    ttl: '24h',
    secret: 'qwerty', // todo: something random
  },
};

export default config;

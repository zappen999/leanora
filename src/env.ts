export interface IEnv {
  isProd(): boolean;
  isDev(): boolean;
}

const env: IEnv = {
  isProd: () => process.env.NODE_ENV === 'production',
  isDev: () => process.env.NODE_ENV === 'development',
};

export default env;

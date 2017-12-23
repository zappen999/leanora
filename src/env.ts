export interface Env {
  sendgridApiKey: string

  isProd(): boolean
  isDev(): boolean
}

const env: Env = {
  isProd: () => process.env.NODE_ENV === 'production',
  isDev: () => process.env.NODE_ENV === 'development',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
}

export default env

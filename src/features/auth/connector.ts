import { IAuthConnector, IAuthIdentity, IIdentity, IGrant } from './factory';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

// todo: in-memory db until we know which database engine/structure we want
const identities: IIdentity[] = [];

export interface ITokenData {
  id: string;
  grants: IGrant[];
}

export class AuthConnector implements IAuthConnector {
  public async authenticate(id: string, password: string): Promise<IAuthIdentity> {
    // todo: replace with real mechanism to authenticate this identity
    const identity = identities
      .find((i) => i.id === id && i.password === password);

    if (!identity) {
      throw new Error('Invalid id or password');
    }

    // user was authenticated correctly, sign a token

    const tokenData: ITokenData = {
      id: identity.id,
      grants: [],
    };
    const token = await this.signJWT(
      tokenData,
      config.auth.ttl,
      config.auth.secret,
    );

    return {
      id: identity.id,
      token,
    };
  }

  public authorize(token: string): Promise<IAuthIdentity> {
    return this.verifyJWT(token, config.auth.secret);
  }

  // todo: implement real register funtionality
  public async register(id: string, password: string): Promise<IAuthIdentity> {
    const identity: IIdentity = {
      id,
      password,
    };

    identities.push(identity);

    return this.authenticate(id, password);
  }

  public async loadBatch(ids: string[]): Promise<any> {
    return [];
  }

  protected async verifyJWT(
    token: string,
    secret: string,
  ): Promise<IAuthIdentity> {
    return new Promise<IAuthIdentity>((resolve, reject) => {
      jwt.verify(token, secret, (err, decoded: IAuthIdentity) => {
        if (err) {
          return reject(err);
        }

        decoded.token = token;
        return resolve(decoded);
      });
    });
  }

  protected async signJWT(
    data: ITokenData,
    expiresIn: string,
    secret: string,
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(data, secret, { expiresIn }, (err, token) => {
        if (err) {
          return reject(err);
        }

        return resolve(token);
      });
    });
  }
}

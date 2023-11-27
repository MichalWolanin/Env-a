import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './firebaseServiceAccount.json';

const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id, 
  privatekey: serviceAccount.private_key, 
  clientEmail: serviceAccount.client_email, 
  clientid: serviceAccount.client_id, 
  authuri: serviceAccount.auth_uri, 
  tokenuri: serviceAccount.token_uri,
  authProvider509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientse9Certurl: serviceAccount.client_x509_cert_url
}

@Injectable()
export class PreauthMiddleware implements NestMiddleware {

  private defaultApp: any;

  constructor() {
    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
      databaseURL: "https://env-a.firebaseio.com"
    })
  }

  use(req: Request, res: Response, next: Function) {
    const token = req.headers.authorization;
    if (token != null && token != '') {
      this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''))
        .then(async decodedToken => {
          const user = {
            email: decodedToken.email
          }
          req['user'] = user;
          next();
        }).catch(error => {
          console.error(error);
          this.accessDenied(req.url, res);
        });
    } else {
      next();
    }
  }

  private accessDenied(url: string, res: Response) {
    res.status(403).json({
      statusCode: 403,
      timestamp: new Date().toISOString(),
      path: url,
      message: 'Access Denied'
    });
  }
}
 
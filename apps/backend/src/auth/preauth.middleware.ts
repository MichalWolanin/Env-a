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
      databaseURL: ""
    })
  }

  use(req: Request, res: Response, next: Function) {
    next();
  }
}

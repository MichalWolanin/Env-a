import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as admin from "firebase-admin";
import { firebaseKeys } from "../../environment";
import { auth } from "firebase-admin";
import DecodedIdToken = auth.DecodedIdToken;

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy, "custom") {
  static key = "custom"

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseKeys)
    });
    super();
  }

  async validate(req: Request): Promise<DecodedIdToken | false> {
    const token = req.headers['authorization'].split('Bearer ')[1];
    try {
      return await admin.auth().verifyIdToken(token);
    } catch {
      return false;
    }
  }
}
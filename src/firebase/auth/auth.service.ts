import { Injectable } from '@nestjs/common';
import { auth } from 'firebase-admin';

@Injectable()
export class FirebaseAuthService {
    verifyToken(token: string): Promise<auth.DecodedIdToken> {
        return auth().verifyIdToken(token);
    }

    generateToken(uid: string, claims: {}): Promise<string> {
        return auth().createCustomToken(uid, claims);
    }
}

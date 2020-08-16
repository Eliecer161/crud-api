import { Module, Global } from '@nestjs/common';
import { FirebaseAuthService } from './auth/auth.service';
import { initializeApp, credential } from 'firebase-admin';

@Global()
@Module({
    providers: [FirebaseAuthService],
    exports: [FirebaseAuthService]
})
export class FirebaseModule {
    constructor() {
        initializeApp({
            credential: credential.cert({
                projectId: process.env.FIREBASE_ID,
                privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_EMAIL
            }),
            storageBucket: 'paya-app.appspot.com'
        });
    }
}

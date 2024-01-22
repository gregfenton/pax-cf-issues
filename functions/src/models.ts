import {User} from 'firebase/auth';

export type BaseUser = Pick<
  User,
  'uid' | 'displayName' | 'email' | 'emailVerified' | 'phoneNumber' | 'photoURL'
> & {
  creationTime: string;
  lastSignInTime: string;
};

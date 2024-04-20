import type { SiweMessage } from 'siwe';

import type { SessionOptions } from 'iron-session';

import { env } from '@/env.mjs';

import { siteConfig } from '@/config/site';

// This is the secret used to encrypt the session cookie
// It should be at least 32 characters long
export const NEXTAUTH_SECRET = env.NEXTAUTH_SECRET;

// The httpOnly cookie option is not working so we are using
// a hack to remove the cookie from the browser
// See: /api/siwe/logout
export const SERVER_SESSION_SETTINGS: SessionOptions = {
  cookieName: siteConfig.name,
  password:
    NEXTAUTH_SECRET ?? 'UPDATE_TO_complex_password_at_least_32_characters_long',
  cookieOptions: {
    secure: process.env.NODE_ENV == 'production',
  },
};

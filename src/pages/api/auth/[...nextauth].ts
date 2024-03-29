import NextAuth from "next-auth/next"
import type { NextApiRequest, NextApiResponse } from "next"
import GoogleProvider from 'next-auth/providers/google'

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
    const providers = [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
    ];

    return await NextAuth(req, res, {
        providers,
        secret: process.env.SECRET,
        jwt: {
            secret: process.env.SECRET,
        },
        session: {
            // This is the default. The session is saved in a cookie and never persisted anywhere.
            strategy: "jwt",
        },
        // debug: true,
        pages: {
            signIn: "/auth/signin",
        },
        callbacks: {
            async session({ session, token }) {
                // Send properties to the client, like an access_token from a provider.
                //   session.accessToken = token.accessToken;
                //   session.refreshToken = token.refreshToken;
                //   session.idToken = token.idToken;
                //   session.provider = token.provider;
                //   session.id = token.id;
                return session;
            },
            async jwt({ token, user, account }) {
                // Persist the OAuth access_token to the token right after signin
                if (account) {
                    token.accessToken = account.access_token;
                    token.refreshToken = account.refresh_token;
                    token.idToken = account.id_token;
                    token.provider = account.provider;
                }
                if (user) {
                    token.id = user.id.toString();
                }
                return token;
            },
        },
    })
}

export default Auth
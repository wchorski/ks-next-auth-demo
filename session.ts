import { getContext } from '@keystone-6/core/context';
import { getServerSession } from 'next-auth/next';
import type { DefaultJWT } from 'next-auth/jwt';
import type { DefaultSession, DefaultUser } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials';
import type { Context } from '.keystone/types';
// @ts-ignore
import bcrypt from 'bcryptjs';

// WARNING: you need to change this
const sessionSecret = process.env.NEXTAUTH_SECRET;

let _keystoneContext: Context = (globalThis as any)._keystoneContext;

async function getKeystoneContext() {
  if (_keystoneContext) return _keystoneContext;
  
  // TODO: this could probably be better
  _keystoneContext = getContext(
    (await import('./keystone')).default,

    await import('@prisma/client')

    );
    if (process.env.NODE_ENV !== 'production') {
      (globalThis as any)._keystoneContext = _keystoneContext;
    }
  console.log('getKeystoneContext getKeystoneContext getKeystoneContext getKeystoneContext getKeystoneContext')
  return _keystoneContext;
}
type SeshUser = {
  role?: any,
  id?:string,
}

let seshUser:SeshUser = {}


// see https://next-auth.js.org/configuration/options for more
export const nextAuthOptions = {
  secret: sessionSecret,
  callbacks: {
    async signIn({ user }: { user: DefaultUser }) {
      console.log('callbacks, signIn ------- ');
      
      console.log({user});
      // console.error('next-auth signIn', { user, account, profile });
      const sudoContext = (await getKeystoneContext()).sudo();

      let idObj:any = { authId: user.id}
      // let idObj = { authId: user.id }
      // @ts-ignore
      if(user._type === 'credentials') idObj = { id: user.id}
      console.log({idObj})
      

      // check if the user exists in keystone
      const author = await sudoContext.query.User.findOne({
        where: idObj,
        query: `
          id
          role {
            name
            canManagePosts
            canManageUsers
            canManageRoles
          }
        `
      });
      // todo for now don't make new user if one does not exist
      if(!author){
        console.log('no user found in db')
        return false
      }
      // console.log({author});
      
    
      // if not, sign up
      // if (!author) {
      //   await sudoContext.query.User.createOne({
      //     data: {
      //       authId: user.id,
      //       name: user.name,
      //       email: user.email,
      //       image: user.image,
      //     },
      //   });
      // }

      seshUser = author

      return true; // accept the signin
    },

    async session({
      session,
      token,
    }: {
      session: DefaultSession; // required by next-auth, not by us
      token: DefaultJWT;
    }) {

      console.log('******** async session');
      console.log({seshUser});
      // console.log({token});
      // console.log({session});
      const sudoContext = (await getKeystoneContext()).sudo();
        // check if the user exists in keystone
        const foundUser = await sudoContext.query.User.findOne({
          where: { email: session.user?.email },
          query: `
            id
            name
            email
            password
            role {
              name
              canManagePosts
              canManageUsers
              canManageRoles
            }
          `
        });
        
        // unauthorized
        if(!foundUser) {
          console.log('no foundUser found in db')
          return null
        }

      const sessionObj = {
        ...session,
        authId: token.sub,
        // id: seshUser?.id,
        id: token.sub,
        itemId: foundUser?.id,
        data: {
          role: foundUser?.role,
        }
      };

      // if(seshUser.role) Object.assign(sessionObj, { data: { role: seshUser.role } })

      console.log({sessionObj});
      
      
      return sessionObj
    },
  },
  providers: [
    // allow anyone with a GitHub account to sign up as an author
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),

    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "name@mail.com" },
        password: { label: "Password", type: "password", placeholder: "******" },
      },
      authorize: async (credentials, req,) => {
        console.log('authorize authorize authorize authorize authorize');
        // console.log({credentials});

        if(!credentials?.email && !credentials?.password && !credentials) console.log('insufficent credentials');

        const sudoContext = (await getKeystoneContext()).sudo();
        // check if the user exists in keystone
        const foundUser = await sudoContext.query.User.findOne({
          where: { email: credentials?.email },
          query: `
            id
            name
            email
            password
            role {
              name
              canManagePosts
              canManageUsers
              canManageRoles
            }
          `
        });
        
        // unauthorized
        if(!foundUser) {
          console.log('no foundUser found in db')
          return null
        }

        // todo real passwords with encryption
        // const match = (credentials?.password === foundUser.password)
        const match = await bcrypt.compare(credentials?.password, foundUser.password)
        // if(!match) return {status: 401, message: 'incorrect password'} 

        if (credentials?.email === foundUser.email && match) {
          console.log('user is authenticated, ', foundUser.email);
          return {
            _type: 'credentials',
            id: foundUser.id,
            authId: foundUser.email,
            name: foundUser.name,
            image: foundUser.image,
            email: foundUser.email,
            role: foundUser.role,
            img: foundUser.img,
            user: {
              email: foundUser.email,
            }
          }
        }

        // login failed catch all
        console.log('!!!!! login no work for, ', credentials?.email);
        return null;
      },
    })
  ],
};

export type Session = {
  id: string;
};

export const nextAuthSessionStrategy = {
  async get({ context }: { context: Context }) {
    console.log('nextAuthSessionStrategy nextAuthSessionStrategy nextAuthSessionStrategy')
    const { req, res } = context;
    const { headers } = req ?? {};
    if (!headers?.cookie || !res) return;

    // next-auth needs a different cookies structure
    const cookies: Record<string, string> = {};
    for (const part of headers.cookie.split(';')) {
      const [key, value] = part.trim().split('=');
      cookies[key] = decodeURIComponent(value);
    }

    const nextAuthSession = await getServerSession(
      { headers, cookies } as any,
      res,
      nextAuthOptions
    );
    if (!nextAuthSession) return;

    const { authId, user } = nextAuthSession;
    
    // @ts-ignore
    const { email } = user
    // todo will this cause problems between ks and next?
    // const { authId } = nextAuthSession.keystone;
    
    if (!authId && !email) return;
    // todo do i need to use authId? can i just use email?
    // if(authId && !authId?.includes('@')) whereObj = { where: { authId } }

    const author = await context.sudo().db.User.findOne(
      { where: { email } }
    )
    if (!author) return console.log('no user found for auth');
    const roleId = author.roleId || 'no_roleId'
    const role = await context.sudo().db.Role.findOne({
      where: { id: roleId},
    });

    const sessionObj = { 
      id: author.id,
      itemId: author.id,
      data: {
        id: author.id,
        image: author.image,
        dateCreated: author.createdAt,
        name: author.name,
        email: author.email,
      } 
    }

    if (!role) console.log('!!!!!! user has no role assigned for auth');
    if(role) Object.assign(sessionObj, {data: {role: role} } )
    
    return sessionObj
  },

  // we don't need these as next-auth handle start and end for us
  async start() {},
  async end() {},
};
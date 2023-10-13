exports.id=933,exports.ids=[933],exports.modules={56864:e=>{function webpackEmptyContext(e){var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id=56864,e.exports=webpackEmptyContext},56337:(e,o,t)=>{"use strict";t.d(o,{N:()=>m,q:()=>g});var n=t(24259),a=t(93810),s=t(87833),l=t(45955),i=t(46715),r=t.n(i);let d=process.env.NEXTAUTH_SECRET,c=globalThis._keystoneContext;async function getKeystoneContext(){return c||(c=(0,n.f)((await Promise.all([t.e(536),t.e(45),t.e(908)]).then(t.bind(t,5569))).default,await Promise.resolve().then(t.t.bind(t,53524,23))),console.log("getKeystoneContext getKeystoneContext getKeystoneContext getKeystoneContext getKeystoneContext")),c}let u={},m={secret:d,callbacks:{async signIn({user:e}){console.log("callbacks, signIn ------- "),console.log({user:e});let o=(await getKeystoneContext()).sudo(),t={authId:e.id};"credentials"===e._type&&(t={id:e.id}),console.log({idObj:t});let n=await o.query.User.findOne({where:t,query:`
          id
          role {
            name
            canManagePosts
            canManageUsers
            canManageRoles
          }
        `});return n?(u=n,!0):(console.log("no user found in db"),!1)},async session({session:e,token:o}){console.log("******** async session"),console.log({seshUser:u});let t=(await getKeystoneContext()).sudo(),n=await t.query.User.findOne({where:{email:e.user?.email},query:`
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
          `});if(!n)return console.log("no foundUser found in db"),null;let a={...e,authId:o.sub,id:o.sub,itemId:n?.id,data:{role:n?.role}};return console.log({sessionObj:a}),a}},providers:[(0,s.Z)({clientId:process.env.GITHUB_ID,clientSecret:process.env.GITHUB_SECRET}),(0,l.Z)({name:"credentials",credentials:{email:{label:"Email",type:"email",placeholder:"name@mail.com"},password:{label:"Password",type:"password",placeholder:"******"}},authorize:async(e,o)=>{console.log("authorize authorize authorize authorize authorize"),e?.email||e?.password||e||console.log("insufficent credentials");let t=(await getKeystoneContext()).sudo(),n=await t.query.User.findOne({where:{email:e?.email},query:`
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
          `});if(!n)return console.log("no foundUser found in db"),null;let a=await r().compare(e?.password,n.password);return e?.email===n.email&&a?(console.log("user is authenticated, ",n.email),{_type:"credentials",id:n.id,authId:n.email,name:n.name,image:n.image,email:n.email,role:n.role,img:n.img,user:{email:n.email}}):(console.log("!!!!! login no work for, ",e?.email),null)}})]},g={async get({context:e}){console.log("nextAuthSessionStrategy nextAuthSessionStrategy nextAuthSessionStrategy");let{req:o,res:t}=e,{headers:n}=o??{};if(!n?.cookie||!t)return;let s={};for(let e of n.cookie.split(";")){let[o,t]=e.trim().split("=");s[o]=decodeURIComponent(t)}let l=await (0,a.getServerSession)({headers:n,cookies:s},t,m);if(!l)return;let{authId:i,user:r}=l,{email:d}=r;if(!i&&!d)return;let c=await e.sudo().db.User.findOne({where:{email:d}});if(!c)return console.log("no user found for auth");let u=c.roleId||"no_roleId",g=await e.sudo().db.Role.findOne({where:{id:u}}),y={id:c.id,itemId:c.id,data:{id:c.id,image:c.image,dateCreated:c.createdAt,name:c.name,email:c.email}};return g||console.log("!!!!!! user has no role assigned for auth"),g&&Object.assign(y,{data:{role:g}}),y},async start(){},async end(){}}}};
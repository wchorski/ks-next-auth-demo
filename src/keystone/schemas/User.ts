import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import {  password, relationship, select, text, timestamp,  } from "@keystone-6/core/fields";
import { permissions, rules } from "../access";
// @ts-ignore
import bcrypt from 'bcryptjs';

const WORK_FACTOR = Number(process.env.WORK_FACTOR) || 13

export const User:Lists.User = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,
  // access: {
  //   filter: {
  //     // todo will this cause privacy problems with clients?
  //     // query: () => true,
  //     query: rules.canManageUsers,
  //     update: rules.canManageUsers,
  //     // delete: () => false,
  //   },
  //   operation: {

  //     query: () => true,
  //     create: () => true,
  //     // todo NEED TO FIX THIS
  //     // update: () => permissions.canManageUsers,
  //     update: () => true,
  //     // update: permissions.isLoggedIn,
  //     delete: permissions.canManageUsers,
  //   },
  // },

  // this is the fields for our User list
  fields: {
    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    name: text(),
    nameLast: text(),
    authId: text({ isIndexed: 'unique' }),

    email: text({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project
      isIndexed: 'unique',
    }),

    password: text({
      hooks: { beforeOperation: async ({ operation,resolvedData}) => {

        if(operation === 'create' || operation === 'update'){
          console.log({resolvedData})
          if(!resolvedData?.password) return console.log('no password set');
  
          const hash = await bcrypt.hash(resolvedData?.password, WORK_FACTOR)
  
          console.log({
            password: resolvedData?.password,
            hash,
          })

          resolvedData.password = hash
        }
        

      }}
    }),
    image: text(),

    // we can use this field to see what Posts this User has authored
    //   more on that in the Post list below
    // posts: relationship({ ref: 'Post.author', many: true }),
    role: relationship({ ref: 'Role.assignedTo'}),
    posts: relationship({ ref: 'Post.author', many: true}),

    createdAt: timestamp({
      // this sets the timestamp to Date.now() when the user is first created
      defaultValue: { kind: 'now' },
    }),
  },
})
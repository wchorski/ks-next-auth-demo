import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import {  password, relationship, select, text, timestamp,  } from "@keystone-6/core/fields";
import { document } from '@keystone-6/fields-document';
import { permissions, rules } from "../access";


export const Post: Lists.Post = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  // access: allowAll,
  access: {
    filter: {
      // todo will this cause privacy problems with clients?
      // query: () => false,
      // update: () => true,
      query: rules.canManagePosts,
      update: rules.canManagePosts,
      delete: () => false,
    },
    operation: {
      query: () => true,  
      // query: permissions.canManagePosts,  
      create: () => true,
      delete: () => true,
      update: () => true,
      // delete: permissions.canManagePosts,
      // update: permissions.canManagePosts,
    }
  },

  // this is the fields for our Post list
  fields: {
    title: text({ validation: { isRequired: true } }),

    // the document field can be used for making rich editable content
    //   you can find out more at https://keystonejs.com/docs/guides/document-fields
    content: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),

    // with this field, you can set a User as the author for a Post
    author: relationship({
      // we could have used 'User', but then the relationship would only be 1-way
      ref: 'User.posts',

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },

      // a Post can only have one author
      //   this is the default, but we show it here for verbosity
      many: false,
    }),

    // with this field, you can add some Tags to Posts
    // tags: relationship({
    //   // we could have used 'Tag', but then the relationship would only be 1-way
    //   ref: 'Tag.posts',

    //   // a Post can have many Tags, not just one
    //   many: true,

    //   // this is some customisations for changing how this will look in the AdminUI
    //   ui: {
    //     displayMode: 'cards',
    //     cardFields: ['name'],
    //     inlineEdit: { fields: ['name'] },
    //     linkToItem: true,
    //     inlineConnect: true,
    //     inlineCreate: { fields: ['name'] },
    //   },
    // }),
  },
})
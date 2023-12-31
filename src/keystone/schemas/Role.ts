import { list } from "@keystone-6/core";
import type { Lists } from '.keystone/types';
import { allowAll } from "@keystone-6/core/access";
import { checkbox, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "../access";
import { permissionFields } from "./permissions";
// import { permissionFields } from "./authFields";

// @ts-ignore
export const Role:Lists.Role = list({
  // todo modern keystone 6 way of doing permissions
  access: allowAll, 
  // access: {
  //   operation: {
  //     query: permissions.canManageRoles,  
  //     create: permissions.canManageRoles,
  //     delete: permissions.canManageRoles,
  //     update: permissions.canManageRoles,
  //   }
  // },
  // ui: {
  //   hideCreate: (args) => !permissions.canManageRoles(args),
  //   hideDelete: (args) => !permissions.canManageRoles(args),
  //   isHidden: (args) => !permissions.canManageRoles(args),
  // },
  fields: {
    name: text({ validation: { isRequired: true}, isIndexed: 'unique' }),
    ...permissionFields,
    assignedTo: relationship({
      hooks: {
        beforeOperation: async ({operation, resolvedData, context}) => {
          if(operation === 'create') {
            resolvedData.assignedTo.connect = {name: 'client'}
          }
        }
      },
      ref: 'User.role', 
      many: true,
      ui: {
        itemView: { fieldMode: 'edit' },
      },
    }),

  }
})
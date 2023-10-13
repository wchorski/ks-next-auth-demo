import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, text, timestamp } from '@keystone-6/core/fields';
import { document } from '@keystone-6/fields-document';
// @ts-ignore
import type { Lists } from '.keystone/types';
import { User } from './schemas/User';
import { Role } from './schemas/Role';
import { Post } from './schemas/Post';

export const lists: Lists = {
  User,
  Role,
  Post,
};

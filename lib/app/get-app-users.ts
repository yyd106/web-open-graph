import type { Users } from '@/app/api/app/users/route';

import axios from 'axios';

export async function getAppUsers() {
  try {
    const {
      data,
    }: {
      data: {
        object: 'Users';
        users: Users;
      };
    } = await axios.get('/api/app/users');
    return data;
  } catch (error) {
    throw new Error('Something went wrong');
  }
}

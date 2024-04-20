import type { Address } from 'viem';

import type { Profile } from '../../utils/types';

import axios from 'axios';

export async function appDiscoGetProfileFromAddress(address?: Address) {
  try {
    const { data }: { data: Profile } = await axios.get(
      `/api/disco/profile-from-address`,
      {
        params: {
          address: address,
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error('something went wrong');
  }
}

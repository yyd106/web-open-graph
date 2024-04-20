import type { Address } from 'viem';

import type { Profile } from '../../utils/types';

import axios from 'axios';

export async function appDiscoGetProfileFromDID(address?: Address) {
  try {
    const { data }: { data: Profile } = await axios.get(
      `/api/disco/profile-from-did`,
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

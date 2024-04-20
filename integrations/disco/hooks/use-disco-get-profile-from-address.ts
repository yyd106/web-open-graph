import type { Address } from 'viem';

import { useQuery } from '@tanstack/react-query';

import { appDiscoGetProfileFromAddress } from '@/integrations/disco/routes/get-profile-from-address/client';

export const useDiscoGetProfileFromAddress = (
  address?: Address,
  queryKey?: any
) => {
  return useQuery({
    queryKey: ['discoProfileFromAddress', address, queryKey],
    queryFn: async () => appDiscoGetProfileFromAddress(address),
  });
};

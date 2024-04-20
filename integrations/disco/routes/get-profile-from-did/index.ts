import type { Profile } from '../../utils/types';

import { discoClient } from '@/integrations/disco/disco-client';

export async function discoGetProfileFromDID(did: string) {
  const { data }: { data: Profile } = await discoClient.get(`/profile/${did}`);
  return data;
}

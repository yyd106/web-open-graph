import type { Credential } from '../../utils/types';

import { discoClient } from '@/integrations/disco/disco-client';

export async function discoGetCredentialsFromDID(did?: string) {
  if (!did) {
    return null;
  }
  const { data }: { data: Credential[] } = await discoClient.get(
    `/profile/${did}/credentials`
  );
  return data;
}

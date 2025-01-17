import type { Channel, UseSearchChannelProps } from '../utils/types';

import * as PushAPI from '@pushprotocol/restapi';
import { useQuery } from '@tanstack/react-query';

const searchChannels = async ({
  query,
  env,
  page,
  limit,
}: UseSearchChannelProps) => {
  return (await PushAPI.channels.search({
    query,
    env,
    page,
    limit,
  })) as Channel[];
};

export const useSearchChannels = ({
  query,
  env,
  page,
  limit,
}: UseSearchChannelProps) => {
  return useQuery({
    queryKey: ['search-channels', query, env, page, limit],
    queryFn: () => searchChannels({ query, env, page, limit }),
    refetchOnWindowFocus: false,
  });
};

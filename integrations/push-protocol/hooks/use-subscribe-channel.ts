import type { SubscribeOptionsType } from '@pushprotocol/restapi/src/lib/channels';

import * as PushAPI from '@pushprotocol/restapi';
import { useMutation } from '@tanstack/react-query';

const subscribe = (args: SubscribeOptionsType) => {
  return PushAPI.channels.subscribe(args);
};

export const useSubscribe = () => {
  return useMutation({
    mutationFn: subscribe,
  });
};

import type {
  UserSubscription,
  UseUserSubscriptionProps,
} from '../utils/types';

import * as PushAPI from '@pushprotocol/restapi';
import { useQuery } from '@tanstack/react-query';

const fetchUserSubscriptions = async ({
  env,
  user,
}: UseUserSubscriptionProps) => {
  return (await PushAPI.user.getSubscriptions({
    env,
    user,
  })) as UserSubscription[];
};

export const useUserSubscriptions = ({
  env,
  user,
}: UseUserSubscriptionProps) => {
  return useQuery({
    queryKey: ['user-subscriptions', env, user],
    queryFn: () => fetchUserSubscriptions({ env, user }),
    refetchOnWindowFocus: false,
  });
};

import type { CreateUserProps } from '@pushprotocol/restapi/src/lib/user';

import * as PushAPI from '@pushprotocol/restapi';
import { useMutation } from '@tanstack/react-query';

const createUser = (args: CreateUserProps) => {
  return PushAPI.user.create(args);
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUser,
  });
};

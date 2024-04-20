import type { EventData } from '../utils/types';

import { useMutation } from '@tanstack/react-query';

import { appDiscoIssueProofOfHack } from '../routes/issue-proof-of-hack/client';

export const useDiscoIssueProofOfHack = () => {
  return useMutation({
    mutationFn: (vars: EventData) => {
      return appDiscoIssueProofOfHack(vars);
    },
  });
};

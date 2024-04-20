import type { Address } from 'viem';

import { useAccount } from 'wagmi';

interface ContractChainList {
  [key: number]: Address;
}

export const useLoadContractFromChainId = (list: ContractChainList) => {
  const { chain } = useAccount();
  return list[chain?.id || 1];
};

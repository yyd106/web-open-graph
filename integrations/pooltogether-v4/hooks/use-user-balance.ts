import { useAccount, useChainId } from 'wagmi';

import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id';
import { TICKET_CONTRACT } from '@/actions/pooltogether-v4/utils/ticket-contract-list';
import { USDC_CONTRACT } from '@/actions/pooltogether-v4/utils/usdc-contract-list';

import { useReadErc20BalanceOf } from '@/lib/generated/blockchain';
import useWatchChain from '@/lib/hooks/web3/use-watch-chain';

export function useUserBalance({ type }: { type: 'deposit' | 'withdraw' }) {
  const { address: accountAddress } = useAccount();
  const chainId = useChainId();

  const address = useLoadContractFromChainId(
    type === 'deposit' ? USDC_CONTRACT : TICKET_CONTRACT
  );
  const { data: erc20Balance, queryKey } = useReadErc20BalanceOf({
    chainId,
    address,
    args: accountAddress ? [accountAddress] : undefined,
  });

  useWatchChain(queryKey);

  return erc20Balance ?? BigInt(0);
}

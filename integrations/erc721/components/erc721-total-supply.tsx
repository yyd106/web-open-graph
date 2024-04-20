import type { ERC721Props } from '../utils/types';

import useWatchChain from '@/lib/hooks/web3/use-watch-chain';

import { useReadErc721TotalSupply } from '../generated/erc721-wagmi';

export function ERC721TotalSupply({
  address,
  chainId,
  className,
  ...props
}: ERC721Props) {
  const { data, queryKey } = useReadErc721TotalSupply({
    address,
    chainId,
  });

  useWatchChain(queryKey);

  return (
    <span className={className} {...props}>
      {data?.toString()}
    </span>
  );
}

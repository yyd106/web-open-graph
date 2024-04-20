import type { ERC1155Props } from '../utils/types';

import useWatchChain from '@/lib/hooks/web3/use-watch-chain';

import { useReadErc1155TotalSupply } from '../generated/erc1155-wagmi';

interface ERC1155TotalSupplyProps extends ERC1155Props {
  tokenId: bigint;
}

export function ERC1155TokenTotalSupply({
  address,
  chainId,
  className,
  tokenId,
  ...props
}: ERC1155TotalSupplyProps) {
  const { data, queryKey } = useReadErc1155TotalSupply({
    address,
    chainId,
    args: [tokenId],
  });

  useWatchChain(queryKey);

  return (
    <span className={className} {...props}>
      {data?.toString()}
    </span>
  );
}

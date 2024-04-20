import type { ERC721Props } from '../utils/types';

import useWatchChain from '@/lib/hooks/web3/use-watch-chain';

import { useReadErc721OwnerOf } from '../generated/erc721-wagmi';

interface ERC721OwnerOfProps extends ERC721Props {
  tokenId: bigint;
}

export function ERC721OwnerOf({
  address,
  chainId,
  className,
  tokenId,
  ...props
}: ERC721OwnerOfProps) {
  const { data, queryKey } = useReadErc721OwnerOf({
    address,
    chainId,
    args: [tokenId],
  });

  useWatchChain(queryKey);

  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

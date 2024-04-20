import type { ERC1155Props } from '../utils/types';

import useWatchChain from '@/lib/hooks/web3/use-watch-chain';

import { useReadErc1155AccountsByToken } from '../generated/erc1155-wagmi';

interface ERC1155OwnerOfProps extends ERC1155Props {
  tokenId: bigint;
}

export function Erc1155OwnerOf({
  address,
  chainId,
  className,
  tokenId,
  ...props
}: ERC1155OwnerOfProps) {
  const { data, queryKey } = useReadErc1155AccountsByToken({
    address,
    chainId,
    args: [tokenId],
  });

  useWatchChain(queryKey);

  return (
    <span className={className} {...props}>
      {data && JSON.stringify(data)}
    </span>
  );
}

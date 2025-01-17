import type { ERC1155Props } from '../utils/types';

import { useReadErc1155Uri } from '../generated/erc1155-wagmi';

interface ERC1155TokenUriProps extends ERC1155Props {
  tokenId: bigint;
}

export function ERC1155TokenUri({
  address,
  chainId,
  className,
  tokenId,
  ...props
}: ERC1155TokenUriProps) {
  const { data: tokenUriData } = useReadErc1155Uri({
    address,
    chainId,
    args: [tokenId],
  });

  return (
    <span className={className} {...props}>
      {tokenUriData}
    </span>
  );
}

import type { ERC1155Props } from '../utils/types';

import { useERC1155Metadata } from '../hooks/use-erc1155-metadata';

interface ERC1155TokenUriNameProps extends ERC1155Props {
  tokenId: bigint;
}

export function ERC1155TokenUriName({
  address,
  chainId,
  className,
  tokenId,
  ...props
}: ERC1155TokenUriNameProps) {
  const metadata = useERC1155Metadata({ address, chainId, tokenId });

  if (!metadata.data) return null;

  return (
    <span className={className} {...props}>
      {metadata.data?.name}
    </span>
  );
}

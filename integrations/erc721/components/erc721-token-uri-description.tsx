import type { ERC721Props } from '../utils/types';

import { useERC721Metadata } from '../hooks/use-erc721-metadata';

interface ERC721TokenUriNameProps extends ERC721Props {
  tokenId: bigint;
}

export function ERC721TokenUriDescription({
  address,
  chainId,
  className,
  tokenId,
  ...props
}: ERC721TokenUriNameProps) {
  const metadata = useERC721Metadata({ address, chainId, tokenId });

  return (
    <span className={className} {...props}>
      {metadata.data?.description}
    </span>
  );
}

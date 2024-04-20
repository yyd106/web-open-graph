import type { ERC721Props } from '../utils/types';

import { useReadErc721Symbol } from '../generated/erc721-wagmi';

export function ERC721Symbol({
  address,
  chainId,
  className,
  ...props
}: ERC721Props) {
  const { data } = useReadErc721Symbol({
    address,
    chainId,
  });

  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

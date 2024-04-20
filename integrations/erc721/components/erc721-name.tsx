import type { ERC721Props } from '../utils/types';

import { useReadErc721Name } from '../generated/erc721-wagmi';

export function ERC721Name({
  address,
  chainId,
  className,
  ...props
}: ERC721Props) {
  const { data } = useReadErc721Name({
    address,
    chainId,
  });
  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

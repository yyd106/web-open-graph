import type { ERC1155Props } from '../utils/types';

import { useReadErc1155Name } from '../generated/erc1155-wagmi';

export function Erc1155Name({
  address,
  chainId,
  className,
  ...props
}: ERC1155Props) {
  const { data } = useReadErc1155Name({
    address,
    chainId,
  });
  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

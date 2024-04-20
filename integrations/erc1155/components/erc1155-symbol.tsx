import type { ERC1155Props } from '../utils/types';

import { useReadErc1155Symbol } from '../generated/erc1155-wagmi';

export function Erc1155Symbol({
  address,
  chainId,
  className,
  ...props
}: ERC1155Props) {
  const { data } = useReadErc1155Symbol({
    address,
    chainId,
  });

  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

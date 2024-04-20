import type { ERC1155Props } from '../utils/types';

import { useReadErc1155ContractUri } from '../generated/erc1155-wagmi';

export function ERC1155ContractUri({
  address,
  chainId,
  className,
  ...props
}: ERC1155Props) {
  const { data } = useReadErc1155ContractUri({
    address,
    chainId,
  });
  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

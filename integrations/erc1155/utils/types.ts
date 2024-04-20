import type { Address } from 'viem';

import type { HTMLAttributes } from 'react';

export interface ERC1155Props extends HTMLAttributes<HTMLElement> {
  address?: Address;
  chainId?: number;
}

import type { Address } from 'viem';

import type { HTMLAttributes } from 'react';

export interface ERC721Props extends HTMLAttributes<HTMLElement> {
  address?: Address;
  chainId?: number;
}

import type { HttpTransport } from 'viem';

import { useMemo } from 'react';
import { usePublicClient } from 'wagmi';
import { FallbackProvider, JsonRpcProvider } from 'ethers';

export function publicClientToProvider(
  publicClient: NonNullable<ReturnType<typeof usePublicClient>>
) {
  const { chain, transport } = publicClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === 'fallback')
    return new FallbackProvider(
      (transport.transports as ReturnType<HttpTransport>[]).map(
        ({ value }) => new JsonRpcProvider(value?.url, network)
      )
    );

  return new JsonRpcProvider(transport.url as string, network);
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId }: { chainId?: number } = {}) {
  const publicClient = usePublicClient({ chainId });
  return useMemo(
    () => publicClient && publicClientToProvider(publicClient),
    [publicClient]
  );
}

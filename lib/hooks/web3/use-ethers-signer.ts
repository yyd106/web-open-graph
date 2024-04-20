import type { Account, Chain, Transport, WalletClient } from 'viem';

import type { JsonRpcSigner } from 'ethers';

import { useEffect, useState } from 'react';
import { useWalletClient } from 'wagmi';
import { BrowserProvider } from 'ethers';

export function walletClientToSigner(
  walletClient: WalletClient<Transport, Chain, Account>
) {
  const { account, chain, transport } = walletClient;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = provider.getSigner(account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: walletClient } = useWalletClient({ chainId });
  const [siner, setSiner] = useState<JsonRpcSigner>();

  useEffect(() => {
    if (!walletClient) return;
    walletClientToSigner(walletClient).then(setSiner);
  }, [walletClient]);

  return siner;
}

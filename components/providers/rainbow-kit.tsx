'use client';

import '@rainbow-me/rainbowkit/styles.css';

import type { ReactNode } from 'react';

import {
  darkTheme,
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { CHAINS, transports } from '@/config/networks';
import { useColorMode } from '@/lib/state/color-mode';

const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: 'YOUR_PROJECT_ID',
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [
        injectedWallet,
        metaMaskWallet,
        rainbowWallet,
        coinbaseWallet,
        walletConnectWallet,
      ],
    },
  ],
  chains: CHAINS as any,
  transports,
});

const queryClient = new QueryClient();

export function RainbowKit({ children }: { children: ReactNode }) {
  const [colorMode] = useColorMode();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={colorMode == 'dark' ? darkTheme() : lightTheme()}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

'use client';

import type { HTMLAttributes } from 'react';

import type { Address } from 'viem';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { formatUnits } from 'viem';
import { useAccount } from 'wagmi';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IsWalletConnected } from '@/components/shared/is-wallet-connected';
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected';

import useWatchChain from '@/lib/hooks/web3/use-watch-chain';

import {
  useReadErc20BalanceOf,
  useReadErc20Decimals,
  useReadErc20Name,
  useReadErc20Symbol,
  useReadErc20TotalSupply,
} from '../generated/erc20-wagmi';

interface ERC20Props extends HTMLAttributes<HTMLElement> {
  address: Address;
}

interface ERC20ChainIdProps extends ERC20Props {
  chainId?: number;
}

export function ERC20Image({ address, ...props }: ERC20Props) {
  return (
    <img
      alt={`Token ${address} icon`}
      className='mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md'
      src={`https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/${address}/logo.png`}
      {...props}
    />
  );
}

export function ERC20Name({
  address,
  chainId,
  className,
  ...props
}: ERC20ChainIdProps) {
  const { data } = useReadErc20Name({
    address,
    chainId,
  });
  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

export function ERC20Symbol({
  address,
  chainId,
  className,
  ...props
}: ERC20ChainIdProps) {
  const { data } = useReadErc20Symbol({
    address,
    chainId,
  });
  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

export function ERC20TotalSupply({
  address,
  chainId,
  className,
  ...props
}: ERC20ChainIdProps) {
  const { data: decimals } = useReadErc20Decimals({
    address,
    chainId,
  });

  const { data } = useReadErc20TotalSupply({
    address,
    chainId,
  });
  return (
    <span className={className} {...props}>
      {Number(formatUnits(data || BigInt(0), decimals || 1)).toLocaleString()}
    </span>
  );
}

// @TODO: Add Decimals to Display
export function ERC20Decimals({
  address,
  chainId,
  className,
  ...props
}: ERC20ChainIdProps) {
  const { data } = useReadErc20Decimals({
    address,
    chainId,
  });
  return (
    <span className={className} {...props}>
      {data}
    </span>
  );
}

export function ERC20Balance({
  address,
  chainId,
  className,
  ...props
}: ERC20ChainIdProps) {
  const { address: accountAddress } = useAccount();
  const { data: decimals } = useReadErc20Decimals({
    address,
    chainId,
  });
  const { data, queryKey } = useReadErc20BalanceOf({
    chainId,
    address,
    args: accountAddress ? [accountAddress] : undefined,
  });

  useWatchChain(queryKey);

  if (!data || !decimals) return null;

  return (
    <span className={className} {...props}>
      {' '}
      {Number(formatUnits(data, decimals)).toLocaleString()}
    </span>
  );
}

interface ERC20ReadProps extends ERC20ChainIdProps {
  showImage?: boolean;
  showBalance?: boolean;
  showTotalSupply?: boolean;
}

export function ERC20Read({
  className,
  address,
  chainId,
  showImage,
  showBalance,
  showTotalSupply,
  ...props
}: ERC20ReadProps) {
  return (
    <>
      <IsWalletConnected>
        <Card>
          <CardContent
            className={cn(
              'flex items-center justify-center gap-x-6',
              className
            )}
            {...props}
          >
            <div className='text-center'>
              <span className='text-3xl'>
                {showImage && (
                  <ERC20Image
                    address={address}
                    className='mx-auto h-12 w-12 rounded-full border-2 border-white shadow-md'
                  />
                )}
                <ERC20Name address={address} />
                <span className='ml-2'>
                  (
                  <ERC20Symbol address={address} chainId={chainId} />)
                </span>
              </span>
              <div className='my-4 flex items-center justify-center gap-4'>
                <span>
                  <span className='font-medium'>Decimals</span>{' '}
                  <ERC20Decimals address={address} chainId={chainId} />
                </span>
                {showTotalSupply && (
                  <>
                    <span>|</span>
                    <span>
                      <span className='font-medium'>Total Supply</span>{' '}
                      <ERC20TotalSupply address={address} chainId={chainId} />
                    </span>
                  </>
                )}
                {showBalance && (
                  <>
                    <span>|</span>
                    <span>
                      <span className='font-medium'>Balance</span>
                      <ERC20Balance address={address} />
                    </span>
                  </>
                )}
              </div>
            </div>
          </CardContent>
          <Separator className='my-4' />
          <CardFooter className='justify-between'>
            <h3 className='text-center'>ERC20 Read</h3>
            <p className='text-center text-sm text-muted-foreground'>
              Read core ERC20 token storage values
            </p>
          </CardFooter>
        </Card>
      </IsWalletConnected>
      <IsWalletDisconnected>
        <div className='flex items-center justify-center gap-10'>
          <ConnectButton />
        </div>
      </IsWalletDisconnected>
    </>
  );
}

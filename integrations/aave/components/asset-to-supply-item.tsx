'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { TiTick } from 'react-icons/ti';
import { formatUnits, parseUnits } from 'viem';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';

import {
  useWriteErc20Approve,
  useReadErc20Decimals,
  useReadErc20Allowance,
  useReadErc20BalanceOf,
} from '@/lib/generated/blockchain';
import { useToast } from '@/lib/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ContractWriteButton } from '@/components/blockchain/contract-write-button';

import useWatchChain from '@/lib/hooks/web3/use-watch-chain';

import { useWritePoolSupply } from '../generated/aave-wagmi';
import { useAave } from '../hooks/use-aave';

interface IAssetToSupplyItem {
  address: `0x${string}`;
  symbol: string;
  canBeCollateral: boolean;
  tokenPriceInUsd: number;
  liquidityRate: number;
  showIfZeroBalance: boolean;
}

export const AssetToSupplyItem = ({
  address,
  symbol,
  canBeCollateral,
  liquidityRate,
  showIfZeroBalance,
}: IAssetToSupplyItem) => {
  const { poolAddress } = useAave();
  const { address: user } = useAccount();
  const [supplyAmount, setSupplyAmount] = useState('');
  const [open, setOpen] = useState(false);

  const { data: tokenBalance, queryKey: tokenBalanceQueryKey } =
    useReadErc20BalanceOf({
      address,
      args: user ? [user] : undefined,
    });
  const { data: decimals } = useReadErc20Decimals({ address });
  const { data: allowance, queryKey: allowanceQueryKey } =
    useReadErc20Allowance({
      address,
      args: user ? [user, poolAddress] : undefined,
    });

  useWatchChain(tokenBalanceQueryKey, allowanceQueryKey);

  const { toast } = useToast();

  const handleToast = () => {
    toast({
      title: 'Success',
      description: `${symbol} successfully supplied`,
      duration: 4200,
    });
  };

  const {
    data: dataApprove,
    isPending: isLoadingApproveWrite,
    writeContract: approveWrite,
  } = useWriteErc20Approve();

  const { isLoading: isLoadingApproveTx } = useWaitForTransactionReceipt({
    hash: dataApprove,
  });

  const {
    data: dataSupply,
    isPending: isLoadingSupplyWrite,
    writeContract: supplyWrite,
  } = useWritePoolSupply();

  const { isLoading: isLoadingSupplyTx, isSuccess: isSuccessTx } =
    useWaitForTransactionReceipt({
      hash: dataSupply,
    });

  const buttonAction = () => {
    if (
      Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) <
      Number(supplyAmount)
    ) {
      approveWrite({
        address,
        args: [
          poolAddress,
          parseUnits(`${Number(supplyAmount)}`, decimals ?? 18),
        ],
      });
    } else {
      supplyWrite({
        address: poolAddress,
        args: [
          address,
          parseUnits(`${Number(supplyAmount)}`, decimals ?? 18),
          user as `0x${string}`,
          0,
        ],
      });
    }
  };

  const isApproving = () =>
    Number(formatUnits(allowance ?? BigInt(1), decimals ?? 18)) <
    Number(supplyAmount);

  const setMaxAmount = () =>
    setSupplyAmount(
      Number(formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)).toString()
    );

  useEffect(() => {
    if (isSuccessTx) {
      handleToast();
      setOpen(false);
    }
  }, [isSuccessTx]);

  return tokenBalance !== BigInt(0) || showIfZeroBalance ? (
    <tr>
      <td className='mt-2 flex items-center justify-center px-4 py-2'>
        <Image
          alt={symbol?.toString() ?? ''}
          className='mr-2 rounded-full'
          height={25}
          src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
          width={25}
        />
        {symbol}
      </td>
      {tokenBalance === BigInt(0) ? (
        <td className='px-4 py-2 text-center text-muted-foreground'>0</td>
      ) : (
        <td className='px-4 py-2 text-center'>
          {Number(
            formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)
          ).toFixed(5)}
        </td>
      )}

      <td className='px-4 py-2 text-center'>
        {liquidityRate !== 0 ? `${liquidityRate.toFixed(2)}%` : '0'}
      </td>
      <td className='flex justify-center px-4 pb-2 text-center'>
        {canBeCollateral ? <TiTick color='green' size={30} /> : <p>—</p>}
      </td>
      <td className='px-4 py-2 text-center'>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger disabled={tokenBalance === BigInt(0)}>
            <Button className='mr-2' disabled={tokenBalance === BigInt(0)}>
              Supply
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Supply {symbol}</DialogTitle>
            <DialogDescription>
              <div className='mb-2 mt-4'>
                <label>Amount</label>
              </div>
              <div className='input bg-background'>
                <div className='flex items-center justify-between'>
                  <input
                    className='border-none bg-background'
                    placeholder='0.00'
                    type='text'
                    value={supplyAmount}
                    onChange={(e) => {
                      const regex = /^[0-9.,\b]+$/;
                      let value = e.target.value;
                      if (value === '' || regex.test(value)) {
                        if (value.startsWith('.') || value.startsWith(',')) {
                          value = `0${value}`;
                        }
                        value = value.replace(',', '.');
                        setSupplyAmount(value);
                        if (
                          Number(value) >
                          Number(
                            formatUnits(
                              tokenBalance ?? BigInt(1),
                              decimals ?? 18
                            )
                          )
                        )
                          setMaxAmount();
                      }
                    }}
                  />
                  <div className='flex items-center justify-between'>
                    <Image
                      alt={symbol?.toString() ?? ''}
                      className='mr-2 rounded-full'
                      height={25}
                      src={`https://app.aave.com/icons/tokens/${symbol.toLowerCase()}.svg`}
                      width={25}
                    />
                    <span className='font-bold'>{symbol}</span>
                  </div>
                </div>
                <div className='mt-2 flex items-center justify-between'>
                  <div className='flex items-center justify-between'>
                    <span>
                      Available:{' '}
                      {Number(
                        formatUnits(tokenBalance ?? BigInt(1), decimals ?? 18)
                      ).toFixed(5)}
                    </span>
                    <Button className='ml-3' onClick={setMaxAmount}>
                      Max
                    </Button>
                  </div>
                </div>
              </div>
              <div className='mb-2 mt-5'>
                <label>Transaction overview</label>
              </div>
              <div className='input bg-background'>
                <div className='my-3 flex items-center justify-between'>
                  <span>Supply APY</span>
                  <span className='font-bold'>
                    {liquidityRate !== 0 ? `${liquidityRate.toFixed(2)}` : '0'}%
                  </span>
                </div>
                <div className='mt-3 flex items-center justify-between'>
                  <span>Collateralization</span>
                  <span
                    className={
                      canBeCollateral ? 'text-green-500' : 'text-red-500'
                    }
                  >
                    {canBeCollateral ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
              <ContractWriteButton
                className='mt-5 w-full'
                disabled={
                  !Number(supplyAmount) ||
                  isLoadingApproveTx ||
                  isLoadingSupplyTx ||
                  isLoadingSupplyWrite ||
                  isLoadingApproveWrite
                }
                isLoadingTx={isLoadingApproveTx || isLoadingSupplyTx}
                isLoadingWrite={isLoadingApproveWrite || isLoadingSupplyWrite}
                loadingTxText={isApproving() ? `Approving...` : `Supplying...`}
                write={!!approveWrite || !!supplyWrite}
                onClick={buttonAction}
              >
                {`${isApproving() ? `Approve` : `Supply`} ${symbol}`}
              </ContractWriteButton>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  ) : (
    <div></div>
  );
};

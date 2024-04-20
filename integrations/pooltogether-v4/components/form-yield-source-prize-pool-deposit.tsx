'use client';

import * as Form from '@radix-ui/react-form';
import { useForm } from 'react-hook-form';
import { LuExternalLink } from 'react-icons/lu';

import { formatUnits, parseUnits, type BaseError } from 'viem';
import {
  useAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
} from 'wagmi';

import useDebounce from '@/lib/hooks/use-debounce';

import { USDC_CONTRACT } from '@/actions/pooltogether-v4/utils/usdc-contract-list';
import { PRIZE_POOL_CONTRACT } from '@/actions/pooltogether-v4/utils/prize-pool-contract-list';
import { useLoadContractFromChainId } from '@/actions/pooltogether-v4/hooks/use-load-contract-from-chain-id';

import {
  useReadErc20Allowance,
  useWriteErc20Approve,
  useReadErc20Decimals,
} from '@/lib/generated/blockchain';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContractWriteButton } from '@/components/blockchain/contract-write-button';
import { TransactionStatus } from '@/components/blockchain/transaction-status';
import { LinkComponent } from '@/components/shared/link-component';
import {
  useWritePoolTogetherPrizePoolDepositToAndDelegate,
  useSimulatePoolTogetherPrizePoolDepositToAndDelegate,
} from '@/integrations/pooltogether-v4/generated/pooltogether-v4-wagmi';
import { useUserBalance } from '@/integrations/pooltogether-v4/hooks/use-user-balance';

import useWatchChain from '@/lib/hooks/web3/use-watch-chain';

import { MINIMUM_DEPOSIT_AMOUNT } from '../utils/constants';

interface FormSchema {
  depositAmount: string;
}

export function PoolTogetherFormDeposit() {
  const { register, watch, handleSubmit, setValue } = useForm<FormSchema>();
  const { address } = useAccount();
  const { switchChain } = useSwitchChain();
  const prizePoolAddress = useLoadContractFromChainId(PRIZE_POOL_CONTRACT);
  const usdcAddress = useLoadContractFromChainId(USDC_CONTRACT);

  const userBalance = useUserBalance({ type: 'deposit' });
  const { data: decimals } = useReadErc20Decimals({ address: usdcAddress });
  const { data: allowance, queryKey } = useReadErc20Allowance({
    address: usdcAddress,
    args: address && prizePoolAddress ? [address, prizePoolAddress] : undefined,
    query: {
      enabled: Boolean(address && prizePoolAddress),
    },
  });

  useWatchChain(queryKey);

  const debouncedDepositAmount = useDebounce(watch('depositAmount'), 500);
  const bigIntDepositAmount = isNaN(Number(debouncedDepositAmount))
    ? BigInt(0)
    : parseUnits(`${Number(debouncedDepositAmount)}`, decimals || 6);

  const isValidContractCall =
    address &&
    !isNaN(Number(debouncedDepositAmount)) &&
    Number(debouncedDepositAmount) >= MINIMUM_DEPOSIT_AMOUNT;

  const {
    data: config,
    error,
    isError,
    refetch,
  } = useSimulatePoolTogetherPrizePoolDepositToAndDelegate({
    address: prizePoolAddress,
    args: [address!, bigIntDepositAmount, address!],
    query: {
      enabled: Boolean(isValidContractCall),
    },
  });

  const {
    data,
    writeContract: write,
    isPending: isLoadingWrite,
  } = useWritePoolTogetherPrizePoolDepositToAndDelegate();

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
    onReplaced: () => setValue('depositAmount', ''),
  });

  const {
    data: approveData,
    writeContract: writeApproval,
    isPending: isLoadingWriteApprove,
  } = useWriteErc20Approve();

  const { isLoading: isLoadingTxApprove } = useWaitForTransactionReceipt({
    hash: approveData,
    onReplaced: async () => refetch(),
  });

  const isApproved = allowance ? allowance >= bigIntDepositAmount : false;

  const onSubmit = () => {
    if (isApproved) {
      if (!config?.request) return;
      write?.(config.request);
    } else {
      if (!isValidContractCall) return;
      writeApproval?.({
        address: usdcAddress,
        args: [prizePoolAddress, bigIntDepositAmount],
      });
    }
  };

  if (!prizePoolAddress) {
    return (
      <div className='flex w-full flex-col justify-center'>
        <Button
          variant='destructive'
          className='mx-auto'
          onClick={() => switchChain?.({ chainId: 1 })}
        >
          Switch Network
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardContent>
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <Form.Field name='amountDeposit'>
            <div className='flex justify-between align-baseline'>
              <Form.Label className='mb-2 font-semibold'>Amount</Form.Label>
              <Form.Label className='mb-2'>
                <span
                  className='ml-10 cursor-pointer hover:underline'
                  onClick={() =>
                    setValue(
                      'depositAmount',
                      formatUnits(userBalance, decimals || 1)
                    )
                  }
                >
                  {Number(formatUnits(userBalance, decimals || 1)).toFixed(2)}{' '}
                  USDC
                </span>
              </Form.Label>
            </div>
            <Form.Control asChild>
              <input className='input' {...register('depositAmount')} />
            </Form.Control>
          </Form.Field>
          {!isNaN(Number(debouncedDepositAmount)) &&
            Number(debouncedDepositAmount) > 0 &&
            Number(debouncedDepositAmount) < MINIMUM_DEPOSIT_AMOUNT && (
              <div
                className='relative mt-2 cursor-pointer rounded border border-red-400 bg-red-100 py-1 text-center text-red-700'
                role='alert'
                onClick={() => {
                  setValue('depositAmount', '2');
                }}
              >
                <strong className='cursor-pointer font-semibold'>
                  Min. 2 USDC
                </strong>
              </div>
            )}
          <div className='mb-4 mt-6 flex justify-center space-x-5'>
            <Form.Submit asChild className='w-full'>
              <ContractWriteButton
                isLoadingTx={isApproved ? isLoadingTx : isLoadingTxApprove}
                isLoadingWrite={
                  isApproved ? isLoadingWrite : isLoadingWriteApprove
                }
                loadingTxText={isApproved ? 'Depositing...' : 'Approving...'}
                write={
                  isApproved
                    ? !!write &&
                      Boolean(isValidContractCall) &&
                      bigIntDepositAmount <= userBalance
                    : !!writeApproval &&
                      Boolean(isValidContractCall) &&
                      bigIntDepositAmount <= userBalance
                }
              >
                {isApproved ? 'Deposit' : 'Approve'}
              </ContractWriteButton>
            </Form.Submit>
          </div>
          <TransactionStatus
            error={error as BaseError}
            hash={data}
            isError={Boolean(isApproved && isError && isValidContractCall)}
            isLoadingTx={isLoadingTx}
            isSuccess={isSuccess}
          />
        </Form.Root>
        {isSuccess && (
          <div className='my-6 text-center text-sm font-semibold'>
            <span>Manage your account on</span>
            <LinkComponent
              isExternal
              className='mx-auto mt-1 flex w-fit items-center text-xl'
              href='https://app.pooltogether.com/'
            >
              <span>PoolTogether</span>{' '}
              <LuExternalLink className='ml-1' size='16' />
            </LinkComponent>
          </div>
        )}
      </CardContent>
      <Separator className='my-4' />
      <CardFooter className='justify-between'>
        <h3 className='text-center'>Deposit</h3>
        <p className='text-center text-sm text-muted-foreground'>
          Start saving today
        </p>
      </CardFooter>
    </Card>
  );
}

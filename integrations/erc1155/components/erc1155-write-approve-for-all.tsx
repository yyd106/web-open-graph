import type { BaseError, Address } from 'viem';

import { useForm } from 'react-hook-form';

import { useWaitForTransactionReceipt } from 'wagmi';

import useDebounce from '@/lib/hooks/use-debounce';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContractWriteButton } from '@/components/blockchain/contract-write-button';
import { TransactionStatus } from '@/components/blockchain/transaction-status';

import {
  useWriteErc1155SetApprovalForAll,
  useSimulateErc1155SetApprovalForAll,
} from '../generated/erc1155-wagmi';

interface Erc1155WriteSetApprovalForAllProps {
  address: Address;
}

export function Erc1155WriteApproveForAll({
  address,
}: Erc1155WriteSetApprovalForAllProps) {
  const { register, handleSubmit, watch } = useForm();
  const watchToAddress: Address = watch('toAddress');
  const watchShouldApproved: boolean = watch('shouldApproved');
  const debouncedToAddress = useDebounce(watchToAddress, 500);
  const debouncedShouldApproved = useDebounce(watchShouldApproved, 500);

  const {
    data: config,
    error,
    isError,
  } = useSimulateErc1155SetApprovalForAll({
    address,
    args: [debouncedToAddress, debouncedShouldApproved],
    query: {
      enabled: Boolean(debouncedToAddress && debouncedShouldApproved),
    },
  });

  const {
    data,
    writeContract: write,
    isPending: isLoadingWrite,
  } = useWriteErc1155SetApprovalForAll();

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  const onSubmit = () => {
    if (config?.request) write?.(config.request);
  };

  return (
    <Card>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <label>Address</label>
          <input {...register('toAddress')} className='input' />
          <label>Approve?</label>
          <input
            type='checkbox'
            {...register('shouldApproved')}
            className='input'
          />
          <ContractWriteButton
            isLoadingTx={isLoadingTx}
            isLoadingWrite={isLoadingWrite}
            loadingTxText='Approving...'
            type='submit'
            write={!!write}
          >
            Approve For All
          </ContractWriteButton>
          <TransactionStatus
            error={error as BaseError}
            hash={data}
            isError={
              isError && Boolean(debouncedToAddress && debouncedShouldApproved)
            }
            isLoadingTx={isLoadingTx}
            isSuccess={isSuccess}
          />
        </form>
      </CardContent>
      <Separator className='my-4' />
      <CardFooter className='justify-between'>
        <h3 className='text-center'>ERC1155 Set Approval For All</h3>
        <p className='text-center text-sm text-gray-500'>
          Approve all tokens to any address
        </p>
      </CardFooter>
    </Card>
  );
}

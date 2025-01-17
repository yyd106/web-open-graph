import type { BaseError, Address } from 'viem';

import { useForm } from 'react-hook-form';

import { useWaitForTransactionReceipt } from 'wagmi';

import useDebounce from '@/lib/hooks/use-debounce';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContractWriteButton } from '@/components/blockchain/contract-write-button';
import { TransactionStatus } from '@/components/blockchain/transaction-status';

import {
  useWriteErc1155Approve,
  useSimulateErc1155Approve,
} from '../generated/erc1155-wagmi';

interface Erc1155WriteApproveProps {
  address: Address;
}

export function Erc1155WriteApprove({ address }: Erc1155WriteApproveProps) {
  const { register, handleSubmit, watch } = useForm();

  const debouncedToAddress = useDebounce(watch('toAddress'), 500);
  const debouncedTokenId = useDebounce(watch('tokenId'), 500);
  const debouncedTargetValue = useDebounce(watch('targetValue'), 500);

  const {
    data: config,
    error,
    isError,
  } = useSimulateErc1155Approve({
    address,
    args: [
      debouncedToAddress!,
      BigInt(debouncedTokenId),
      BigInt(debouncedTargetValue),
    ],
    query: {
      enabled: Boolean(
        debouncedToAddress && debouncedTokenId && debouncedTargetValue
      ),
    },
  });

  const {
    data,
    writeContract: write,
    isPending: isLoadingWrite,
  } = useWriteErc1155Approve();

  const { isLoading: isLoadingTx, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  const onSubmit = () => {
    if (config?.request) write?.(config.request);
  };

  return (
    <Card>
      <CardContent>
        {' '}
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <label>Contract Address</label>
          <input {...register('toAddress')} className='input' />
          <label>Token Id</label>
          <input {...register('tokenId')} className='input' />
          <label>Target value</label>
          <input {...register('targetValue')} className='input' />
          <ContractWriteButton
            isLoadingTx={isLoadingTx}
            isLoadingWrite={isLoadingWrite}
            loadingTxText='Approving...'
            type='submit'
            write={!!write}
          >
            Approve
          </ContractWriteButton>
          <TransactionStatus
            error={error as BaseError}
            hash={data}
            isError={
              isError &&
              Boolean(
                debouncedToAddress && debouncedTokenId && debouncedTargetValue
              )
            }
            isLoadingTx={isLoadingTx}
            isSuccess={isSuccess}
          />
        </form>
      </CardContent>
      <Separator className='my-4' />
      <CardFooter className='justify-between'>
        <h3 className='text-center'>ERC1155 Approve</h3>
        <p className='text-center text-sm text-gray-500'>
          Approve any tokenId to any address
        </p>
      </CardFooter>
    </Card>
  );
}

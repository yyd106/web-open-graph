import Link from 'next/link';
import { useForm } from 'react-hook-form';

import useDebounce from '@/lib/hooks/use-debounce';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { useGetWalletTransactionsVerbose } from '../../hooks/transaction';
import { OutputData } from '../output-data';

interface FormSchema {
  chain: string;
  address: string;
}

const defaultValues = {
  chain: '0x1',
  address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
};

export function FormGetWalletTransactionsVerbose() {
  const { register, handleSubmit, watch } = useForm<FormSchema>({
    defaultValues,
  });

  const chain = useDebounce(watch('chain'), 500);
  const address = useDebounce(watch('address'), 500);

  const { data, error, isFetching, refetch } = useGetWalletTransactionsVerbose({
    chain,
    address,
    enabled: false,
  });

  const onsubmit = async () => {
    await refetch?.();
  };

  return (
    <Card className='w-full pt-6'>
      <CardContent>
        <form
          className='flex w-full flex-col gap-4'
          onSubmit={handleSubmit(onsubmit)}
        >
          <Label htmlFor='chain'>Chain</Label>
          <Input id='chain' {...register('chain')} />
          <Label htmlFor='address'>Address</Label>
          <Input id='address' {...register('address')} />
          <>{error && <span className='text-red-500'>{String(error)}</span>}</>
          <Button
            variant='emerald'
            disabled={isFetching || !chain || !address}
            type='submit'
          >
            {isFetching ? 'Loading...' : 'Submit'}
          </Button>
          <Separator />
          <div className='flex items-center justify-between'>
            <Link
              href='https://docs.moralis.io/web3-data-api/evm/reference/get-decoded-wallet-transaction'
              target='_blank'
              rel='noreferrer noopener'
              className={cn(buttonVariants({ variant: 'link' }), 'px-0')}
            >
              Get decoded transactions by wallet
            </Link>
            <p className='text-right text-sm text-muted-foreground'>
              Get native transactions and logs ordered by block number in
              descending order
            </p>
          </div>
        </form>
        <OutputData data={data} />
      </CardContent>
    </Card>
  );
}

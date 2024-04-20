import type { TransactionsResponse } from '../../utils/types';

import axios from 'axios';

export async function appEtherscanAccountTransactions(
  params?: BlockPagination
) {
  try {
    const { data }: { data: TransactionsResponse | undefined } =
      await axios.get('/api/etherscan/account/transactions', {
        params: params,
      });
    return data;
  } catch (error) {
    throw new Error(`Unexpected Error`);
  }
}

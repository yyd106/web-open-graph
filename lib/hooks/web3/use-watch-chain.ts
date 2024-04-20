import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useBlockNumber } from 'wagmi';

export default function useWatchChain(...queryKeys: any[]) {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const queryClient = useQueryClient();
  useEffect(() => {
    queryKeys.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  }, [blockNumber, queryClient]);
}

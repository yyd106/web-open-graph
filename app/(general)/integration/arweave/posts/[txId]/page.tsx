'use client';

import type { ArweaveTxId } from '@/integrations/arweave/utils/types';

import { Post } from '@/integrations/arweave/components/post';

export default function ERC20({ params }: { params: { txId: ArweaveTxId } }) {
  const { txId } = params;

  return <Post txId={txId} />;
}

import type { ComponentProps } from 'react';

import { Chat as PushChat } from '@pushprotocol/uiweb';

export function Chat(props: ComponentProps<typeof PushChat>) {
  return <PushChat {...props}></PushChat>;
}

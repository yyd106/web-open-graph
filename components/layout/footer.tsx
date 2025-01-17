import type { HTMLAttributes } from 'react';

import Link from 'next/link';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

import { LinkComponent } from '../shared/link-component';
import { buttonVariants } from '../ui/button';

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const classes = cn(
    className,
    'flex flex-col items-center justify-center px-4 py-6'
  );

  return (
    <footer className={classes} {...props}>
      <h3>{siteConfig.title}</h3>
      <Link
        href='https://openid3.xyz/'
        target='_blank'
        rel='noreferrer noopenner'
        className={cn(buttonVariants({ variant: 'link', size: 'sm' }))}
      >
        Built by OpenID3
      </Link>
      <div className='mt-2 flex items-center space-x-2'>
        <LinkComponent href={`${siteConfig.links.github}`}>
          <FaGithub />
        </LinkComponent>
        <LinkComponent href={`${siteConfig.links.twitter}`}>
          <FaTwitter />
        </LinkComponent>
        <LinkComponent href={`${siteConfig.links.discord}`}>
          <FaDiscord />
        </LinkComponent>
      </div>
    </footer>
  );
}

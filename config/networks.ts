// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Networks
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import { fallback, http, type Chain } from 'viem';

import {
  // arbitrum,
  // arbitrum,
  // arbitrumGoerli as arbitrumGoerliNoIcon,
  // baseGoerli as baseGoerliNoIcon,
  // base as baseNoIcon,
  // celoAlfajores as celoAlfajoresNoIcon,
  // celo as celoNoIcon,
  // gnosisChiado as gnosisChiadoNoIcon,
  // gnosis as gnosisNoIcon,
  // goerli as goerliNoIcon,
  hardhat,
  mainnet,
  // optimism,
  // optimismGoerli,
  // polygon,
  // polygonMumbai,
  sepolia as sepoliaNoIcon,
  mantle,
  mantleTestnet,
} from 'viem/chains';

import { env } from '@/env.mjs';

// const goerli = {
//   ...goerliNoIcon,
//   iconUrl: '/icons/NetworkEthereumTest.svg',
// };
const sepolia = {
  ...sepoliaNoIcon,
  iconUrl: '/icons/NetworkEthereumTest.svg',
};
// const arbitrumGoerli = {
//   ...arbitrumGoerliNoIcon,
//   iconUrl: '/icons/NetworkArbitrumTest.svg',
// };
// const base = {
//   ...baseNoIcon,
//   iconUrl: '/icons/NetworkBaseTest.svg',
// };

// const baseGoerli = {
//   ...baseGoerliNoIcon,
//   iconUrl: '/icons/NetworkBaseTest.svg',
// };
// const celo = {
//   ...celoNoIcon,
//   iconUrl: '/icons/NetworkCelo.svg',
// };
// const celoAlfajores = {
//   ...celoAlfajoresNoIcon,
//   iconUrl: '/icons/NetworkCeloTest.svg',
// };
// const gnosis = {
//   ...gnosisNoIcon,
//   iconUrl: '/icons/NetworkGnosis.svg',
// };
// const gnosisChiado = {
//   ...gnosisChiadoNoIcon,
//   iconUrl: '/icons/NetworkGnosis.svg',
// };

export const ETH_CHAINS_TEST = [
  // mainnet,
  // goerli,
  sepolia,
  // polygonMumbai,
  // celoAlfajores,
  // gnosisChiado,
  hardhat,
];
export const ETH_CHAINS_L2_TEST = [
  // TODO: replace with mantle sepolia testnet
  mantleTestnet,
  // baseGoerli,
  // optimismGoerli, arbitrumGoerli
];
export const ETH_CHAINS_PROD = [
  mainnet,
  mantle,
  // optimism,
  // arbitrum,
  // polygon,
  // celo,
  // gnosis,
  // goerli,
  // base,
  // baseGoerli,
  // polygonMumbai,
];
export const ETH_CHAINS_DEV =
  env.NEXT_PUBLIC_PROD_NETWORKS_DEV === 'true'
    ? [...ETH_CHAINS_PROD, ...ETH_CHAINS_TEST, ...ETH_CHAINS_L2_TEST]
    : [...ETH_CHAINS_TEST, ...ETH_CHAINS_L2_TEST];

export const CHAINS: (Chain & {
  iconUrl?: string | (() => Promise<string>) | null;
  iconBackground?: string;
})[] = process.env.NODE_ENV === 'production' ? ETH_CHAINS_PROD : ETH_CHAINS_DEV;

function getTransport() {
  const rest = {
    [mantle.id]: http(),
    [mantleTestnet.id]: http(),
  };
  if (env.NEXT_PUBLIC_ALCHEMY_API_KEY && env.NEXT_PUBLIC_INFURA_API_KEY) {
    return {
      [mainnet.id]: fallback([
        http(
          `https://eth-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        ),
        http(`https://mainnet.infura.io/v3/${env.NEXT_PUBLIC_INFURA_API_KEY}`),
      ]),
      [sepolia.id]: fallback([
        http(
          `https://eth-sepolia.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
        ),
        http(`https://sepolia.infura.io/v3/${env.NEXT_PUBLIC_INFURA_API_KEY}`),
      ]),
      ...rest,
    };
  } else if (env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
    return {
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      ),
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      ),
      ...rest,
    };
  } else if (env.NEXT_PUBLIC_INFURA_API_KEY) {
    return {
      [mainnet.id]: http(
        `https://mainnet.infura.io/v3/${env.NEXT_PUBLIC_INFURA_API_KEY}`
      ),
      [sepolia.id]: http(
        `https://sepolia.infura.io/v3/${env.NEXT_PUBLIC_INFURA_API_KEY}`
      ),
      ...rest,
    };
  } else {
    return {
      [mainnet.id]: http(mainnet.rpcUrls.default.http[0]),
      [sepolia.id]: http(sepolia.rpcUrls.default.http[0]),
      ...rest,
    };
  }
}

export const transports = getTransport();

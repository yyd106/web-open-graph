import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// poolTogetherPrizePool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolTogetherPrizePoolAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_owner', internalType: 'address', type: 'address' },
      {
        name: '_yieldSource',
        internalType: 'contract IYieldSource',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AwardCaptured',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'contract ITicket',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Awarded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AwardedExternalERC20',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'winner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'AwardedExternalERC721',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'balanceCap',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BalanceCapSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'contract ITicket',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'ControlledTokenAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'yieldSource',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Deployed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'contract ITicket',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'error', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'ErrorAwardingExternalERC721',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'liquidityCap',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'LiquidityCapSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'pendingOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipOffered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'prizeStrategy',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'PrizeStrategySet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Swept',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'ticket',
        internalType: 'contract ITicket',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'TicketSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferredExternalERC20',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'token',
        internalType: 'contract ITicket',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'redeemed',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'award',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'awardBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_externalToken', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'awardExternalERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_externalToken', internalType: 'address', type: 'address' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'awardExternalERC721',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'balance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_externalToken', internalType: 'address', type: 'address' },
    ],
    name: 'canAwardExternal',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'captureAwardBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_compLike',
        internalType: 'contract ICompLike',
        type: 'address',
      },
      { name: '_to', internalType: 'address', type: 'address' },
    ],
    name: 'compLikeDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositTo',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_delegate', internalType: 'address', type: 'address' },
    ],
    name: 'depositToAndDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAccountedBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBalanceCap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidityCap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPrizeStrategy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTicket',
    outputs: [{ name: '', internalType: 'contract ITicket', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getToken',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_controlledToken',
        internalType: 'contract ITicket',
        type: 'address',
      },
    ],
    name: 'isControlled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_balanceCap', internalType: 'uint256', type: 'uint256' }],
    name: 'setBalanceCap',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_liquidityCap', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setLiquidityCap',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_prizeStrategy', internalType: 'address', type: 'address' },
    ],
    name: 'setPrizeStrategy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_ticket', internalType: 'contract ITicket', type: 'address' },
    ],
    name: 'setTicket',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'sweep',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_externalToken', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferExternalERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_from', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawFrom',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'yieldSource',
    outputs: [
      { name: '', internalType: 'contract IYieldSource', type: 'address' },
    ],
    stateMutability: 'view',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__
 */
export const useReadPoolTogetherPrizePool = /*#__PURE__*/ createUseReadContract(
  { abi: poolTogetherPrizePoolAbi },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"VERSION"`
 */
export const useReadPoolTogetherPrizePoolVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'VERSION',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"awardBalance"`
 */
export const useReadPoolTogetherPrizePoolAwardBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'awardBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"canAwardExternal"`
 */
export const useReadPoolTogetherPrizePoolCanAwardExternal =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'canAwardExternal',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"getAccountedBalance"`
 */
export const useReadPoolTogetherPrizePoolGetAccountedBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'getAccountedBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"getBalanceCap"`
 */
export const useReadPoolTogetherPrizePoolGetBalanceCap =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'getBalanceCap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"getLiquidityCap"`
 */
export const useReadPoolTogetherPrizePoolGetLiquidityCap =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'getLiquidityCap',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"getPrizeStrategy"`
 */
export const useReadPoolTogetherPrizePoolGetPrizeStrategy =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'getPrizeStrategy',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"getTicket"`
 */
export const useReadPoolTogetherPrizePoolGetTicket =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'getTicket',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"getToken"`
 */
export const useReadPoolTogetherPrizePoolGetToken =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'getToken',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"isControlled"`
 */
export const useReadPoolTogetherPrizePoolIsControlled =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'isControlled',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"onERC721Received"`
 */
export const useReadPoolTogetherPrizePoolOnErc721Received =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'onERC721Received',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"owner"`
 */
export const useReadPoolTogetherPrizePoolOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'owner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"pendingOwner"`
 */
export const useReadPoolTogetherPrizePoolPendingOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'pendingOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"yieldSource"`
 */
export const useReadPoolTogetherPrizePoolYieldSource =
  /*#__PURE__*/ createUseReadContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'yieldSource',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__
 */
export const useWritePoolTogetherPrizePool =
  /*#__PURE__*/ createUseWriteContract({ abi: poolTogetherPrizePoolAbi })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"award"`
 */
export const useWritePoolTogetherPrizePoolAward =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'award',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"awardExternalERC20"`
 */
export const useWritePoolTogetherPrizePoolAwardExternalErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'awardExternalERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"awardExternalERC721"`
 */
export const useWritePoolTogetherPrizePoolAwardExternalErc721 =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'awardExternalERC721',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"balance"`
 */
export const useWritePoolTogetherPrizePoolBalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'balance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"captureAwardBalance"`
 */
export const useWritePoolTogetherPrizePoolCaptureAwardBalance =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'captureAwardBalance',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"claimOwnership"`
 */
export const useWritePoolTogetherPrizePoolClaimOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'claimOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"compLikeDelegate"`
 */
export const useWritePoolTogetherPrizePoolCompLikeDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'compLikeDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"depositTo"`
 */
export const useWritePoolTogetherPrizePoolDepositTo =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'depositTo',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"depositToAndDelegate"`
 */
export const useWritePoolTogetherPrizePoolDepositToAndDelegate =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'depositToAndDelegate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWritePoolTogetherPrizePoolRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"setBalanceCap"`
 */
export const useWritePoolTogetherPrizePoolSetBalanceCap =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'setBalanceCap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"setLiquidityCap"`
 */
export const useWritePoolTogetherPrizePoolSetLiquidityCap =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'setLiquidityCap',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"setPrizeStrategy"`
 */
export const useWritePoolTogetherPrizePoolSetPrizeStrategy =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'setPrizeStrategy',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"setTicket"`
 */
export const useWritePoolTogetherPrizePoolSetTicket =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'setTicket',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"sweep"`
 */
export const useWritePoolTogetherPrizePoolSweep =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'sweep',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"transferExternalERC20"`
 */
export const useWritePoolTogetherPrizePoolTransferExternalErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'transferExternalERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWritePoolTogetherPrizePoolTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"withdrawFrom"`
 */
export const useWritePoolTogetherPrizePoolWithdrawFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'withdrawFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__
 */
export const useSimulatePoolTogetherPrizePool =
  /*#__PURE__*/ createUseSimulateContract({ abi: poolTogetherPrizePoolAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"award"`
 */
export const useSimulatePoolTogetherPrizePoolAward =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'award',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"awardExternalERC20"`
 */
export const useSimulatePoolTogetherPrizePoolAwardExternalErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'awardExternalERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"awardExternalERC721"`
 */
export const useSimulatePoolTogetherPrizePoolAwardExternalErc721 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'awardExternalERC721',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"balance"`
 */
export const useSimulatePoolTogetherPrizePoolBalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'balance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"captureAwardBalance"`
 */
export const useSimulatePoolTogetherPrizePoolCaptureAwardBalance =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'captureAwardBalance',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"claimOwnership"`
 */
export const useSimulatePoolTogetherPrizePoolClaimOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'claimOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"compLikeDelegate"`
 */
export const useSimulatePoolTogetherPrizePoolCompLikeDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'compLikeDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"depositTo"`
 */
export const useSimulatePoolTogetherPrizePoolDepositTo =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'depositTo',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"depositToAndDelegate"`
 */
export const useSimulatePoolTogetherPrizePoolDepositToAndDelegate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'depositToAndDelegate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulatePoolTogetherPrizePoolRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"setBalanceCap"`
 */
export const useSimulatePoolTogetherPrizePoolSetBalanceCap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'setBalanceCap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"setLiquidityCap"`
 */
export const useSimulatePoolTogetherPrizePoolSetLiquidityCap =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'setLiquidityCap',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"setPrizeStrategy"`
 */
export const useSimulatePoolTogetherPrizePoolSetPrizeStrategy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'setPrizeStrategy',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"setTicket"`
 */
export const useSimulatePoolTogetherPrizePoolSetTicket =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'setTicket',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"sweep"`
 */
export const useSimulatePoolTogetherPrizePoolSweep =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'sweep',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"transferExternalERC20"`
 */
export const useSimulatePoolTogetherPrizePoolTransferExternalErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'transferExternalERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulatePoolTogetherPrizePoolTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `functionName` set to `"withdrawFrom"`
 */
export const useSimulatePoolTogetherPrizePoolWithdrawFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolTogetherPrizePoolAbi,
    functionName: 'withdrawFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__
 */
export const useWatchPoolTogetherPrizePoolEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: poolTogetherPrizePoolAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"AwardCaptured"`
 */
export const useWatchPoolTogetherPrizePoolAwardCapturedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'AwardCaptured',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"Awarded"`
 */
export const useWatchPoolTogetherPrizePoolAwardedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'Awarded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"AwardedExternalERC20"`
 */
export const useWatchPoolTogetherPrizePoolAwardedExternalErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'AwardedExternalERC20',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"AwardedExternalERC721"`
 */
export const useWatchPoolTogetherPrizePoolAwardedExternalErc721Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'AwardedExternalERC721',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"BalanceCapSet"`
 */
export const useWatchPoolTogetherPrizePoolBalanceCapSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'BalanceCapSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"ControlledTokenAdded"`
 */
export const useWatchPoolTogetherPrizePoolControlledTokenAddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'ControlledTokenAdded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"Deployed"`
 */
export const useWatchPoolTogetherPrizePoolDeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'Deployed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"Deposited"`
 */
export const useWatchPoolTogetherPrizePoolDepositedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'Deposited',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"ErrorAwardingExternalERC721"`
 */
export const useWatchPoolTogetherPrizePoolErrorAwardingExternalErc721Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'ErrorAwardingExternalERC721',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"LiquidityCapSet"`
 */
export const useWatchPoolTogetherPrizePoolLiquidityCapSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'LiquidityCapSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"OwnershipOffered"`
 */
export const useWatchPoolTogetherPrizePoolOwnershipOfferedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'OwnershipOffered',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchPoolTogetherPrizePoolOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"PrizeStrategySet"`
 */
export const useWatchPoolTogetherPrizePoolPrizeStrategySetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'PrizeStrategySet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"Swept"`
 */
export const useWatchPoolTogetherPrizePoolSweptEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'Swept',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"TicketSet"`
 */
export const useWatchPoolTogetherPrizePoolTicketSetEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'TicketSet',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"TransferredExternalERC20"`
 */
export const useWatchPoolTogetherPrizePoolTransferredExternalErc20Event =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'TransferredExternalERC20',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolTogetherPrizePoolAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchPoolTogetherPrizePoolWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolTogetherPrizePoolAbi,
    eventName: 'Withdrawal',
  })

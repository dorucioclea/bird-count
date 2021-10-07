import { useAtom } from 'jotai';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { birdCountAtom } from '@store/bird-count';
import { useHandleIncrement } from '@hooks/use-increment';
import { useHandleDecrement } from '@hooks/use-decrement';
import { currentStacksExplorerState, currentChainState } from '@store/network-state';
import { currentBirdcountContractState } from '@store/network-state';
import { useAuth } from 'micro-stacks/react';
import { t, plural, Plural } from '@lingui/macro';
import { installWalletDialogAtom } from '@store/install-wallet-dialog';
import InstallWalletDialog from '@components/install-wallet-dialog';

// TODO: implement using @clarigen/web
// import { useCallback } from 'react';
// import { WebProvider, txErr, txOk } from '@clarigen/web';
// import { BirdCountContract, contracts } from '@contracts';
// import { birdCountInfo } from '@contracts/bird-count';

// TODO: implement using @clarigen/web
// function useHandleDecrement() {
//   return useCallback(() => {
//     const webconfig = {}; // ??
//     const { counter } = WebProvider.fromContracts(contracts, {
//       counter: birdCountInfo,
//     });
//     const configured_contracts = WebProvider.fromContracts(contracts, webconfig);
//     configured_contracts.callPublic({decrement});
//     WebProvider.callPublic({func: })
//   }
// }

function BirdCountButtonGroup() {
  const [birdCount] = useAtom(birdCountAtom);
  const handleIncrement = useHandleIncrement();
  const handleDecrement = useHandleDecrement();
  const [currentStacksExplorer] = useAtom(currentStacksExplorerState);
  const [currentChain] = useAtom(currentChainState);
  const [birdCountContract] = useAtom(currentBirdcountContractState);
  const { isSignedIn, handleSignIn, session } = useAuth();
  const [open, setOpen] = useAtom(installWalletDialogAtom);

  // TODO: implement using @clarigen/web
  //const handleDecrement = useHandleDecrement();

  return (
    <>
      <ButtonGroup size="large" variant="contained">
        <Tooltip title={t`Click to decrement`}>
          <Button
            href="#"
            onClick={
              isSignedIn
                ? () => handleDecrement()
                : () => {
                    try {
                      handleSignIn();
                    } catch (_e) {
                      console.log(_e);
                    }
                    !session && setOpen(true);
                  }
            }
          >
            <RemoveIcon />
          </Button>
        </Tooltip>
        <Button
          target="_blank"
          fullWidth={true}
          href={`${currentStacksExplorer}/txid/${birdCountContract}?chain=${currentChain}`}
        >
          {t({
            message: plural(birdCount, {
              one: '# bird',
              other: '# birds',
            }),
          })}
        </Button>
        {/* Another way to do plurals
      <Button>
        <Plural value={birdCount} one="# bird" other="# birds" />
      </Button> */}
        <Tooltip title={t`Click to increment`}>
          <Button
            href="#"
            onClick={
              isSignedIn
                ? () => handleIncrement()
                : () => {
                    try {
                      handleSignIn();
                    } catch (_e) {
                      console.log(_e);
                    }
                    !session && setOpen(true);
                  }
            }
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <InstallWalletDialog />
    </>
  );
}
//BirdCountButtonGroup.WhyDidYouRender = true;
export default BirdCountButtonGroup;

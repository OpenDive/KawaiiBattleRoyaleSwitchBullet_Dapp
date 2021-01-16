const { BridgeSDK, TOKEN, EXCHANGE_MODE, STATUS } = require('bridge-sdk');
const fs        = require('fs');
const configs   = require('bridge-sdk/lib/configs');
const secrets   = JSON.parse( fs.readFileSync('.secrets.json').toString().trim() );

const ethereumKey = secrets.eth_oracleKeys[0];

const operationCall = async () => {
    const bridgeSDK = new BridgeSDK({ logLevel: 2 }); // 2 - full logs, 1 - only success & errors, 0 - logs off
    await bridgeSDK.init(configs.testnet);
    await bridgeSDK.addEthWallet(ethereumKey);

    let operationId;

    // display operation status
    let intervalId = setInterval(async () => {
        if (operationId) {
            const operation = await bridgeSDK.api.getOperation(operationId);

            /*
            console.log(operation.status);
            console.log(
              'Action: ',
              operation.actions.filter(a => a.status === STATUS.IN_PROGRESS)
            );
            */

            if (operation.status !== STATUS.IN_PROGRESS) {
                clearInterval(intervalId);
            }
        }
    }, 4000);

    try {
        await bridgeSDK.sendToken(
            {
                type: EXCHANGE_MODE.ETH_TO_ONE,
                token: TOKEN.BUSD,
                amount: 1,
                oneAddress: 'one1nj2yl262805h9kvc2lgp7z2d7xazsemxaycput',
                ethAddress: '0x788e730EbFAE74F135181d695e54345211dAfd42',
            },
            id => (operationId = id)
        );
    } catch (e) {
        console.log('Error: ', e.message);
    }

    process.exit();
};

operationCall();
export default function WalletComponent({ closeModal }) {
    const context = useWeb3React()
    const localContext = store.getStore('web3context')
    var localConnector = null;
    if (localContext) {
      localConnector = localContext.connector
    }
    
    const {
      connector,
      library,
      account,
      activate,
      deactivate,
      active,
      error
    } = context;
  
    var connectorsByName = store.getStore('connectorsByName')
  
    const [activatingConnector, setActivatingConnector] = React.useState()
    useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined);
      }
    }, [activatingConnector, connector]);
  
    useEffect(() => {
      if (account && active && library) {
        store.setStore({ account: { address: account }, web3context: context })
        emitter.emit(CONNECTION_CONNECTED)
      }
    }, [account, active, closeModal, context, library]);
  
    const [hoveredConnectorButtons, setHoveredConnectorButtons] = React.useState(new Map());
    const updateHoveredConnectorButtons = (k,v) => {
      setHoveredConnectorButtons(new Map(hoveredConnectorButtons.set(k,v)));
    }
  
    // useEffect(() => {
    //   if (storeContext && storeContext.active && !active) {
    //     console.log("we are deactive: "+storeContext.account)
    //     store.setStore({ account: {}, web3context: null })
    //   }
    // }, [active, storeContext]);
  
    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    // const triedEager = useEagerConnect();
  
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    // useInactiveListener(!triedEager || !!activatingConnector);
    const width = window.innerWidth
  
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: (width > 650 ? 'space-between' : 'center'), alignItems: 'center' }}>
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name];
          const activating = currentConnector === activatingConnector;
          const connected = (currentConnector === connector||currentConnector === localConnector);
          const disabled =
             !!activatingConnector || !!error;
  
          var url;
          var display = (hovered && connected) ? 'Disconnect' : name;
          if (name === 'OneWallet') {
            url = HarmonyLogo
          } else if (name === 'MathWallet') {
            url = MathWalletLogo
          }
  
          return (
            // UI to generate list of wallets
          )
        }) }
  
        // UI to disconnect active wallet
        </div>
    )
  }
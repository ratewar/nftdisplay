import React,{ useEffect } from 'react';
import './App.css';

import { useMoralis,useNFTBalances } from "react-moralis";


function App() {

  const { logout,authenticate, isAuthenticated, user,isAuthenticating } = useMoralis();
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
  
  
  const NFTBalances = () => {
    return (
      <div>
        {error && <>{JSON.stringify(error)}</>}
        <button onClick={() => getNFTBalances({ params: { chain: "1443" } })}>Refetch NFTBalances</button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="landing">
        <h1>Display My Page When I Own NFT</h1>
        <button className="btn-hero" onClick={() => {authenticate();
          NFTBalances();
          }}>
          Connect your wallet
        </button>
      </div>
    );
  }

  if(data!==null) {
    if(data.total>0) {
        return(
            <div className="landing">
              <h1>👀  Welcome {user.get("username")}</h1>
              <div>
                {error && <>{JSON.stringify(error)}</>}
                <button onClick={() => getNFTBalances({ params: { chain: "1443" } })}>Refetch NFTBalances</button>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
              <button onClick={() => logout()} disabled={isAuthenticating}>
                Logout
              </button>
            </div>
            );
    }
  }
  
  
  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
          return (
            <div className="landing">
              <h1>👀  Welcome {user.get("username")} You Don't Have NFT</h1>
              <button onClick={() => logout()} disabled={isAuthenticating}>
              Logout
            </button>
            </div>);
  
}

export default App;
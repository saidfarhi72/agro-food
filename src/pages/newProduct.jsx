import React from 'react'
import Layouts from '../components/Layouts'
import CreationPage from '../components/CreationPage'
import useSigner from '../state/ConnectSate';
import EmptyState from '../components/EmptyState';

function newProduct() {
  const { signer, loading, connectWallet } = useSigner();

  if (!signer){
    return (
      <Layouts>
      <EmptyState><a className="btn" 
            onClick={connectWallet}
            disabled={loading}>
      {loading ? "busy..." : "Connect wallet"}
      </a></EmptyState>
      </Layouts>
        );
  };
  return (
    <Layouts>

    <div><CreationPage/></div>
</Layouts>  )
}

export default newProduct
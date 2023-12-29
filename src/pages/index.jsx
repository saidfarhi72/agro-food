
import EmptyState from "../components/EmptyState";
import Layouts from "../components/Layouts"
import useSigner from "../state/ConnectSate";


export default function Home() {
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
    <div data-theme={"light"} className=" h-[100vh] w-full">
      <Layouts>
        <div>
          
          Home
        </div>
      </Layouts>

 
    </div>
  )
}
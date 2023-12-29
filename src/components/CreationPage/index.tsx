import classNames from "classnames";
import EmptyState from "../EmptyState";
import { toast } from "react-toastify";
import useSigner from "../../state/ConnectSate";
import CreationForm from "./CreationForm";

const CreationPage = () => {
  const { signer } = useSigner();

  const onSubmit = async (values) => {
    try {
      toast.success("You'll see your new NFT here shortly. Refresh the page.");
      console.log(values)
    } catch (e) {
      toast.warn("Something wrong!");
      console.log(e);
    }
  };

  return (
    <div className={classNames("flex h-full w-full flex-col")}>
      {!signer && <EmptyState>Connect your wallet</EmptyState>}
      {signer && <CreationForm onSubmit={onSubmit} />}
    </div>
  );
};

export default CreationPage;

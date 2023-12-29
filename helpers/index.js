export const ipfsToHTTPS = (url) => {
    if (!url.startsWith("ipfs://")) throw new Error("Not an IPFS url");
    const cid = url.substring(7);
    return `https://ipfs.io/ipfs/${cid}`;
  };
  
  export const minifyAddress = (address) => {
    const start = address.substring(0, 5);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  }
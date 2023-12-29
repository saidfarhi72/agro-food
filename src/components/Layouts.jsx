import Link from 'next/link'
import React from 'react'
import useSigner from '../state/ConnectSate';
import AddressAvatar from './AddressAvatar';

function Layouts(  {children}  ) {
  const { signer, address, loading, connectWallet } = useSigner();
  return (
    <div data-theme={"light"} className='flex  flex-col h-full'>
      
      <div className={`navbar  ${!signer ? " hidden": " z-40"}  bg-base-100`}>
        <div></div>
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><Link href={"product"}>Product</Link></li>
      
      <li><Link href={"profile"}>Profile</Link></li>
      <li><Link href={'newProduct'}>New</Link></li>
        </ul>
      </div>
      <Link href={""} className="btn btn-ghost normal-case text-xl">AgroFood</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><Link href={"/product"}>Product</Link></li>
      
        <li><Link href={"/profile"}>Profile</Link></li>
        <li><Link href={'/newProduct'}>New</Link></li>

      </ul>
    </div>
    <div className="navbar-end">
      {
        address? 
        <AddressAvatar address={address} />
      :
      <a className="btn" 
            onClick={connectWallet}
            disabled={loading}>
      {loading ? "busy..." : "Connect wallet"}
      </a>
      }

    </div>
  </div>

  <div className='flex-grow min-h-[80vh]  overflow-y-scroll space-y-10'>
  {children}
  <div>

  <footer className={`footer ${!signer ? " hidden": " z-40"} footer-center p-4 bg-base-100 text-base-content`}>
  <aside>
    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
  </aside>
</footer>
  </div>

  </div>

  </div>
  )
}

export default Layouts
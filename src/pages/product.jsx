import React, { useState,useEffect } from 'react';
import Layouts from '../components/Layouts';
import Image from 'next/image';
import products from '../../product.json';
import Link from 'next/link';
import EmptyState from '../components/EmptyState';
import useSigner from '../state/ConnectSate';



function Product() {
    const MAX_LENGTH = 100;
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;
  
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    var currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
    const totalPages = Math.ceil(products.length / productsPerPage);
  
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
      console.log(currentPage,indexOfFirstProduct,indexOfLastProduct)
    };
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
    }
  return (
    <Layouts>
      <div className='flex  justify-center  items-center '>
        <div  className='flex flex-wrap justify-center m-auto items-center '>

        { currentProducts.map((product, index) => ( 
          <div key={product.id} className="card w-96 p-4 bg-base-100 shadow-xl">
            <div style={{ position: 'relative', width: '100%', height: '0', paddingTop: '75%' }}>
              <Image
                src={product.imageUrl} // Use product data from the JSON file
                alt={product.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title">
                {product.name} 
              </h2>
              <p>{product.description.length > MAX_LENGTH ? product.description.slice(0, MAX_LENGTH) + '...' : product.description} </p>
                  <div className="card-actions justify-end">
                  <Link href={`/product/${product.id}`}><button className="btn btn-primary">Details</button></Link>
              </div>
            </div>
          </div>
        ))
        }
        </div>
      </div>
        <ul className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index}>
            <button
              className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </Layouts>
  );
}

export default Product;

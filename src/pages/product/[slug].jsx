import React from 'react'
import { useRouter } from 'next/router';
import Layouts from '../../components/Layouts';
import products from '../../../product.json';
import Image from 'next/image';
import useSigner from '../../state/ConnectSate';
import EmptyState from '../../components/EmptyState';

function ProductScreen() {
    const router = useRouter();
    const { slug } = router.query;
    const { signer,connectContract ,getProductCount} = useSigner();
    const handlClick = async () => {
      connectContract()
      getProductCount()

    }

 
    console.log(slug);
    const productId = parseInt(slug, 10);
    const product = products.find((item) => item.id === productId);
    
    if (!product) {
      return <div>Product not found</div>; // Render a message or component for "Product not found"
    }
    else if (!signer){
      return (
        <Layouts>
        <EmptyState>Connect your wallet</EmptyState>
        </Layouts>
          );
    };
    
    return (
        <Layouts>


      <div>
        <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          <div className="w-1/2">
            <Image
                src={product.imageUrl} // Use product data from the JSON file
                alt={product.name}
                width={500}
                height={500}
              className="w-full h-auto"
              />
           
          </div>
          <div className="w-1/2 p-6">
            <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-gray-800 text-lg font-semibold mb-4">
              Price: ${product.name}
            </p>
            {/* Add other product details here */}
            <button onClick={handlClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
      </div>
      </Layouts>

    );
  }

export default ProductScreen
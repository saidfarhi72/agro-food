import React from 'react';
import Layouts from '../components/Layouts';
import useSigner from '../state/ConnectSate';
import EmptyState from '../components/EmptyState';

const Profile = () => {
  const { signer, loading, connectWallet } = useSigner();


  // Mock user data (replace this with actual user data)
  const user = {
    name: 'John Doe',
    username: 'johndoe123',
    email: 'john@example.com',
    bio: 'Passionate about decentralized technologies!',
    // Add other user information as needed
  };
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

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    {!signer && <EmptyState><a className="btn" 
            onClick={connectWallet}
            disabled={loading}>
      {loading ? "busy..." : "Connect wallet"}
      </a></EmptyState>}

      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6">Profile</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Name:</label>
            <p>{user.name}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Username:</label>
            <p>{user.username}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Email:</label>
            <p>{user.email}</p>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Bio:</label>
            <p>{user.bio}</p>
          </div>
        </div>
        {/* Add more profile information sections as needed */}
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
    </Layouts>

  );
};

export default Profile;

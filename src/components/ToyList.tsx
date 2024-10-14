import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface Toy {
  id: number;
  name: string;
  owner: string;
  image: string;
  borrower?: string;
  borrowDate?: string;
  returnDate?: string;
}

const ToyList: React.FC = () => {
  const [toys, setToys] = useState<Toy[]>([
    { id: 1, name: 'Teddy Bear', owner: 'Alice', image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Lego Set', owner: 'Bob', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Remote Control Car', owner: 'Charlie', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ]);

  const [borrowerName, setBorrowerName] = useState('');
  const [borrowerPhone, setBorrowerPhone] = useState('');
  const [borrowDuration, setBorrowDuration] = useState('');
  const [selectedToy, setSelectedToy] = useState<Toy | null>(null);

  const handleBorrowRequest = (toy: Toy) => {
    setSelectedToy(toy);
  };

  const handleBorrowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedToy) {
      const borrowDate = new Date();
      const returnDate = new Date(borrowDate);
      returnDate.setDate(returnDate.getDate() + parseInt(borrowDuration));

      const updatedToys = toys.map(toy => 
        toy.id === selectedToy.id 
          ? { 
              ...toy, 
              borrower: borrowerName, 
              borrowDate: borrowDate.toISOString(),
              returnDate: returnDate.toISOString()
            } 
          : toy
      );
      setToys(updatedToys);
      setBorrowerName('');
      setBorrowerPhone('');
      setBorrowDuration('');
      setSelectedToy(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Available Toys</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toys.map((toy) => (
          <div key={toy.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={toy.image} alt={toy.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{toy.name}</h3>
              <p className="text-gray-600">Shared by: {toy.owner}</p>
              {toy.borrower ? (
                <p className="text-green-600 mt-2">Borrowed by: {toy.borrower}</p>
              ) : (
                <button 
                  onClick={() => handleBorrowRequest(toy)}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center"
                >
                  <Gift className="mr-2" size={18} /> Request to Borrow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedToy && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">Borrow {selectedToy.name}</h3>
            <form onSubmit={handleBorrowSubmit}>
              <div className="mb-4">
                <label htmlFor="borrowerName" className="block text-gray-700 font-bold mb-2">Your Name</label>
                <input
                  type="text"
                  id="borrowerName"
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="borrowerPhone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="borrowerPhone"
                  value={borrowerPhone}
                  onChange={(e) => setBorrowerPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="borrowDuration" className="block text-gray-700 font-bold mb-2">Borrow Duration (days)</label>
                <input
                  type="number"
                  id="borrowDuration"
                  value={borrowDuration}
                  onChange={(e) => setBorrowDuration(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                  max="30"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedToy(null)}
                  className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Confirm Borrow
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToyList;
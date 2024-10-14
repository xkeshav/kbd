import React, { useState, useEffect } from 'react';
import { Table, ClipboardList } from 'lucide-react';

interface Toy {
  id: number;
  name: string;
  owner: string;
  image: string;
  borrower?: string;
  borrowDate?: string;
  returnDate?: string;
}

const AdminPage: React.FC = () => {
  const [toys, setToys] = useState<Toy[]>([]);

  useEffect(() => {
    // TODO: Fetch toys from an API or database
    const fetchedToys: Toy[] = [
      { id: 1, name: 'Teddy Bear', owner: 'Alice', image: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', borrower: 'David', borrowDate: '2023-03-15T10:30:00Z', returnDate: '2023-03-22T10:30:00Z' },
      { id: 2, name: 'Lego Set', owner: 'Bob', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
      { id: 3, name: 'Remote Control Car', owner: 'Charlie', image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', borrower: 'Eve', borrowDate: '2023-03-18T14:45:00Z', returnDate: '2023-03-25T14:45:00Z' },
    ];
    setToys(fetchedToys);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <ClipboardList className="mr-2" /> Admin Dashboard
      </h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toy</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrower</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrow Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {toys.map((toy) => (
              <tr key={toy.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={toy.image} alt={toy.name} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{toy.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{toy.owner}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${toy.borrower ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {toy.borrower ? 'Borrowed' : 'Available'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {toy.borrower || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {toy.borrowDate ? new Date(toy.borrowDate).toLocaleDateString() : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {toy.returnDate ? new Date(toy.returnDate).toLocaleDateString() : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
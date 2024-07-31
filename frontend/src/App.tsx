import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [filter, setFilter] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendUrl}/login`, { username, password });
      if (response.status === 200) {
        toast.success('Login successful');
        setIsLoggedIn(true);
        setLoggedInUser(username);
        fetchItems();
      }
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedInUser(null);
    setItems([]);
    setFilter(''); // Clear the filter value on logout
    toast.info('Logged out successfully');
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/items`);
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container">
      <ToastContainer />
      {!isLoggedIn ? (
        <div>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Please enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Please enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h1>Displaying the Items</h1>
          <div className="header">
            <p>Logged in as: {loggedInUser}</p>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
          <h2>Filter Items by Name</h2>
          <input
            type="text"
            placeholder="Filter by name"
            value={filter}
            onChange={handleFilterChange}
          />

          <div className="table-container">
            <table className="items-table">
              <thead className="table-head">
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <tr key={item.link}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                          {item.link}
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className='noitem-found'>No items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

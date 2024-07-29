import React, { useState } from 'react';
import Profile from './components/Profile';
import Posts from './components/Posts';
import Albums from './components/Albums';
import Todos from './components/Todos';

const App: React.FC = () => {
  const [userId] = useState('1'); 
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <h1>User Dashboard</h1>

      <section>
        <h2>Profile</h2>
        <Profile userId={userId} />
      </section>

    
      <section>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </section>

     
      <section>
        <h2>Posts</h2>
        <Posts userId={userId} searchQuery={searchQuery} />
      </section>

      <section>
        <h2>Albums</h2>
        <Albums userId={userId} />
      </section>

      <section>
        <h2>Todos</h2>
        <Todos userId={userId} />
      </section>
    </div>
  );
};

export default App;

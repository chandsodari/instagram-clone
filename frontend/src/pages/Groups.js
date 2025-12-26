import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const fetch = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/groups');
      setGroups(res.data);
    } catch (err) {
      console.error('Error fetching groups', err);
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/groups', { name, description: desc });
      setName(''); setDesc('');
      fetch();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error creating group');
    }
  };

  const handleJoin = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/groups/${id}/join`);
      fetch();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error joining group');
    }
  };

  return (
    <div className="container">
      <h2>Groups</h2>
      <form onSubmit={handleCreate} style={{marginBottom:20}}>
        <input placeholder="Group name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
        <button type="submit">Create Group</button>
      </form>

      <div>
        {groups.map(g => (
          <div key={g._id} style={{border:'1px solid #ddd',padding:12,marginBottom:8}}>
            <h4>{g.name}</h4>
            <p>{g.description}</p>
            <div>Members: {g.members?.length || 0}</div>
            <button onClick={() => handleJoin(g._id)}>Join</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Groups;

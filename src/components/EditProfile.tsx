import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserProfile, saveUserProfile } from '@/lib/store';

const EditProfile = () => {
  const navigate = useNavigate();
  const profile = getUserProfile();
  const [name, setName] = useState(profile.name || '');
  const [age, setAge] = useState(profile.age ? String(profile.age) : '');
  const [gender, setGender] = useState(profile.gender || '');
  const [primaryGoal, setPrimaryGoal] = useState(profile.primaryGoal || '');
  const [diet, setDiet] = useState(profile.diet || '');

  const handleSave = () => {
    saveUserProfile({
      name: name.trim(),
      age: parseInt(age) || 0,
      gender,
      primaryGoal,
      diet,
    });
    navigate('/home');
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input className="input" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Age</label>
          <input className="input" type="number" value={age} onChange={e => setAge(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Gender</label>
          <input className="input" value={gender} onChange={e => setGender(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Primary Goal</label>
          <input className="input" value={primaryGoal} onChange={e => setPrimaryGoal(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">Diet</label>
          <input className="input" value={diet} onChange={e => setDiet(e.target.value)} />
        </div>
        <Button onClick={handleSave} className="w-full">Save</Button>
      </CardContent>
    </Card>
  );
};

export default EditProfile;

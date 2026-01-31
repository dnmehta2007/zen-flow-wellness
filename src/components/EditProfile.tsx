import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUserProfile, saveUserProfile } from '@/lib/store';

const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

const dietOptions = [
  'Omnivore',
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Gluten-free',
  'Keto',
  'Paleo',
];

const goals = [
  'Overall Fitness',
  'Flexibility',
  'Weight Loss',
  'Stress Relief',
  'Energy Boost',
  'Sleep / Wind-down',
];

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
          <Label htmlFor="name" className="block mb-1">Name</Label>
          <Input 
            id="name"
            placeholder="Enter your name"
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
        </div>
        <div>
          <Label htmlFor="age" className="block mb-1">Age</Label>
          <Input 
            id="age"
            type="number" 
            placeholder="Enter your age"
            value={age} 
            onChange={e => setAge(e.target.value)} 
            min={1}
            max={120}
          />
        </div>
        <div>
          <Label htmlFor="gender" className="block mb-1">Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="goal" className="block mb-1">Primary Goal</Label>
          <Select value={primaryGoal} onValueChange={setPrimaryGoal}>
            <SelectTrigger id="goal">
              <SelectValue placeholder="Select primary goal" />
            </SelectTrigger>
            <SelectContent>
              {goals.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="diet" className="block mb-1">Diet</Label>
          <Select value={diet} onValueChange={setDiet}>
            <SelectTrigger id="diet">
              <SelectValue placeholder="Select diet preference" />
            </SelectTrigger>
            <SelectContent>
              {dietOptions.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSave} className="w-full">Save</Button>
      </CardContent>
    </Card>
  );
};

export default EditProfile;

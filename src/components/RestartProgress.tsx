import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserProfile, saveUserProfile, getProgress, saveProgress, defaultUserProfile, defaultProgressData } from '@/lib/store';

const RestartProgress = () => {
  const navigate = useNavigate();

  const handleRestart = () => {
    if (window.confirm('Are you sure you want to restart? This will delete all your progress and profile data.')) {
      saveUserProfile(defaultUserProfile);
      saveProgress(defaultProgressData);
      localStorage.removeItem('zenflow_custom_routines');
      navigate('/setup/basics');
    }
  };

  return (
    <Button onClick={handleRestart} variant="destructive" className="w-full mt-2">Restart Progress</Button>
  );
};

export default RestartProgress;

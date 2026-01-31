import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import EditProfile from '@/components/EditProfile';
import ExportData from '@/components/ExportData';
import RestartProgress from '@/components/RestartProgress';

const Account = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
      <Card className="w-full max-w-lg glass-card animate-slide-up">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <EditProfile />
          <ExportData />
          <RestartProgress />
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;

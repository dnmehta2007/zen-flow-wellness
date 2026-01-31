import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserProfile, saveUserProfile, getProgress, saveProgress, getCustomRoutines, saveCustomRoutine, deleteCustomRoutine } from '@/lib/store';

const ExportData = () => {
  const profile = getUserProfile();
  const progress = getProgress();
  const customRoutines = getCustomRoutines();

  const handleExport = () => {
    const data = {
      profile,
      progress,
      customRoutines,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zenflow_data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={handleExport} variant="outline" className="w-full">Export Data (JSON)</Button>
  );
};

export default ExportData;

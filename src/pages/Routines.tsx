import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Play, Clock, Target, ChevronRight, Bookmark
} from 'lucide-react';
import { predefinedRoutines, getRoutinePoses, Routine } from '@/lib/routines';
import { getCustomRoutines, CustomRoutine } from '@/lib/store';
import { poses } from '@/lib/poses';
import { cn } from '@/lib/utils';

const Routines = () => {
  const navigate = useNavigate();
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const customRoutines = getCustomRoutines();

  const handleStartRoutine = (routine: Routine) => {
    const routinePoses = getRoutinePoses(routine);
    sessionStorage.setItem('currentSession', JSON.stringify({
      poses: routinePoses.map(p => p.id),
      goal: routine.goal,
      duration: routine.duration,
      difficulty: routine.difficulty,
    }));
    navigate('/session');
  };

  const handleStartCustomRoutine = (routine: CustomRoutine) => {
    sessionStorage.setItem('currentSession', JSON.stringify({
      poses: routine.poseIds,
      goal: routine.goal,
      duration: routine.duration,
      difficulty: 'beginner',
    }));
    navigate('/session');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-zen-sage-light text-secondary-foreground';
      case 'intermediate': return 'bg-zen-peach/30 text-accent-foreground';
      case 'advanced': return 'bg-primary/20 text-primary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-display font-bold">Routines</h1>
      </div>

      <Tabs defaultValue="predefined" className="px-4">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="predefined">Curated</TabsTrigger>
          <TabsTrigger value="custom">My Routines</TabsTrigger>
          <TabsTrigger value="poses">All Poses</TabsTrigger>
        </TabsList>
        {/* All Poses Tab */}
        <TabsContent value="poses" className="space-y-4 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {poses.map((pose) => (
              <Card key={pose.id} className="glass-card h-full flex flex-col">
                <CardContent className="p-4 flex flex-col flex-1">
                  <img src={pose.image} alt={pose.name} className="w-full h-40 object-cover rounded mb-3" />
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg mb-1">{pose.name}</h3>
                    <p className="text-xs italic text-muted-foreground mb-2">{pose.sanskritName}</p>
                    <p className="text-sm mb-2 line-clamp-3">{pose.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className={cn('px-2 py-0.5 rounded-full text-xs', getDifficultyColor(pose.difficulty))}>
                      {pose.difficulty}
                    </span>
                    {pose.goals.map((goal) => (
                      <span key={goal} className="px-2 py-0.5 rounded-full text-xs bg-muted text-muted-foreground border border-border">
                        {goal}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predefined" className="space-y-4 pb-8">
          {predefinedRoutines.map((routine) => (
            <Card 
              key={routine.id}
              className="glass-card cursor-pointer hover:shadow-zen-lg transition-all duration-200"
              onClick={() => setSelectedRoutine(selectedRoutine?.id === routine.id ? null : routine)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-lg">{routine.name}</h3>
                    <p className="text-sm text-muted-foreground">{routine.description}</p>
                  </div>
                  <ChevronRight className={cn(
                    'w-5 h-5 text-muted-foreground transition-transform',
                    selectedRoutine?.id === routine.id && 'rotate-90'
                  )} />
                </div>
                
                <div className="flex items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {routine.duration} min
                  </span>
                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    {routine.goal}
                  </span>
                  <span className={cn('px-2 py-0.5 rounded-full text-xs', getDifficultyColor(routine.difficulty))}>
                    {routine.difficulty}
                  </span>
                </div>

                {selectedRoutine?.id === routine.id && (
                  <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                    <p className="text-sm font-medium mb-2">Poses ({routine.poseIds.length})</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {getRoutinePoses(routine).map((pose) => (
                        <span 
                          key={pose.id}
                          className="px-2 py-1 bg-muted rounded-full text-xs"
                        >
                          {pose.name}
                        </span>
                      ))}
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartRoutine(routine);
                      }}
                      className="w-full bg-gradient-zen text-primary-foreground"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Routine
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="custom" className="space-y-4 pb-8">
          {customRoutines.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="p-8 text-center">
                <Bookmark className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display font-bold mb-2">No Custom Routines Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Save your favorite sequences from sessions to access them here.
                </p>
              </CardContent>
            </Card>
          ) : (
            customRoutines.map((routine) => (
              <Card 
                key={routine.id}
                className="glass-card"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display font-bold">{routine.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {routine.duration} min
                        </span>
                        <span className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Target className="w-4 h-4" />
                          {routine.goal}
                        </span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleStartCustomRoutine(routine)}
                      className="bg-gradient-zen text-primary-foreground"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Routines;

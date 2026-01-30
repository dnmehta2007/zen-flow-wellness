import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Utensils, Lightbulb, ChevronRight
} from 'lucide-react';
import { getUserProfile } from '@/lib/store';
import { getDietPlan, nutritionTips, DayPlan } from '@/lib/diet';
import { cn } from '@/lib/utils';

const Diet = () => {
  const navigate = useNavigate();
  const profile = getUserProfile();
  const [selectedDay, setSelectedDay] = useState(0);
  
  const dietPlan = getDietPlan(profile.diet);
  const dayLabels = ['Day 1', 'Day 2', 'Day 3'];

  const renderMeal = (meal: { name: string; description: string; calories: number }, type: string) => (
    <div className="p-4 rounded-xl bg-muted/50 mb-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <span className="text-xs font-medium text-muted-foreground uppercase">{type}</span>
          <h4 className="font-medium">{meal.name}</h4>
        </div>
        <span className="text-sm text-muted-foreground">{meal.calories} cal</span>
      </div>
      <p className="text-sm text-muted-foreground">{meal.description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/home')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-xl font-display font-bold">Diet Plan</h1>
          <p className="text-sm text-muted-foreground capitalize">{profile.diet}</p>
        </div>
      </div>

      <Tabs defaultValue="meals" className="px-4">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="meals">Meal Plan</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="pb-8">
          {/* Day selector */}
          <div className="flex gap-2 mb-4">
            {dayLabels.map((label, i) => (
              <Button
                key={i}
                variant={selectedDay === i ? "default" : "outline"}
                onClick={() => setSelectedDay(i)}
                className={cn(
                  'flex-1',
                  selectedDay === i && 'bg-gradient-zen text-primary-foreground'
                )}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Meals */}
          <Card className="glass-card">
            <CardContent className="p-4">
              {renderMeal(dietPlan[selectedDay].breakfast, 'Breakfast')}
              {renderMeal(dietPlan[selectedDay].lunch, 'Lunch')}
              {renderMeal(dietPlan[selectedDay].dinner, 'Dinner')}
              
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase">Snacks</span>
                <div className="mt-2 space-y-2">
                  {dietPlan[selectedDay].snacks.map((snack, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-zen-sage-light/50">
                      <div>
                        <p className="font-medium text-sm">{snack.name}</p>
                        <p className="text-xs text-muted-foreground">{snack.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{snack.calories} cal</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily total */}
          <Card className="glass-card mt-4">
            <CardContent className="p-4 flex items-center justify-between">
              <span className="font-medium">Daily Total</span>
              <span className="text-lg font-bold text-primary">
                {dietPlan[selectedDay].breakfast.calories + 
                 dietPlan[selectedDay].lunch.calories + 
                 dietPlan[selectedDay].dinner.calories +
                 dietPlan[selectedDay].snacks.reduce((acc, s) => acc + s.calories, 0)} cal
              </span>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="pb-8 space-y-4">
          {nutritionTips.map((tip, i) => (
            <Card key={i} className="glass-card">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-zen-peach/30 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-accent-foreground" />
                </div>
                <p className="text-sm text-foreground/80">{tip}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Diet;

// Simple diet plan content for Zen Flow

export interface Meal {
  name: string;
  description: string;
  calories: number;
}

export interface DayPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  snacks: Meal[];
}

export interface DietPlan {
  type: 'vegetarian' | 'non-vegetarian';
  goal: string;
  days: DayPlan[];
}

export const vegetarianPlan: DayPlan[] = [
  {
    breakfast: { name: 'Overnight Oats', description: 'Rolled oats with almond milk, chia seeds, banana, and honey', calories: 350 },
    lunch: { name: 'Buddha Bowl', description: 'Quinoa, roasted chickpeas, avocado, spinach, tahini dressing', calories: 450 },
    dinner: { name: 'Vegetable Stir Fry', description: 'Tofu with mixed vegetables, brown rice', calories: 400 },
    snacks: [
      { name: 'Greek Yogurt', description: 'With mixed berries', calories: 150 },
      { name: 'Almonds', description: 'Handful of raw almonds', calories: 100 },
    ],
  },
  {
    breakfast: { name: 'Smoothie Bowl', description: 'Blended berries, banana, spinach, granola topping', calories: 320 },
    lunch: { name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, basil, olive oil', calories: 380 },
    dinner: { name: 'Lentil Curry', description: 'Red lentils in coconut curry with naan bread', calories: 480 },
    snacks: [
      { name: 'Apple Slices', description: 'With peanut butter', calories: 180 },
      { name: 'Hummus', description: 'With carrot sticks', calories: 120 },
    ],
  },
  {
    breakfast: { name: 'Avocado Toast', description: 'Whole grain toast, smashed avocado, poached egg', calories: 380 },
    lunch: { name: 'Mediterranean Wrap', description: 'Falafel, hummus, cucumber, tomato in pita', calories: 420 },
    dinner: { name: 'Pasta Primavera', description: 'Whole wheat pasta with seasonal vegetables', calories: 440 },
    snacks: [
      { name: 'Trail Mix', description: 'Nuts, seeds, dried fruit', calories: 160 },
      { name: 'Cottage Cheese', description: 'With pineapple', calories: 140 },
    ],
  },
];

export const nonVegetarianPlan: DayPlan[] = [
  {
    breakfast: { name: 'Eggs Benedict', description: 'Poached eggs, turkey bacon, whole wheat English muffin', calories: 420 },
    lunch: { name: 'Grilled Chicken Salad', description: 'Mixed greens, grilled chicken, vinaigrette', calories: 380 },
    dinner: { name: 'Baked Salmon', description: 'With roasted vegetables and quinoa', calories: 520 },
    snacks: [
      { name: 'Greek Yogurt', description: 'With honey and walnuts', calories: 180 },
      { name: 'Turkey Jerky', description: 'Lean protein snack', calories: 100 },
    ],
  },
  {
    breakfast: { name: 'Protein Pancakes', description: 'Oat pancakes with Greek yogurt and berries', calories: 380 },
    lunch: { name: 'Tuna Wrap', description: 'Whole grain wrap, tuna, avocado, lettuce', calories: 400 },
    dinner: { name: 'Chicken Stir Fry', description: 'Lean chicken with vegetables, brown rice', calories: 480 },
    snacks: [
      { name: 'Boiled Eggs', description: 'Two hard-boiled eggs', calories: 140 },
      { name: 'Mixed Nuts', description: 'Unsalted variety', calories: 160 },
    ],
  },
  {
    breakfast: { name: 'Veggie Omelette', description: 'Three-egg omelette with spinach, tomatoes, feta', calories: 360 },
    lunch: { name: 'Turkey Sandwich', description: 'Whole grain bread, turkey, avocado, sprouts', calories: 420 },
    dinner: { name: 'Lean Beef Bowl', description: 'Grass-fed beef, sweet potato, broccoli', calories: 540 },
    snacks: [
      { name: 'Cheese Sticks', description: 'String cheese', calories: 80 },
      { name: 'Apple', description: 'With almond butter', calories: 200 },
    ],
  },
];

export function getDietPlan(diet: string): DayPlan[] {
  return diet === 'vegetarian' ? vegetarianPlan : nonVegetarianPlan;
}

export const nutritionTips = [
  'Stay hydrated - drink at least 8 glasses of water daily',
  'Eat slowly and mindfully to improve digestion',
  'Include protein in every meal for sustained energy',
  'Choose whole grains over refined carbohydrates',
  'Add colorful vegetables to every meal',
  'Limit processed foods and added sugars',
  'Plan your meals ahead to avoid unhealthy choices',
  'Listen to your body\'s hunger and fullness cues',
];

export const motivationalQuotes = [
  { quote: "The body achieves what the mind believes.", author: "Napoleon Hill" },
  { quote: "Yoga is not about touching your toes, it's about what you learn on the way down.", author: "Jigar Gor" },
  { quote: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { quote: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thich Nhat Hanh" },
  { quote: "Breathe in deeply to bring your mind home to your body.", author: "Thich Nhat Hanh" },
  { quote: "Calm mind brings inner strength and self-confidence.", author: "Dalai Lama" },
  { quote: "The greatest wealth is health.", author: "Virgil" },
  { quote: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
];

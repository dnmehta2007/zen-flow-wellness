// Yoga poses data based on 31 Yoga Poses for Beginners (Verywell Fit)

import childPose from '@/assets/poses/child-pose.jpg';
import bridgePose from '@/assets/poses/bridge-pose.jpg';
import treePose from '@/assets/poses/tree-pose.jpg';
import cobraPose from '@/assets/poses/cobra-pose.jpg';

export interface Pose {
  id: string;
  name: string;
  sanskritName: string;
  image: string;
  duration: number; // seconds
  description: string;
  stretches: string[];
  benefits: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  poseType: 'standing' | 'balancing' | 'backbend' | 'seated' | 'supine' | 'resting';
  instructions?: string[];
}

export const poses: Pose[] = [
  // STANDING POSES
  {
    id: 'downward-dog',
    name: 'Downward Facing Dog',
    sanskritName: 'Adho Mukha Svanasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A foundational pose that stretches the entire back body and builds strength. Keep weight mostly in your legs and reach your hips high with heels stretching toward the floor.',
    stretches: ['Hamstrings', 'Calves', 'Shoulders', 'Spine'],
    benefits: ['Energizes body', 'Calms brain', 'Relieves stress', 'Strengthens arms and legs'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Energy Boost', 'Flexibility'],
    poseType: 'standing',
    instructions: [
      'Start on hands and knees',
      'Lift hips up and back',
      'Keep weight in legs, heels reaching toward floor',
      'Soften knees if hamstrings are tight'
    ]
  },
  {
    id: 'mountain-pose',
    name: 'Mountain Pose',
    sanskritName: 'Tadasana',
    image: '/placeholder.svg',
    duration: 30,
    description: 'The foundation for all standing poses. Stand with feet together, weight evenly distributed, lengthening through the spine.',
    stretches: ['Spine'],
    benefits: ['Improves posture', 'Increases awareness', 'Builds confidence', 'Grounds and centers'],
    difficulty: 'beginner',
    goals: ['Stress Relief', 'Overall Fitness'],
    poseType: 'standing',
    instructions: [
      'Stand with big toes touching, heels slightly apart',
      'Press into all four corners of feet',
      'Roll shoulders up, back, and down',
      'Lengthen through crown of head'
    ]
  },
  {
    id: 'warrior-1',
    name: 'Warrior I',
    sanskritName: 'Virabhadrasana I',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A powerful standing pose that builds strength and stamina. Hips face forward like headlights pointing toward front of mat.',
    stretches: ['Chest', 'Lungs', 'Shoulders', 'Neck', 'Belly', 'Groin'],
    benefits: ['Strengthens legs', 'Opens hips', 'Improves focus', 'Builds stamina'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Weight Loss', 'Energy Boost'],
    poseType: 'standing',
    instructions: [
      'Step one foot forward into lunge',
      'Keep hips facing forward',
      'Raise arms overhead',
      'Front knee stacked over ankle'
    ]
  },
  {
    id: 'warrior-2',
    name: 'Warrior II',
    sanskritName: 'Virabhadrasana II',
    image: '/placeholder.svg',
    duration: 45,
    description: 'Opens the hips and chest while building leg strength and endurance. Unlike Warrior I, hips face the side of the mat.',
    stretches: ['Groin', 'Legs', 'Chest', 'Shoulders'],
    benefits: ['Increases stamina', 'Relieves backaches', 'Therapeutic for flat feet', 'Strengthens legs'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Weight Loss', 'Energy Boost'],
    poseType: 'standing',
    instructions: [
      'Open hips and shoulders to side',
      'Rotate back foot to 90 degrees',
      'Front knee over ankle, toes forward',
      'Arms extended parallel to floor'
    ]
  },
  {
    id: 'extended-side-angle',
    name: 'Extended Side Angle',
    sanskritName: 'Utthita Parsvakonasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A deep side stretch that strengthens the legs while opening the chest and shoulders.',
    stretches: ['Groin', 'Spine', 'Waist', 'Chest', 'Shoulders'],
    benefits: ['Strengthens legs', 'Stretches spine', 'Opens chest', 'Improves stamina'],
    difficulty: 'intermediate',
    goals: ['Flexibility', 'Overall Fitness'],
    poseType: 'standing',
    instructions: [
      'From Warrior II, bring forearm to thigh or hand to floor',
      'Extend top arm overhead',
      'Keep chest open toward ceiling',
      'Use a block if needed'
    ]
  },
  {
    id: 'triangle-pose',
    name: 'Triangle Pose',
    sanskritName: 'Utthita Trikonasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A standing pose that stretches and strengthens the entire body while improving balance.',
    stretches: ['Hips', 'Groin', 'Hamstrings', 'Calves', 'Shoulders', 'Chest', 'Spine'],
    benefits: ['Stimulates organs', 'Reduces stress', 'Improves digestion', 'Builds strength'],
    difficulty: 'intermediate',
    goals: ['Flexibility', 'Overall Fitness'],
    poseType: 'standing',
    instructions: [
      'Stand with feet wide apart',
      'Turn one foot out, extend arms',
      'Reach toward front foot, lower hand to shin or block',
      'Keep micro-bend in knees if needed'
    ]
  },
  {
    id: 'standing-forward-bend',
    name: 'Standing Forward Bend',
    sanskritName: 'Uttanasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A calming forward fold that stretches hamstrings and releases tension in the spine. Let gravity do the work.',
    stretches: ['Hamstrings', 'Calves', 'Spine'],
    benefits: ['Calms the brain', 'Relieves stress', 'Stretches hamstrings', 'Reduces fatigue'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Stress Relief', 'Sleep / Wind-down'],
    poseType: 'standing',
    instructions: [
      'Exhale and fold over legs',
      'Soften knees if hamstrings are tight',
      'Let head hang heavy',
      'Hands on shins, feet, or floor'
    ]
  },
  {
    id: 'reverse-warrior',
    name: 'Reverse Warrior',
    sanskritName: 'Viparita Virabhadrasana',
    image: '/placeholder.svg',
    duration: 40,
    description: 'A heart-opening side bend from Warrior stance that stretches the side body and opens the chest.',
    stretches: ['Side body', 'Groin', 'Hips'],
    benefits: ['Opens chest', 'Strengthens legs', 'Builds stamina', 'Increases flexibility'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Energy Boost'],
    poseType: 'standing',
    instructions: [
      'From Warrior II, flip front palm up',
      'Reach arm overhead and back',
      'Back hand rests on back leg',
      'Gaze up toward palm'
    ]
  },
  {
    id: 'garland-pose',
    name: 'Garland Pose',
    sanskritName: 'Malasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A deep squat that opens the hips and stretches the groin. Excellent for pelvic floor health.',
    stretches: ['Hips', 'Groin', 'Ankles', 'Lower back'],
    benefits: ['Opens hips', 'Strengthens core', 'Improves balance', 'Good for digestion'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Overall Fitness'],
    poseType: 'standing',
    instructions: [
      'Stand with feet wider than hip-width',
      'Squat down, keeping heels on floor',
      'Press elbows against inner knees',
      'Sit on block if challenging'
    ]
  },
  {
    id: 'half-forward-bend',
    name: 'Half Forward Bend',
    sanskritName: 'Ardha Uttanasana',
    image: '/placeholder.svg',
    duration: 20,
    description: 'A flat-back forward bend that lengthens the spine. Often done as part of sun salutations.',
    stretches: ['Hamstrings', 'Spine'],
    benefits: ['Lengthens spine', 'Builds body awareness', 'Strengthens back', 'Prepares for deeper folds'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Overall Fitness'],
    poseType: 'standing',
    instructions: [
      'From forward fold, lift torso halfway',
      'Keep back flat',
      'Hands on shins or fingertips to floor',
      'Look forward, lengthen neck'
    ]
  },
  {
    id: 'pyramid-pose',
    name: 'Pyramid Pose',
    sanskritName: 'Parsvottanasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'An intense stretch for the hamstrings with a forward fold over the front leg.',
    stretches: ['Hamstrings', 'Spine', 'Hips'],
    benefits: ['Deep hamstring stretch', 'Improves balance', 'Calms the brain', 'Stretches spine'],
    difficulty: 'intermediate',
    goals: ['Flexibility'],
    poseType: 'standing',
    instructions: [
      'Step one foot forward, both legs straight',
      'Fold forward over front leg',
      'Use blocks on either side of front foot',
      'Keep hips squared'
    ]
  },
  {
    id: 'raised-hands-pose',
    name: 'Raised Hands Pose',
    sanskritName: 'Urdhva Hastasana',
    image: '/placeholder.svg',
    duration: 20,
    description: 'Built upon Mountain pose, this full-body stretch reaches toward the sky while grounding through the feet.',
    stretches: ['Shoulders', 'Armpits', 'Belly'],
    benefits: ['Full-body stretch', 'Improves posture', 'Creates space in torso', 'Energizes body'],
    difficulty: 'beginner',
    goals: ['Energy Boost', 'Overall Fitness'],
    poseType: 'standing',
    instructions: [
      'Stand in Mountain pose',
      'Inhale, sweep arms overhead',
      'Palms face each other or touch',
      'Keep shoulders relaxed'
    ]
  },
  {
    id: 'low-lunge',
    name: 'Low Lunge',
    sanskritName: 'Anjaneyasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A deep hip opener with the back knee on the ground. Great for stretching hip flexors.',
    stretches: ['Hip flexors', 'Quadriceps', 'Groin'],
    benefits: ['Opens hips', 'Stretches hip flexors', 'Builds leg strength', 'Improves balance'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Overall Fitness'],
    poseType: 'standing',
    instructions: [
      'Step one foot forward into lunge',
      'Lower back knee to floor',
      'Front knee at 90 degrees over ankle',
      'Arms reach overhead or on thigh'
    ]
  },
  // BALANCING POSES
  {
    id: 'tree-pose',
    name: 'Tree Pose',
    sanskritName: 'Vrksasana',
    image: treePose,
    duration: 45,
    description: 'An excellent introduction to balancing postures. Focus your gaze and try different foot positions.',
    stretches: ['Thighs', 'Groin', 'Torso', 'Shoulders'],
    benefits: ['Improves balance', 'Strengthens legs', 'Increases focus', 'Builds confidence'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Stress Relief', 'Energy Boost'],
    poseType: 'balancing',
    instructions: [
      'Stand on one leg',
      'Place other foot on ankle, calf, or above knee (not on knee)',
      'Bring hands to heart or overhead',
      'Focus gaze on fixed point'
    ]
  },
  {
    id: 'downward-dog-split',
    name: 'Downward Facing Dog Split',
    sanskritName: 'Eka Pada Adho Mukha Svanasana',
    image: '/placeholder.svg',
    duration: 30,
    description: 'A one-legged variation of Downward Dog that builds core strength and opens the hip.',
    stretches: ['Hamstrings', 'Hips', 'Shoulders'],
    benefits: ['Builds core strength', 'Opens hips', 'Improves balance', 'Strengthens arms'],
    difficulty: 'intermediate',
    goals: ['Overall Fitness', 'Energy Boost'],
    poseType: 'balancing',
    instructions: [
      'From Downward Dog, lift one leg',
      'Keep hips level initially',
      'Root into both hands equally',
      'Optionally open hip toward ceiling'
    ]
  },
  {
    id: 'plank',
    name: 'Plank Pose',
    sanskritName: 'Phalakasana',
    image: '/placeholder.svg',
    duration: 30,
    description: 'A core-strengthening pose that builds stability and endurance. Essential for many yoga sequences.',
    stretches: ['Spine', 'Shoulders'],
    benefits: ['Strengthens core', 'Builds endurance', 'Improves posture', 'Tones arms and legs'],
    difficulty: 'intermediate',
    goals: ['Overall Fitness', 'Weight Loss', 'Energy Boost'],
    poseType: 'balancing',
    instructions: [
      'Hands under shoulders, body in straight line',
      'Engage core, dont let hips sag or pike',
      'Press firmly through hands',
      'Keep neck neutral'
    ]
  },
  // BACKBENDS
  {
    id: 'cat-cow',
    name: 'Cat-Cow Stretch',
    sanskritName: 'Marjaryasana-Bitilasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A gentle flow between spinal extension and flexion that warms the spine and improves body awareness.',
    stretches: ['Spine', 'Neck', 'Torso', 'Hips'],
    benefits: ['Improves posture', 'Relieves stress', 'Calms mind', 'Creates spinal flexibility'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Stress Relief', 'Sleep / Wind-down'],
    poseType: 'backbend',
    instructions: [
      'Start on hands and knees',
      'Inhale: drop belly, lift head (Cow)',
      'Exhale: round spine, tuck chin (Cat)',
      'Move with breath'
    ]
  },
  {
    id: 'bridge-pose',
    name: 'Bridge Pose',
    sanskritName: 'Setu Bandhasana',
    image: bridgePose,
    duration: 45,
    description: 'A gentle backbend that opens the chest and strengthens the back, glutes, and legs.',
    stretches: ['Chest', 'Neck', 'Spine', 'Hip flexors'],
    benefits: ['Strengthens back', 'Opens chest', 'Calms the brain', 'Reduces anxiety', 'Improves spinal mobility'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Flexibility', 'Energy Boost'],
    poseType: 'backbend',
    instructions: [
      'Lie on back, bend knees, feet hip-width apart',
      'Press into feet, lift hips',
      'Interlace hands under back or keep palms down',
      'Use block under sacrum for supported version'
    ]
  },
  {
    id: 'cobra-pose',
    name: 'Cobra Pose',
    sanskritName: 'Bhujangasana',
    image: cobraPose,
    duration: 30,
    description: 'A gentle backbend that strengthens the spine and opens the heart. Done multiple times in flow classes.',
    stretches: ['Chest', 'Lungs', 'Shoulders', 'Abdomen'],
    benefits: ['Strengthens spine', 'Opens heart', 'Reduces fatigue', 'Soothes sciatica'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Energy Boost', 'Overall Fitness'],
    poseType: 'backbend',
    instructions: [
      'Lie face down, hands under shoulders',
      'Press hips and legs into floor',
      'Inhale, lift chest using back muscles',
      'Keep elbows close to body'
    ]
  },
  {
    id: 'knees-chest-chin',
    name: 'Knees, Chest, and Chin',
    sanskritName: 'Ashtanga Namaskara',
    image: '/placeholder.svg',
    duration: 15,
    description: 'A transitional pose in sun salutations that prepares for Chaturanga. Excellent backbend warmup.',
    stretches: ['Spine', 'Chest'],
    benefits: ['Warms up spine', 'Builds arm strength', 'Prepares for deeper backbends', 'Teaches body awareness'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Flexibility'],
    poseType: 'backbend',
    instructions: [
      'From Plank, lower knees to floor',
      'Keep elbows in, lower chest and chin',
      'Hips stay lifted',
      'Shoulders hover over hands'
    ]
  },
  // SEATED POSES
  {
    id: 'staff-pose',
    name: 'Staff Pose',
    sanskritName: 'Dandasana',
    image: '/placeholder.svg',
    duration: 30,
    description: 'The seated version of Mountain pose. Foundation for all seated yoga poses.',
    stretches: ['Hamstrings', 'Spine'],
    benefits: ['Improves posture', 'Strengthens back', 'Builds awareness', 'Prepares for forward bends'],
    difficulty: 'beginner',
    goals: ['Overall Fitness', 'Flexibility'],
    poseType: 'seated',
    instructions: [
      'Sit with legs extended forward',
      'Flex feet, engage legs',
      'Lift chest, relax shoulders',
      'Sit on blanket if needed'
    ]
  },
  {
    id: 'cobblers-pose',
    name: "Cobbler's Pose",
    sanskritName: 'Baddha Konasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A hip opener that stretches the inner thighs and groin. Let gravity work on the stretch.',
    stretches: ['Inner thighs', 'Groin', 'Hips'],
    benefits: ['Opens hips', 'Stretches groin', 'Stimulates organs', 'Improves circulation'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Stress Relief'],
    poseType: 'seated',
    instructions: [
      'Sit and bring soles of feet together',
      'Let knees fall open',
      'Hold feet or ankles',
      'Use blocks under knees if needed'
    ]
  },
  {
    id: 'easy-pose',
    name: 'Easy Pose',
    sanskritName: 'Sukhasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A comfortable cross-legged seated position. Perfect for meditation and breathing exercises.',
    stretches: ['Hips', 'Knees', 'Ankles'],
    benefits: ['Calms mind', 'Opens hips', 'Strengthens back', 'Promotes groundedness'],
    difficulty: 'beginner',
    goals: ['Stress Relief', 'Sleep / Wind-down'],
    poseType: 'seated',
    instructions: [
      'Sit cross-legged',
      'Stack shoulders over hips',
      'Sit on blanket or block to elevate hips',
      'Rest hands on knees'
    ]
  },
  {
    id: 'half-lord-of-fishes',
    name: 'Half Lord of the Fishes',
    sanskritName: 'Ardha Matsyendrasana',
    image: '/placeholder.svg',
    duration: 45,
    description: 'A seated twist that improves spinal mobility and aids digestion.',
    stretches: ['Spine', 'Hips', 'Shoulders', 'Neck'],
    benefits: ['Improves spinal mobility', 'Aids digestion', 'Relieves tension', 'Energizes spine'],
    difficulty: 'intermediate',
    goals: ['Flexibility', 'Overall Fitness'],
    poseType: 'seated',
    instructions: [
      'Sit with legs extended',
      'Bend one knee, place foot outside other thigh',
      'Twist toward bent knee',
      'Use opposite elbow against knee'
    ]
  },
  {
    id: 'head-to-knee',
    name: 'Head to Knee Pose',
    sanskritName: 'Janu Sirsasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A one-legged seated forward bend. More accessible than stretching both legs at once.',
    stretches: ['Hamstrings', 'Groin', 'Spine'],
    benefits: ['Stretches hamstrings', 'Calms brain', 'Relieves anxiety', 'Improves digestion'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Stress Relief'],
    poseType: 'seated',
    instructions: [
      'Extend one leg, bend other knee to inner thigh',
      'Inhale, lengthen spine',
      'Exhale, fold forward over extended leg',
      'Use strap around foot if needed'
    ]
  },
  {
    id: 'seated-forward-fold',
    name: 'Seated Forward Fold',
    sanskritName: 'Paschimottanasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A calming forward bend that stretches the entire back of the body. Bend from hips, not waist.',
    stretches: ['Spine', 'Shoulders', 'Hamstrings'],
    benefits: ['Calms the brain', 'Relieves stress', 'Stretches spine', 'Improves digestion'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Stress Relief', 'Sleep / Wind-down'],
    poseType: 'seated',
    instructions: [
      'Sit with legs extended',
      'Inhale, lengthen spine',
      'Exhale, hinge at hips to fold forward',
      'Hold shins, feet, or use strap'
    ]
  },
  {
    id: 'seated-wide-angle',
    name: 'Seated Wide Angle Straddle',
    sanskritName: 'Upavistha Konasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A wide-legged seated forward bend that stretches the inner thighs and hamstrings.',
    stretches: ['Inner thighs', 'Hamstrings', 'Spine'],
    benefits: ['Opens hips', 'Stretches hamstrings', 'Calms mind', 'Strengthens spine'],
    difficulty: 'intermediate',
    goals: ['Flexibility'],
    poseType: 'seated',
    instructions: [
      'Sit with legs wide apart',
      'Flex feet, engage legs',
      'Inhale, lengthen spine',
      'Exhale, forward bend to center'
    ]
  },
  // SUPINE POSES
  {
    id: 'happy-baby',
    name: 'Happy Baby',
    sanskritName: 'Ananda Balasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A playful pose that opens the hips and releases the lower back. Find the balance between effort and ease.',
    stretches: ['Inner groin', 'Lower back', 'Spine', 'Hips'],
    benefits: ['Opens hips', 'Releases lower back', 'Calms brain', 'Relieves stress'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Sleep / Wind-down', 'Stress Relief'],
    poseType: 'supine',
    instructions: [
      'Lie on back, bend knees to chest',
      'Hold outer edges of feet',
      'Open knees wider than torso',
      'Keep tailbone on floor'
    ]
  },
  {
    id: 'supine-twist',
    name: 'Supine Spinal Twist',
    sanskritName: 'Supta Matsyendrasana',
    image: '/placeholder.svg',
    duration: 60,
    description: 'A passive twist that releases tension in the spine. Classic way to end a yoga session.',
    stretches: ['Spine', 'Glutes', 'Chest', 'Shoulders'],
    benefits: ['Releases spine', 'Aids digestion', 'Calms nervous system', 'Opens chest'],
    difficulty: 'beginner',
    goals: ['Flexibility', 'Sleep / Wind-down', 'Stress Relief'],
    poseType: 'supine',
    instructions: [
      'Lie on back, hug one knee to chest',
      'Guide knee across body',
      'Extend opposite arm, look away from knee',
      'Keep both shoulders on floor'
    ]
  },
  {
    id: 'legs-up-wall',
    name: 'Legs Up The Wall',
    sanskritName: 'Viparita Karani',
    image: '/placeholder.svg',
    duration: 120,
    description: 'A restorative inversion that relieves tired legs and calms the nervous system.',
    stretches: ['Hamstrings', 'Lower back', 'Neck'],
    benefits: ['Relieves tired legs', 'Calms mind', 'Reduces anxiety', 'Helps sleep'],
    difficulty: 'beginner',
    goals: ['Sleep / Wind-down', 'Stress Relief'],
    poseType: 'supine',
    instructions: [
      'Sit sideways against wall',
      'Swing legs up wall as you lie back',
      'Scoot hips close to wall',
      'Arms rest by sides, palms up'
    ]
  },
  // RESTING POSES
  {
    id: 'child-pose',
    name: "Child's Pose",
    sanskritName: 'Balasana',
    image: childPose,
    duration: 60,
    description: 'A restful pose that gently stretches the hips, thighs, and ankles while calming the mind. Return here whenever you need a break.',
    stretches: ['Lower back', 'Hips', 'Thighs', 'Ankles'],
    benefits: ['Reduces stress', 'Calms the mind', 'Relieves back pain', 'Gentle stretch'],
    difficulty: 'beginner',
    goals: ['Stress Relief', 'Flexibility', 'Sleep / Wind-down'],
    poseType: 'resting',
    instructions: [
      'Kneel on floor, big toes touching',
      'Sit back on heels',
      'Fold forward, arms extended or by sides',
      'Widen knees if more comfortable'
    ]
  },
  {
    id: 'corpse-pose',
    name: 'Corpse Pose',
    sanskritName: 'Savasana',
    image: '/placeholder.svg',
    duration: 120,
    description: 'The ultimate relaxation pose. Brings body to stillness and challenges the mind to maintain calm.',
    stretches: [],
    benefits: ['Deep relaxation', 'Reduces stress', 'Lowers blood pressure', 'Calms mind', 'Integrates practice'],
    difficulty: 'beginner',
    goals: ['Stress Relief', 'Sleep / Wind-down'],
    poseType: 'resting',
    instructions: [
      'Lie flat on back',
      'Legs slightly apart, arms by sides, palms up',
      'Close eyes, relax completely',
      'Breathe naturally'
    ]
  },
];

export const goals = [
  'Overall Fitness',
  'Flexibility',
  'Weight Loss',
  'Stress Relief',
  'Energy Boost',
  'Sleep / Wind-down',
];

export const durations = [5, 10, 30, 60];

export const difficultyLevels = ['beginner', 'intermediate', 'advanced'] as const;

export const poseTypes = ['standing', 'balancing', 'backbend', 'seated', 'supine', 'resting'] as const;

export function getPosesForGoal(goal: string, count: number = 5): Pose[] {
  const matching = poses.filter(pose => pose.goals.includes(goal));
  const shuffled = [...matching].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getPosesByType(type: Pose['poseType']): Pose[] {
  return poses.filter(pose => pose.poseType === type);
}

export function getPosesForDuration(targetMinutes: number, goal: string): Pose[] {
  const targetSeconds = targetMinutes * 60;
  const goalPoses = poses.filter(pose => pose.goals.includes(goal));
  
  const selected: Pose[] = [];
  let totalDuration = 0;
  
  // Shuffle and select poses until we reach target duration
  const shuffled = [...goalPoses].sort(() => Math.random() - 0.5);
  
  for (const pose of shuffled) {
    if (totalDuration + pose.duration <= targetSeconds) {
      selected.push(pose);
      totalDuration += pose.duration;
    }
    if (totalDuration >= targetSeconds * 0.8) break;
  }
  
  // Always include relaxation at the end if we have room
  const corpse = poses.find(p => p.id === 'corpse-pose');
  if (corpse && totalDuration + 60 <= targetSeconds) {
    selected.push({ ...corpse, duration: 60 });
  }
  
  return selected;
}

export function generateSession(duration: number, goal: string, difficulty: string = 'beginner'): Pose[] {
  const filtered = poses.filter(pose => 
    pose.goals.includes(goal) && 
    (difficulty === 'advanced' || 
     (difficulty === 'intermediate' && pose.difficulty !== 'advanced') ||
     pose.difficulty === 'beginner')
  );
  
  return getPosesForDuration(duration, goal);
}

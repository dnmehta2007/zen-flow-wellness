import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flower2, Sparkles } from 'lucide-react';
import background from '@/assets/background.jpg';
import { isSetupComplete } from '@/lib/store';
const Landing = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    if (isSetupComplete()) {
      navigate('/home');
    } else {
      navigate('/setup/basics');
    }
  };
  return <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden" style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/40" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 animate-float opacity-60">
        <Flower2 className="w-12 h-12 text-primary" />
      </div>
      <div className="absolute top-40 right-16 animate-float opacity-40" style={{
      animationDelay: '1s'
    }}>
        <Sparkles className="w-8 h-8 text-zen-peach" />
      </div>
      <div className="absolute bottom-32 left-20 animate-float opacity-50" style={{
      animationDelay: '2s'
    }}>
        <Flower2 className="w-10 h-10 text-zen-sage" />
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-md animate-fade-in">
        {/* Logo area */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-card/80 backdrop-blur-md shadow-zen-lg mb-6 animate-breathe">
            <Flower2 className="w-12 h-12 text-primary" />
          </div>
        </div>
        
        {/* App name */}
        <h1 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gradient-zen">
          Zen Flow
        </h1>
        
        {/* Tagline */}
        <p className="text-lg md:text-xl text-foreground/80 mb-12 font-light">
          this is a demo for our lil app
        </p>
        
        {/* CTA Button */}
        <Button onClick={handleGetStarted} size="lg" className="bg-gradient-zen text-primary-foreground hover:opacity-90 transition-all duration-300 shadow-zen-lg hover:shadow-zen-glow px-10 py-6 text-lg rounded-2xl animate-pulse-glow">
          Get Started
          <Sparkles className="w-5 h-5 ml-2" />
        </Button>
        
        {/* Continue if setup complete */}
        {isSetupComplete() && <p className="mt-4 text-sm text-muted-foreground">Welcome back! A healthy habit awaits.</p>}
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-6 text-center text-sm text-muted-foreground/60">
        <p>Find your peace ✨</p>
      </div>
    </div>;
};
export default Landing;
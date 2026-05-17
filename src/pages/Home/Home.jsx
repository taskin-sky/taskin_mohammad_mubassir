import SEO from '../../components/SEO';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import FeaturedProjects from './sections/FeaturedProjects';
import StatsSection from './sections/StatsSection';
import SkillsPreview from './sections/SkillsPreview';

export default function Home() {
  return (
    <>
      <SEO />
      <div className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <FeaturedProjects />
        <SkillsPreview />
      </div>
    </>
  );
}

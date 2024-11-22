import React, { useState, useRef } from 'react';
import { Search, Building2, Clock, DollarSign, BarChart3, ArrowRight } from 'lucide-react';
import { VideoPlayer } from './components/VideoPlayer';
import { AudioPlayer } from './components/AudioPlayer';
import { SignupForm } from './components/SignupForm';
import { ExpandableSection } from './components/ExpandableSection';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const tryFreeButtonRef = useRef<HTMLButtonElement>(null);

  const handleTryFree = () => {
    setShowForm(true);
    setShowVideo(false);
    setShowAudio(false);
  };

  const handleWatchDemo = () => {
    setShowVideo(true);
    setShowForm(false);
    setShowAudio(false);
  };

  const handleAudioToggle = (isPlaying: boolean) => {
    setShowAudio(isPlaying);
    if (isPlaying) {
      setShowForm(false);
      setShowVideo(false);
    }
  };

  const handleSectionToggle = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleStartFreeTrial = () => {
    tryFreeButtonRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsHighlighted(true);
    setTimeout(() => {
      handleTryFree();
      setTimeout(() => setIsHighlighted(false), 1000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 text-white relative">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold">AgenticReports</span>
          </div>
          <button 
            onClick={handleTryFree}
            className={`bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full font-medium transition-colors ${!showForm && (showVideo || showAudio) ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!showForm && (showVideo || showAudio)}
          >
            Get Started
          </button>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Comprehensive Company Intelligence in Minutes, Not Months
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Stop drowning in fragmented data. Get instant, AI-powered insights on any company's complete profile, market position, and growth trajectory.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex justify-center space-x-4">
              <button 
                ref={tryFreeButtonRef}
                onClick={handleTryFree}
                className={`bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-medium transition-all flex items-center
                  ${!showForm && (showVideo || showAudio) ? 'opacity-50 cursor-not-allowed' : ''}
                  ${isHighlighted ? 'ring-4 ring-purple-400 ring-opacity-75 scale-105' : ''}`}
                disabled={!showForm && (showVideo || showAudio)}
              >
                Try For Free <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button 
                onClick={handleWatchDemo}
                className={`border border-gray-500 hover:border-gray-400 px-8 py-3 rounded-full font-medium transition-colors ${!showVideo && (showForm || showAudio) ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={!showVideo && (showForm || showAudio)}
              >
                Watch Demo
              </button>
              <AudioPlayer 
                audioUrl="https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav" 
                isDisabled={!showAudio && (showForm || showVideo)}
                onPlayingChange={handleAudioToggle}
              />
            </div>
            <p className="text-sm text-gray-400 italic">
              Note: Only one action can be active at a time. Selecting a new action will deactivate others.
            </p>
          </div>

          <SignupForm isOpen={showForm} onClose={() => setShowForm(false)} />
          <VideoPlayer isOpen={showVideo} onClose={() => setShowVideo(false)} />
        </div>
      </header>

      {/* Expandable Sections */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <ExpandableSection
            title="Time Consuming Research"
            description="Analysts spend 70% of their time gathering and organizing company data from disparate sources instead of generating insights."
            Icon={Clock}
            isOpen={openSection === 'time'}
            onToggle={() => handleSectionToggle('time')}
          >
            <div className="text-gray-300 space-y-6">
              <div className="space-y-4">
                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "People spend 60% to 80% of their time trying to find data. It's a huge productivity loss"
                  <footer className="text-sm text-gray-400 mt-2">
                    - Dan Vesset, Group Vice President at IDC (MIT Sloan, 2024)
                  </footer>
                </blockquote>

                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "Less than 20% of time is spent analyzing data, while 82% is spent on searching for, preparing, and governing the appropriate data"
                  <footer className="text-sm text-gray-400 mt-2">
                    - IDC Report (IDC Blog, 2018)
                  </footer>
                </blockquote>

                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "We are surrounded by data, but starved for insights"
                  <footer className="text-sm text-gray-400 mt-2">
                    - Jay Baer, Marketing Expert (CareerFoundry, 2024)
                  </footer>
                </blockquote>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Hit & Miss Subscriptions"
            description="Most subscriptions offer broad but shallow market overviews. We focus on deep, granular analysis of individual companies for truly actionable insights."
            Icon={DollarSign}
            isOpen={openSection === 'subscriptions'}
            onToggle={() => handleSectionToggle('subscriptions')}
          >
            <div className="text-gray-300 space-y-6">
              <div className="space-y-4">
                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "By ignoring the drill-down feature, you are potentially making unnecessary expenses and missing out on better opportunities"
                  <footer className="text-sm text-gray-400 mt-2">
                    - Indrė Jankutė-Carmaciu, SEO & PR Expert (Whatagraph 2021)
                  </footer>
                </blockquote>

                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "Secondary market research... may not provide specific or up-to-date information tailored to the research objectives"
                  <footer className="text-sm text-gray-400 mt-2">
                    - WatchMyCompetitor Blog (2024)
                  </footer>
                </blockquote>

                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "Only 10% of potential value from analytics is unlocked in some sectors, leaving many reports too broad"
                  <footer className="text-sm text-gray-400 mt-2">
                    - McKinsey & Co (2024)
                  </footer>
                </blockquote>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Fragmented Information"
            description="Critical company information is scattered across hundreds of sources, making it impossible to build a complete picture quickly."
            Icon={Search}
            isOpen={openSection === 'fragmented'}
            onToggle={() => handleSectionToggle('fragmented')}
          >
            <div className="text-gray-300 space-y-6">
              <div className="space-y-4">
                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "Data quality is directly linked to the quality of decision-making"
                  <footer className="text-sm text-gray-400 mt-2">
                    - Melody Chien, Senior Director Analyst at Gartner (Segment Blog, 2023)
                  </footer>
                </blockquote>

                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "82% of analysts' time is spent on searching for, preparing, and governing data"
                  <footer className="text-sm text-gray-400 mt-2">
                    - IDC Report (IDC Blog, 2018)
                  </footer>
                </blockquote>

                <blockquote className="border-l-4 border-blue-400 pl-4 italic">
                  "Developing a detailed understanding of even just one private company requires dealmakers to scour the internet and manually piece scattered data together"
                  <footer className="text-sm text-gray-400 mt-2">
                    - Mike Cavallaro, Morgan Partners (SourceScrub Blog, 2023)
                  </footer>
                </blockquote>
              </div>
            </div>
          </ExpandableSection>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-900/50 py-16">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-400 mb-8">Trusted by leading companies worldwide</p>
          <div className="flex justify-center items-center space-x-12 opacity-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <Building2 key={i} className="w-12 h-12 text-gray-400" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your company research?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who've already upgraded their research workflow.
          </p>
          <button 
            onClick={handleStartFreeTrial}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiences } from '../constants';
import FadeInSection from './ui/FadeInSection';
import { Brain, Code, Shield } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Brain: <Brain className="h-full w-full" />,
  Code: <Code className="h-full w-full" />,
  Shield: <Shield className="h-full w-full" />,
};

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section-container">
      <FadeInSection>
        <h2 className="section-title neon-text">Experience</h2>
      </FadeInSection>
      
      <div className="mt-12">
        <VerticalTimeline lineColor="#B026FF">
          {experiences.map((experience) => (
            <VerticalTimelineElement
              key={experience.id}
              date={experience.date}
              dateClassName="text-text-secondary"
              iconStyle={{ background: experience.iconBg, color: '#fff' }}
              icon={iconMap[experience.icon]}
              contentStyle={{
                background: '#1A1625',
                color: '#fff',
                borderLeft: '4px solid #B026FF',
                boxShadow: '0 4px 20px rgba(176, 38, 255, 0.2)',
              }}
            >
              <h3 className="text-xl font-display font-bold">{experience.title}</h3>
              <h4 className="text-secondary text-base font-semibold">{experience.company}</h4>
              <p className="text-text-tertiary text-sm mb-2">{experience.location}</p>
              <p className="text-text-secondary">{experience.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default Experience;
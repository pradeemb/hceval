import React, { useState, useEffect } from 'react';
import { ClipboardCheck, UserCheck, Brain, Lightbulb, Users, GraduationCap } from 'lucide-react';
import { Header } from './components/Header';
import { CandidateInfo } from './components/CandidateInfo';
import { EvaluationSection } from './components/EvaluationSection';
import { TotalScore } from './components/TotalScore';
import { Feedback } from './components/Feedback';
import { ActionButtons } from './components/ActionButtons';
import { Category } from './types';

function App() {
  const initialCategories: Category[] = [
    {
      name: 'Technical Proficiency',
      weight: 35,
      icon: Brain,
      subcategories: [
        { name: 'Programming Skills (Java, PHP, JS)', weight: 10, score: 0 },
        { name: 'Framework Knowledge (Spring, Microservices)', weight: 10, score: 0 },
        { name: 'Code Quality and Best Practices', weight: 7, score: 0 },
        { name: 'Testing Skills (Unit Testing)', weight: 8, score: 0 },
      ],
    },
    {
      name: 'Experience and Background',
      weight: 20,
      icon: ClipboardCheck,
      subcategories: [
        { name: 'Relevant Experience', weight: 10, score: 0 },
        { name: 'Project Complexity & Ownership', weight: 5, score: 0 },
        { name: 'Certifications/Training', weight: 5, score: 0 },
      ],
    },
    {
      name: 'Soft Skills',
      weight: 15,
      icon: Users,
      subcategories: [
        { name: 'Communication', weight: 8, score: 0 },
        { name: 'Teamwork & Collaboration', weight: 4, score: 0 },
        { name: 'Adaptability', weight: 3, score: 0 },
      ],
    },
    {
      name: 'Problem-Solving and Analytical Skills',
      weight: 20,
      icon: Lightbulb,
      subcategories: [
        { name: 'Logical Thinking & Analysis', weight: 10, score: 0 },
        { name: 'Debugging & Optimization Skills', weight: 10, score: 0 },
      ],
    },
    {
      name: 'Cultural Fit',
      weight: 5,
      icon: UserCheck,
      subcategories: [
        { name: 'Alignment with Company Values', weight: 2.5, score: 0 },
        { name: 'Work Ethic & Motivation', weight: 2.5, score: 0 },
      ],
    },
    {
      name: 'Learning and Growth Potential',
      weight: 5,
      icon: GraduationCap,
      subcategories: [
        { name: 'Willingness to Learn', weight: 5, score: 0 },
      ],
    },
  ];

  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [totalScore, setTotalScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [candidateInfo, setCandidateInfo] = useState({
    candidateName: '',
    technicalInterviewer: '',
    otherTechnicalInterviewer: '',
    hrInterviewer: '',
    position: '',
    otherPosition: '',
    experienceLevel: '',
    date: '',
  });

  useEffect(() => {
    const newTotal = categories.reduce((acc, category) => {
      const categoryScore = category.subcategories.reduce((subAcc, sub) => {
        return subAcc + (sub.score * sub.weight) / 5;
      }, 0);
      return acc + categoryScore;
    }, 0);
    setTotalScore(Number(newTotal.toFixed(2)));
  }, [categories]);

  const handleScoreChange = (categoryIndex: number, subcategoryIndex: number, value: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].subcategories[subcategoryIndex].score = value;
    setCategories(newCategories);
  };

  const handleClear = () => {
    setCategories(initialCategories);
    setFeedback('');
    setCandidateInfo({
      candidateName: '',
      technicalInterviewer: '',
      otherTechnicalInterviewer: '',
      hrInterviewer: '',
      position: '',
      otherPosition: '',
      experienceLevel: '',
      date: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div id="evaluation-form" className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
          <Header />
          <CandidateInfo info={candidateInfo} setInfo={setCandidateInfo} />
          <EvaluationSection 
            categories={categories} 
            handleScoreChange={handleScoreChange} 
          />
          <Feedback feedback={feedback} setFeedback={setFeedback} />
          <TotalScore score={totalScore} />
          <ActionButtons 
            categories={categories}
            candidateInfo={candidateInfo}
            feedback={feedback}
            onClear={handleClear}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
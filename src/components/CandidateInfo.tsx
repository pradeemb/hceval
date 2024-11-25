import React from 'react';

interface CandidateInfoProps {
  info: {
    candidateName: string;
    technicalInterviewer: string;
    otherTechnicalInterviewer: string;
    hrInterviewer: string;
    position: string;
    otherPosition: string;
    experienceLevel: string;
    date: string;
  };
  setInfo: (info: any) => void;
}

export const CandidateInfo: React.FC<CandidateInfoProps> = ({ info, setInfo }) => {
  const positions = [
    'Web Developer',
    'Full Stack Developer',
    'Software Engineer',
    'Senior Software Engineer',
    'DevOps Engineer',
    'Cloud Architect',
    'Product Manager',
    'Others'
  ];

  const technicalInterviewers = [
    'Pradeep M',
    'Anand Vardan',
    'Both',
    'Others'
  ];

  const experienceLevels = [
    'Entry Level-Intern',
    'Junior',
    'Mid-Level',
    'Senior',
    'Expert'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  return (
    <div className="p-6 bg-white border-b border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Candidate Name *</label>
            <input
              type="text"
              name="candidateName"
              value={info.candidateName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Technical Interviewer *</label>
            <select
              name="technicalInterviewer"
              value={info.technicalInterviewer}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Technical Interviewer</option>
              {technicalInterviewers.map(interviewer => (
                <option key={interviewer} value={interviewer}>{interviewer}</option>
              ))}
            </select>
            {info.technicalInterviewer === 'Others' && (
              <input
                type="text"
                name="otherTechnicalInterviewer"
                value={info.otherTechnicalInterviewer}
                onChange={handleChange}
                placeholder="Enter interviewer name"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">HR Interviewer *</label>
            <input
              type="text"
              name="hrInterviewer"
              value={info.hrInterviewer}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Position Applied For *</label>
            <select
              name="position"
              value={info.position}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Position</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
            {info.position === 'Others' && (
              <input
                type="text"
                name="otherPosition"
                value={info.otherPosition}
                onChange={handleChange}
                placeholder="Enter position"
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Level *</label>
            <select
              name="experienceLevel"
              value={info.experienceLevel}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select Experience Level</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Interview Date *</label>
            <input
              type="date"
              name="date"
              value={info.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};
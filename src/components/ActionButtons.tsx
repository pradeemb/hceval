import React from 'react';
import { Download, RefreshCw, Printer, Mail } from 'lucide-react';
import { utils, writeFile } from 'xlsx';
import { Category } from '../types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
  categories: Category[];
  candidateInfo: any;
  feedback: string;
  onClear: () => void;
}

export const ActionButtons: React.FC<Props> = ({ categories, candidateInfo, feedback, onClear }) => {
  const exportToExcel = () => {
    const evaluationData = categories.flatMap(category =>
      category.subcategories.map(sub => ({
        Category: category.name,
        'Sub Category': sub.name,
        Weight: `${sub.weight}%`,
        Score: sub.score,
        'Score Label': getScoreLabel(sub.score)
      }))
    );

    const candidateSheet = [{
      'Candidate Name': candidateInfo.candidateName,
      'Technical Interviewer': candidateInfo.technicalInterviewer === 'Others' 
        ? candidateInfo.otherTechnicalInterviewer 
        : candidateInfo.technicalInterviewer,
      'HR Interviewer': candidateInfo.hrInterviewer,
      'Position': candidateInfo.position === 'Others' 
        ? candidateInfo.otherPosition 
        : candidateInfo.position,
      'Experience Level': candidateInfo.experienceLevel,
      'Interview Date': candidateInfo.date,
      'Feedback': feedback
    }];

    const wb = utils.book_new();
    utils.book_append_sheet(wb, utils.json_to_sheet(candidateSheet), 'Candidate Info');
    utils.book_append_sheet(wb, utils.json_to_sheet(evaluationData), 'Evaluation');
    
    writeFile(wb, `${candidateInfo.candidateName}-evaluation.xlsx`);
  };

  const exportToPDF = async () => {
    const element = document.getElementById('evaluation-form');
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${candidateInfo.candidateName}-evaluation.pdf`);
  };

  const sendEmail = () => {
    const totalScore = categories.reduce((acc, category) => {
      return acc + category.subcategories.reduce((subAcc, sub) => {
        return subAcc + (sub.score * sub.weight) / 5;
      }, 0);
    }, 0);

    const subject = `Interview Evaluation: ${candidateInfo.candidateName} - ${candidateInfo.position}`;
    const body = `
Interview Evaluation Summary

Candidate: ${candidateInfo.candidateName}
Position: ${candidateInfo.position}
Experience Level: ${candidateInfo.experienceLevel}
Interview Date: ${candidateInfo.date}
Total Score: ${totalScore.toFixed(2)}%

Technical Interviewer: ${candidateInfo.technicalInterviewer}
HR Interviewer: ${candidateInfo.hrInterviewer}

Feedback:
${feedback}

Evaluation Details:
${categories.map(category => `
${category.name}:
${category.subcategories.map(sub => 
  `- ${sub.name}: ${sub.score}/5 (${getScoreLabel(sub.score)})`
).join('\n')}`
).join('\n')}
    `;

    const mailtoLink = `mailto:pradeep.pradeemb@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="flex justify-end space-x-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
      <button
        onClick={onClear}
        className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Clear Form
      </button>
      <button
        onClick={exportToPDF}
        className="flex items-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Printer className="w-4 h-4 mr-2" />
        Print PDF
      </button>
      <button
        onClick={sendEmail}
        className="flex items-center px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        <Mail className="w-4 h-4 mr-2" />
        Send Email
      </button>
      <button
        onClick={exportToExcel}
        className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Download className="w-4 h-4 mr-2" />
        Export to Excel
      </button>
    </div>
  );
};

const getScoreLabel = (score: number): string => {
  switch (score) {
    case 0: return 'Poor';
    case 1: return 'Below Average';
    case 2: return 'Average';
    case 3: return 'Good';
    case 4: return 'Very Good';
    case 5: return 'Excellent';
    default: return '';
  }
};
import React from 'react';
import { ChevronDown, ChevronUp, LucideIcon } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function ExpandableSection({ 
  title, 
  description, 
  Icon, 
  children, 
  isOpen, 
  onToggle 
}: ExpandableSectionProps) {
  return (
    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
      <button 
        onClick={onToggle}
        className="w-full text-left"
      >
        <Icon className="w-12 h-12 text-blue-400 mb-6" />
        <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
          {title}
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-blue-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-400" />
          )}
        </h3>
        <p className="text-gray-400">
          {description}
        </p>
      </button>
      
      <div className={`transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="border-t border-slate-700 pt-6">
          {children}
        </div>
      </div>
    </div>
  );
}
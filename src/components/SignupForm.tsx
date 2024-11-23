import React from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

interface SignupFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const WEBHOOK_URL = 'https://hook.eu2.make.com/ulwwlqdhyfg7h2twi8ng8quq76cij2k1';
const EMAILJS_SERVICE_ID = 'service_92pbo2r';
const EMAILJS_TEMPLATE_ID = 'template_y7iyxrr';
const EMAILJS_PUBLIC_KEY = 'LG8Aekz4UdwGHqsJw';

export function SignupForm({ isOpen, onClose }: SignupFormProps) {
  const [formData, setFormData] = React.useState({
    email: '',
    role: '',
    problems: '',
    companyUrl: ''
  });
  const [isValidating, setIsValidating] = React.useState(false);
  const [showSparkle, setShowSparkle] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setShowSparkle(true);
      const timer = setTimeout(() => setShowSparkle(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const validateUrl = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors'
      });
      return true; // If we get here, the URL is valid
    } catch (error) {
      return false;
    }
  };

  const sendToWebhook = async (email: string, url: string) => {
    try {
      const webhookUrl = `${WEBHOOK_URL}?email=${encodeURIComponent(email)}&url=${encodeURIComponent(url)}`;
      await fetch(webhookUrl);
    } catch (error) {
      console.error('Webhook error:', error);
      throw new Error('Failed to trigger analysis');
    }
  };

  const sendEmail = async () => {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          user_email: formData.email,
          user_role: formData.role,
          user_problems: formData.problems,
          company_url: formData.companyUrl,
        },
        EMAILJS_PUBLIC_KEY
      );
    } catch (error) {
      console.error('Email error:', error);
      throw new Error('Failed to send email notification');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);

    try {
      // Validate URL
      const isValid = await validateUrl(formData.companyUrl);
      if (!isValid) {
        toast.error('Please enter a valid company URL');
        setIsValidating(false);
        return;
      }

      // Send data to webhook
      await sendToWebhook(formData.email, formData.companyUrl);

      // Send email notification
      await sendEmail();

      toast.success('Analysis request submitted successfully!');
      onClose();
    } catch (error) {
      toast.error((error as Error).message || 'Something went wrong');
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
      <Toaster position="top-center" />
      <div className="mt-8 max-w-2xl mx-auto bg-slate-800 rounded-2xl p-8 border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <div className={`absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-500/30 to-purple-500/30 
              ${showSparkle ? 'animate-sparkle' : 'opacity-0'}`}></div>
            <div className={`absolute -inset-4 rounded-xl border-2 border-transparent
              ${showSparkle ? 'animate-glow' : 'opacity-0'}`}></div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text relative z-10">
              Get Your Free Instant Company Analysis Report
            </h3>
            <p className="text-sm text-gray-400 mt-1 relative z-10">Sign up now and receive an AI-powered analysis within minutes</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Your business email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Your role in company research
            </label>
            <select
              id="role"
              required
              className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="">Select your role</option>
              <option value="analyst">Market Analyst</option>
              <option value="researcher">Business Researcher</option>
              <option value="executive">Executive</option>
              <option value="consultant">Consultant</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="problems" className="block text-sm font-medium text-gray-300 mb-2">
              What is the most annoying aspect of doing company research?
            </label>
            <textarea
              id="problems"
              required
              rows={4}
              className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.problems}
              onChange={(e) => setFormData({...formData, problems: e.target.value})}
            ></textarea>
          </div>
          <div>
            <label htmlFor="companyUrl" className="block text-sm font-medium text-gray-300 mb-2">
              Enter a company website URL for your free instant analysis report
            </label>
            <input
              type="url"
              id="companyUrl"
              required
              placeholder="https://example.com"
              className="w-full px-4 py-2 bg-slate-900 rounded-lg border border-slate-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.companyUrl}
              onChange={(e) => setFormData({...formData, companyUrl: e.target.value})}
            />
            <p className="mt-2 text-sm text-gray-400">
              We'll analyze this company and send you a comprehensive report within minutes
            </p>
          </div>
          <button
            type="submit"
            disabled={isValidating}
            className={`w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
              px-8 py-3 rounded-full font-medium transition-colors relative
              ${isValidating ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isValidating ? 'Validating...' : 'Get Your Free Company Analysis'}
          </button>
        </form>
      </div>
    </div>
  );
}

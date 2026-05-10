import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AlertCircle, Send } from 'lucide-react';

export default function ReportForm({ apiUrl }) {
  const [formData, setFormData] = useState({
    type: 'Flood',
    severity: 'Medium',
    description: '',
    lat: '',
    lng: '',
    reporterName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        toast.success('Location fetched!');
      }, () => {
        toast.error('Failed to get location. Please enter manually.');
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        location: {
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng)
        }
      };
      await axios.post(`${apiUrl}/reports`, payload);
      toast.success('Report submitted successfully!');
      setFormData({
        ...formData,
        description: '',
        lat: '',
        lng: ''
      });
    } catch (err) {
      toast.error('Failed to submit report.');
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <AlertCircle className="text-danger" />
        Report an Emergency
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Disaster Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-surface border border-slate-600 rounded-lg p-2 text-white outline-none focus:border-primary transition-colors">
              <option>Flood</option>
              <option>Earthquake</option>
              <option>Fire</option>
              <option>Medical Emergency</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Severity</label>
            <select name="severity" value={formData.severity} onChange={handleChange} className="w-full bg-surface border border-slate-600 rounded-lg p-2 text-white outline-none focus:border-primary transition-colors">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Description</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
            rows="3"
            placeholder="Describe the situation..."
            className="w-full bg-surface border border-slate-600 rounded-lg p-2 text-white outline-none focus:border-primary transition-colors resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Location</label>
          <div className="flex gap-2">
            <input type="number" step="any" name="lat" placeholder="Latitude" value={formData.lat} onChange={handleChange} required className="w-full bg-surface border border-slate-600 rounded-lg p-2 text-white outline-none focus:border-primary" />
            <input type="number" step="any" name="lng" placeholder="Longitude" value={formData.lng} onChange={handleChange} required className="w-full bg-surface border border-slate-600 rounded-lg p-2 text-white outline-none focus:border-primary" />
            <button type="button" onClick={handleGetLocation} className="bg-secondary/20 hover:bg-secondary/40 text-secondary border border-secondary/50 rounded-lg px-3 transition-colors text-sm whitespace-nowrap">
              My Location
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-slate-300">Your Name (Optional)</label>
          <input type="text" name="reporterName" value={formData.reporterName} onChange={handleChange} placeholder="Anonymous" className="w-full bg-surface border border-slate-600 rounded-lg p-2 text-white outline-none focus:border-primary transition-colors" />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg flex justify-center items-center gap-2 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : (
            <>
              Submit Report <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}

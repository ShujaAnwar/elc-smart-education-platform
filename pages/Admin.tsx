import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, MessageSquare, TrendingUp, Settings, 
  Trash2, Edit, Plus, Check, Save, Eye, EyeOff, ShieldCheck,
  Smartphone, LayoutDashboard, LogOut, Clock, MessageCircle, Globe, Palette
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area
} from 'recharts';
import { Course, Registration, Testimonial, SiteSettings } from '../types';
import { dataService } from '../services/dataService';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'students' | 'courses' | 'content' | 'feedback' | 'settings' | 'seo' | 'theme' | 'whatsapp'>('dashboard');
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [feedback, setFeedback] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [editingCourse, setEditingCourse] = useState<Partial<Course> | null>(null);

  useEffect(() => {
    setRegistrations(dataService.getRegistrations());
    setCourses(dataService.getCourses());
    setFeedback(dataService.getFeedback());
    setSettings(dataService.getSettings());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') setIsLoggedIn(true);
    else alert('Invalid Credentials');
  };

  const persistData = () => {
    setIsSaving(true);
    setTimeout(() => {
      dataService.saveCourses(courses);
      dataService.saveRegistrations(registrations);
      dataService.saveFeedback(feedback);
      if (settings) dataService.saveSettings(settings);
      setIsSaving(false);
    }, 800);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-8">E</div>
          <h2 className="text-3xl font-black text-gray-900 text-center mb-2">Admin Portal</h2>
          <p className="text-gray-400 text-center mb-10 text-sm uppercase tracking-widest font-bold">Secure Access Only</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            />
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all">
              Login to Console
            </button>
          </form>
          <p className="mt-8 text-center text-xs text-gray-400">Default: admin123</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    const stats = [
      { label: 'Total Students', value: registrations.length, icon: Users, color: 'bg-indigo-50 text-indigo-600' },
      { label: 'New Apps', value: registrations.filter(r => r.status === 'Pending').length, icon: BookOpen, color: 'bg-green-50 text-green-600' },
      { label: 'Courses', value: courses.length, icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
      { label: 'Feedback', value: feedback.filter(f => !f.approved).length, icon: MessageSquare, color: 'bg-amber-50 text-amber-600' },
    ];

    const chartData = [
      { name: 'Mon', apps: 4 }, { name: 'Tue', apps: 10 }, { name: 'Wed', apps: 8 }, 
      { name: 'Thu', apps: 15 }, { name: 'Fri', apps: 12 }, { name: 'Sat', apps: 18 }, { name: 'Sun', apps: 5 },
    ];

    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
              <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center shrink-0`}><s.icon size={28} /></div>
              <div>
                <div className="text-3xl font-black text-gray-900">{s.value}</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-gray-100">
            <h3 className="text-xl font-black mb-8">Registration Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="apps" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorApps)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-4">
             <h3 className="text-xl font-black mb-6">Quick Actions</h3>
             <button onClick={() => setActiveTab('courses')} className="w-full p-4 bg-indigo-50 text-indigo-600 rounded-2xl font-bold flex items-center gap-3 text-sm">
                <Plus size={18} /> Add Course
             </button>
             <button onClick={() => setActiveTab('content')} className="w-full p-4 bg-green-50 text-green-600 rounded-2xl font-bold flex items-center gap-3 text-sm">
                <Edit size={18} /> Edit Homepage
             </button>
             <button onClick={persistData} className="w-full p-4 bg-purple-600 text-white rounded-2xl font-bold flex items-center gap-3 text-sm">
                <Save size={18} /> Backup Database
             </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEnrollments = () => (
    <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden">
      <div className="p-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <h3 className="text-2xl font-black text-gray-900">Enrollments</h3>
        <div className="flex gap-4">
           <input type="text" placeholder="Search students..." className="px-4 py-2 bg-gray-50 rounded-xl text-sm outline-none" />
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold flex items-center gap-2">Export</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-10 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course</th>
              <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-10 py-5 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {registrations.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-10 py-5">
                  <div className="font-bold">{r.fullName}</div>
                  <div className="text-xs text-gray-400">{r.phone}</div>
                </td>
                <td className="px-6 py-5 text-sm">{courses.find(c => c.id === r.courseId)?.name || 'N/A'}</td>
                <td className="px-6 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${r.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-10 py-5 text-right">
                   <button className="p-2 text-indigo-600"><Check size={18} /></button>
                   <button className="p-2 text-red-500"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderWhatsAppSettings = () => {
    if (!settings) return null;
    return (
      <div className="space-y-10 animate-in fade-in duration-500">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black">WhatsApp Direct Connect</h3>
          <button onClick={persistData} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2">
            {isSaving ? 'Saving...' : <><Save size={20}/> Publish Changes</>}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Main Config */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><Smartphone size={20}/></div>
                <h4 className="font-bold text-lg">General Settings</h4>
              </div>
              <button 
                onClick={() => setSettings({...settings, whatsappConfig: {...settings.whatsappConfig, enabled: !settings.whatsappConfig.enabled}})}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${settings.whatsappConfig.enabled ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}
              >
                {settings.whatsappConfig.enabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">WhatsApp Number (with country code)</label>
                <input 
                  value={settings.whatsappConfig.number} 
                  onChange={e => setSettings({...settings, whatsappConfig: {...settings.whatsappConfig, number: e.target.value}})} 
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. 923212652922"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Default Message</label>
                <textarea 
                  value={settings.whatsappConfig.defaultMessage} 
                  onChange={e => setSettings({...settings, whatsappConfig: {...settings.whatsappConfig, defaultMessage: e.target.value}})} 
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-green-500 h-24"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Button Position</label>
                <select 
                  value={settings.whatsappConfig.position} 
                  onChange={e => setSettings({...settings, whatsappConfig: {...settings.whatsappConfig, position: e.target.value as any}})}
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                >
                  <option value="right">Bottom Right</option>
                  <option value="left">Bottom Left</option>
                </select>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Clock size={20}/></div>
                <h4 className="font-bold text-lg">Business Hours</h4>
              </div>
              <button 
                onClick={() => setSettings({...settings, whatsappConfig: {...settings.whatsappConfig, businessHoursEnabled: !settings.whatsappConfig.businessHoursEnabled}})}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${settings.whatsappConfig.businessHoursEnabled ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}
              >
                {settings.whatsappConfig.businessHoursEnabled ? 'Active' : 'Always On'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Start Time</label>
                <input 
                  type="time"
                  value={settings.whatsappConfig.startHour} 
                  onChange={e => setSettings({...settings, whatsappConfig: {...settings.whatsappConfig, startHour: e.target.value}})} 
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">End Time</label>
                <input 
                  type="time"
                  value={settings.whatsappConfig.endHour} 
                  onChange={e => setSettings({...settings, whatsappConfig: {...settings.whatsappConfig, endHour: e.target.value}})} 
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Offline Message</label>
                <textarea 
                  value={settings.whatsappConfig.offlineMessage} 
                  onChange={e => setSettings({...settings, whatsappConfig: {...settings.whatsappConfig, offlineMessage: e.target.value}})} 
                  className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-24"
                  placeholder="Shown when outside business hours"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCourseEditor = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black">Manage Courses</h3>
        <button 
          onClick={() => setEditingCourse({ id: Math.random().toString(36).substr(2, 9), name: '', published: true })}
          className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2"
        >
          <Plus size={20} /> Add New Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 relative group">
            <img src={course.image} className="w-full h-40 object-cover rounded-2xl mb-6" alt="" />
            <div className="absolute top-10 right-10 flex gap-2">
               <button onClick={() => setEditingCourse(course)} className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg text-indigo-600"><Edit size={16} /></button>
               <button className="p-3 bg-white/90 backdrop-blur rounded-full shadow-lg text-red-500"><Trash2 size={16} /></button>
            </div>
            <h4 className="font-bold text-lg mb-2">{course.name}</h4>
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
               <span className="bg-gray-50 px-2 py-1 rounded">{course.level}</span>
               <span className="bg-gray-50 px-2 py-1 rounded">{course.duration}</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="font-black text-indigo-600">{course.fee}</span>
               <div className={`flex items-center gap-1 text-[10px] font-bold uppercase ${course.published ? 'text-green-600' : 'text-gray-400'}`}>
                  {course.published ? <Eye size={12} /> : <EyeOff size={12} />}
                  {course.published ? 'Published' : 'Draft'}
               </div>
            </div>
          </div>
        ))}
      </div>

      {editingCourse && (
        <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-2xl rounded-[3rem] p-12 overflow-y-auto max-h-[90vh]">
              <h3 className="text-2xl font-black mb-8">Course Editor</h3>
              <div className="grid grid-cols-2 gap-6">
                 <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Course Name</label>
                    <input value={editingCourse.name} onChange={e => setEditingCourse({...editingCourse, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Duration</label>
                    <input value={editingCourse.duration} onChange={e => setEditingCourse({...editingCourse, duration: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Fee</label>
                    <input value={editingCourse.fee} onChange={e => setEditingCourse({...editingCourse, fee: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                 </div>
                 <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
                    <textarea value={editingCourse.description} onChange={e => setEditingCourse({...editingCourse, description: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none min-h-[100px]" />
                 </div>
                 <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">Image URL</label>
                    <input value={editingCourse.image} onChange={e => setEditingCourse({...editingCourse, image: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                 </div>
              </div>
              <div className="flex gap-4 mt-10">
                 <button 
                  onClick={() => {
                    const newCourses = editingCourse.id && courses.find(c => c.id === editingCourse.id) 
                      ? courses.map(c => c.id === editingCourse.id ? (editingCourse as Course) : c)
                      : [...courses, editingCourse as Course];
                    setCourses(newCourses);
                    setEditingCourse(null);
                  }}
                  className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold"
                 >
                    Save Course
                 </button>
                 <button onClick={() => setEditingCourse(null)} className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold">Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );

  const renderContentEditor = () => (
    <div className="space-y-10">
       <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black">Website Content Editor</h3>
          <button onClick={persistData} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2">
            {isSaving ? 'Saving...' : <><Save size={20}/> Publish Changes</>}
          </button>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Hero Editor */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-6">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><LayoutDashboard size={20}/></div>
                <h4 className="font-bold text-lg">Hero Section</h4>
             </div>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Hero Title</label>
                   <input value={settings?.hero.title} onChange={e => setSettings({...settings!, hero: {...settings!.hero, title: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Hero Subtitle</label>
                   <textarea value={settings?.hero.subtitle} onChange={e => setSettings({...settings!, hero: {...settings!.hero, subtitle: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-24" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Primary Button</label>
                      <input value={settings?.hero.ctaPrimary} onChange={e => setSettings({...settings!, hero: {...settings!.hero, ctaPrimary: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase">Secondary Button</label>
                      <input value={settings?.hero.ctaSecondary} onChange={e => setSettings({...settings!, hero: {...settings!.hero, ctaSecondary: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                   </div>
                </div>
             </div>
          </div>

          {/* Instructor Editor */}
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-6">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><Users size={20}/></div>
                <h4 className="font-bold text-lg">Instructor Profile</h4>
             </div>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Instructor Name</label>
                   <input value={settings?.instructor.name} onChange={e => setSettings({...settings!, instructor: {...settings!.instructor, name: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Biography</label>
                   <textarea value={settings?.instructor.bio} onChange={e => setSettings({...settings!, instructor: {...settings!.instructor, bio: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-32" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Image URL</label>
                   <input value={settings?.instructor.image} onChange={e => setSettings({...settings!, instructor: {...settings!.instructor, image: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-10">
       <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black">Institute Settings</h3>
          <button onClick={persistData} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold">Save Settings</button>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-6">
             <h4 className="font-bold text-lg flex items-center gap-2"><Smartphone size={18}/> Contact Details</h4>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
                   <input value={settings?.phone} onChange={e => setSettings({...settings!, phone: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">WhatsApp Number (Legacy)</label>
                   <input value={settings?.whatsapp} onChange={e => setSettings({...settings!, whatsapp: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
                   <input value={settings?.email} onChange={e => setSettings({...settings!, email: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Full Address</label>
                   <textarea value={settings?.address} onChange={e => setSettings({...settings!, address: e.target.value})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none h-24" />
                </div>
             </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 space-y-6">
             <h4 className="font-bold text-lg flex items-center gap-2">Social Links</h4>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Facebook</label>
                   <input value={settings?.socials.facebook} onChange={e => setSettings({...settings!, socials: {...settings!.socials, facebook: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">Instagram</label>
                   <input value={settings?.socials.instagram} onChange={e => setSettings({...settings!, socials: {...settings!.socials, instagram: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-400 uppercase">LinkedIn</label>
                   <input value={settings?.socials.linkedin} onChange={e => setSettings({...settings!, socials: {...settings!.socials, linkedin: e.target.value}})} className="w-full p-4 bg-gray-50 rounded-2xl outline-none" />
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex pt-24">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-100 flex flex-col fixed h-screen top-24 left-0 z-40">
        <div className="p-8 flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'students', label: 'Enrollments', icon: Users },
            { id: 'courses', label: 'Courses', icon: BookOpen },
            { id: 'content', label: 'Content Manager', icon: Edit },
            { id: 'whatsapp', label: 'WhatsApp Connect', icon: MessageCircle },
            { id: 'feedback', label: 'Feedback', icon: MessageSquare },
            { id: 'seo', label: 'SEO/Meta', icon: Globe },
            { id: 'theme', label: 'Theme/Colors', icon: Palette },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-xl' : 'text-gray-500 hover:bg-indigo-50'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-8 border-t border-gray-50">
           <button onClick={() => setIsLoggedIn(false)} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50">
              <LogOut size={20} /> Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-80 p-12">
        <div className="flex justify-between items-center mb-12">
           <div>
              <h2 className="text-3xl font-black tracking-tight">ELC Console</h2>
              <p className="text-gray-400 text-sm">Managing: {settings?.instituteName}</p>
           </div>
           {isSaving && (
             <div className="flex items-center gap-2 text-indigo-600 font-bold animate-pulse">
                <ShieldCheck size={20}/> Saving Changes...
             </div>
           )}
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'students' && renderEnrollments()}
        {activeTab === 'courses' && renderCourseEditor()}
        {activeTab === 'content' && renderContentEditor()}
        {activeTab === 'whatsapp' && renderWhatsAppSettings()}
        {activeTab === 'settings' && renderSettings()}
        
        {/* Placeholders for secondary modules */}
        {(activeTab === 'feedback' || activeTab === 'seo' || activeTab === 'theme') && (
           <div className="text-center py-40 bg-white rounded-[4rem] border border-gray-100">
              <Settings size={48} className="mx-auto text-gray-200 mb-6" />
              <h3 className="text-2xl font-black mb-2">Advanced Module</h3>
              <p className="text-gray-400">This module is currently in beta. Please check back later.</p>
           </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
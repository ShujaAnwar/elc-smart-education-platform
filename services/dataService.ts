
import { Course, Registration, Testimonial, GalleryItem, SiteSettings } from '../types';
import { INITIAL_COURSES, INITIAL_TESTIMONIALS, SITE_SETTINGS, GALLERY_ITEMS } from '../constants';

const KEYS = {
  COURSES: 'elc_courses',
  REGISTRATIONS: 'elc_registrations',
  FEEDBACK: 'elc_feedback',
  GALLERY: 'elc_gallery',
  SETTINGS: 'elc_settings'
};

const get = <T>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};

const set = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const dataService = {
  getCourses: () => get<Course[]>(KEYS.COURSES, INITIAL_COURSES),
  saveCourses: (courses: Course[]) => set(KEYS.COURSES, courses),
  
  getRegistrations: () => get<Registration[]>(KEYS.REGISTRATIONS, []),
  saveRegistrations: (regs: Registration[]) => set(KEYS.REGISTRATIONS, regs),
  
  getFeedback: () => get<Testimonial[]>(KEYS.FEEDBACK, INITIAL_TESTIMONIALS),
  saveFeedback: (feed: Testimonial[]) => set(KEYS.FEEDBACK, feed),
  
  getGallery: () => get<GalleryItem[]>(KEYS.GALLERY, GALLERY_ITEMS),
  saveGallery: (items: GalleryItem[]) => set(KEYS.GALLERY, items),
  
  getSettings: () => get<SiteSettings>(KEYS.SETTINGS, SITE_SETTINGS),
  saveSettings: (settings: SiteSettings) => set(KEYS.SETTINGS, settings)
};

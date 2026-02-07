
export enum CourseLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum CourseMode {
  ONSITE = 'On-site',
  ONLINE = 'Online',
  HYBRID = 'Hybrid'
}

export interface Course {
  id: string;
  name: string;
  description: string;
  duration: string;
  fee: string;
  mode: CourseMode;
  level: CourseLevel;
  category: 'English' | 'Computer';
  image: string;
  published: boolean;
}

export interface Registration {
  id: string;
  fullName: string;
  fatherName: string;
  email: string;
  phone: string;
  courseId: string;
  batchTiming: string;
  message: string;
  status: 'Pending' | 'Contacted' | 'Enrolled';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  rating: number;
  content: string;
  approved: boolean;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  bannerImage: string;
}

export interface InstructorContent {
  name: string;
  title: string;
  bio: string;
  image: string;
  stats: { label: string; value: string }[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
}

export interface ThemeSettings {
  colorPrimary: string;
  colorSecondary: string;
  borderRadius: string;
}

export interface WhatsAppSettings {
  enabled: boolean;
  number: string;
  defaultMessage: string;
  position: 'left' | 'right';
  businessHoursEnabled: boolean;
  startHour: string; // HH:mm
  endHour: string;   // HH:mm
  offlineMessage: string;
}

export interface SiteSettings {
  instituteName: string;
  shortName: string;
  founder: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string; // Legacy field for text links
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  hero: HeroContent;
  instructor: InstructorContent;
  seo: SEOData;
  theme: ThemeSettings;
  whatsappConfig: WhatsAppSettings;
}

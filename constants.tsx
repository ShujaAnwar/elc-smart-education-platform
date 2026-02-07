
import { Course, CourseLevel, CourseMode, Testimonial, SiteSettings, GalleryItem } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: '1',
    name: 'Spoken English Mastery',
    description: 'Master the art of fluent conversation with real-world scenarios and confidence building.',
    duration: '3 Months',
    fee: '15,000 PKR',
    mode: CourseMode.ONSITE,
    level: CourseLevel.BEGINNER,
    category: 'English',
    image: 'https://images.unsplash.com/photo-1543165796-5426273ea4d2?q=80&w=2070&auto=format&fit=crop',
    published: true
  },
  {
    id: '2',
    name: 'Advanced Web Development',
    description: 'Learn modern web technologies including React, Tailwind, and Node.js.',
    duration: '6 Months',
    fee: '25,000 PKR',
    mode: CourseMode.HYBRID,
    level: CourseLevel.ADVANCED,
    category: 'Computer',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    published: true
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    course: 'Spoken English',
    rating: 5,
    content: 'Sir Salman is an amazing teacher. My confidence in speaking English has improved drastically.',
    approved: true,
    featured: true
  }
];

export const SITE_SETTINGS: SiteSettings = {
  instituteName: 'The Excellent Language Center',
  shortName: 'ELC',
  founder: 'Sir Salman',
  address: 'Near Pearl Food Center, Saudabad, Malir, Karachi, Pakistan',
  phone: '0321-2652922',
  email: 'theexcellentelc@gmail.com',
  whatsapp: '+923212652922',
  socials: {
    facebook: 'https://facebook.com/elckarachi',
    instagram: 'https://instagram.com/elc_official',
    linkedin: 'https://linkedin.com/school/elc'
  },
  hero: {
    title: "Learn English. Master Tech. Build Your Future.",
    subtitle: "Join The Excellent Language Center (ELC) and transform your skills under the guidance of Sir Salman.",
    ctaPrimary: "Get Started Now",
    ctaSecondary: "Browse Courses",
    bannerImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
  },
  instructor: {
    name: "Sir Salman",
    title: "ELC Founder & Master Trainer",
    bio: "Sir Salman is a dedicated educator with a passion for helping students overcome language barriers and embrace technology. With over 15 years of teaching experience, he has pioneered specialized methods that make complex concepts easy to understand for beginners.",
    image: "",
    stats: [
      { label: "Experience", value: "15+ Years" },
      { label: "Graduates", value: "5000+" }
    ]
  },
  seo: {
    title: "ELC - The Excellent Language Center | Karachi",
    description: "Premium English Language and Computer Training Institute in Karachi. Founded by Sir Salman.",
    keywords: "English course, IELTS, Karachi, Computer course, Web Development, Sir Salman"
  },
  theme: {
    colorPrimary: "#6366f1",
    colorSecondary: "#a855f7",
    borderRadius: "1.5rem"
  },
  whatsappConfig: {
    enabled: true,
    number: "923212652922",
    defaultMessage: "Assalamu Alaikum, I want to get information about ELC courses.",
    position: "right",
    businessHoursEnabled: true,
    startHour: "09:00",
    endHour: "22:00",
    offlineMessage: "Hi, ELC is currently closed. Please leave your message and we will get back to you during business hours."
  }
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop', title: 'Interactive Session', category: 'Class' }
];

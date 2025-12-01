import React from 'react';

export const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

export const LineIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" role="img">
        <path d="M18.814 0H5.186C2.327 0 0 2.327 0 5.186v13.628C0 21.673 2.327 24 5.186 24h13.628C21.673 24 24 21.673 24 18.814V5.186C24 2.327 21.673 0 18.814 0zM8.38 17.653c-.328 0-.649-.135-.875-.36l-1.125-1.125c-.482-.482-.482-1.268 0-1.75l5.035-5.035c.226-.226.547-.36.875-.36.328 0 .649.135.875.36l1.125 1.125c.482.482.482 1.268 0 1.75l-5.035 5.035c-.226.225-.547.36-.875.36zm7.24-5.467h-2.115c-.675 0-1.222-.547-1.222-1.222s.547-1.222 1.222-1.222h3.337c.675 0 1.222.547 1.222 1.222v5.772c0 .675-.547 1.222-1.222 1.222s-1.222-.547-1.222-1.222v-3.336z" />
    </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
  </svg>
);

export const MailIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);

export const RouteIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21s-8-4.5-8-11.5a8 8 0 1116 0c0 7-8 11.5-8 11.5z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21v-7"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10H3.5a1.5 1.5 0 00-1.5 1.5v0A1.5 1.5 0 003.5 13H5m14 0h1.5a1.5 1.5 0 001.5-1.5v0a1.5 1.5 0 00-1.5-1.5H19" />
    </svg>
);

export const PlusCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

export const MinusCircleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);
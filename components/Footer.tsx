
import React from 'react';
import { FacebookIcon, LineIcon, PhoneIcon, MailIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-800 text-stone-300 py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-serif text-amber-500 mb-6 tracking-widest">CONTACT US</h3>
        <div className="flex flex-wrap justify-center items-center gap-y-4 gap-x-6 md:gap-x-10 text-sm">
          <a href="mailto:info@eliteholidaythai.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <MailIcon className="w-5 h-5" />
            <span>info@eliteholidaythai.com</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
            <PhoneIcon className="w-5 h-5" />
            <span>02-661-9399 / 086-971-7388</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
            <LineIcon className="w-5 h-5" />
            <span>@eliteholiday</span>
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
            <FacebookIcon className="w-5 h-5" />
            <span>Elite Holiday and Agency</span>
          </a>
        </div>
        <div className="mt-8 pt-6 border-t border-stone-700 text-sm text-stone-500">
          &copy; {new Date().getFullYear()} Siam Signature. All rights reserved. Calculator by AI.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

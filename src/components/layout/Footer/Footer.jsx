import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import FooterLinks from './FooterLinks';
import FooterSocial from './FooterSocial';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">
              Taskin Mubassir
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              CSE Graduate from BRAC University passionate about building web
              applications that solve real-world problems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <FooterLinks />
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-400" />
                <a
                  href="mailto:taskinmubassir@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  taskinmubassir@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-blue-400" />
                <a
                  href="tel:+8801737778252"
                  className="hover:text-white transition-colors"
                >
                  +880 173 777 8252
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-400" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Follow Me</h4>
            <FooterSocial />
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} Taskin Mohammad Mubassir. All rights reserved.
          </p>
          <p className="mt-2">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

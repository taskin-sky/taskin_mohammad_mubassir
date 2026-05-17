import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import AnimatedSection from '../../components/animations/AnimatedSection';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import SEO from '../../components/SEO';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <SEO />
      <div className="min-h-screen py-32">
        <div className="container mx-auto px-6">
          <AnimatedSection>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4">
              Contact Me
            </h1>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Have a project in mind or want to collaborate? Feel free to
                  reach out!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <FaEnvelope
                        className="text-blue-600 dark:text-blue-400"
                        size={20}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <a
                        href="mailto:taskinmubassir@gmail.com"
                        className="hover:text-blue-600"
                      >
                        taskinmubassir@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <FaPhone
                        className="text-blue-600 dark:text-blue-400"
                        size={20}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone
                      </p>
                      <a
                        href="tel:+8801737778252"
                        className="hover:text-blue-600"
                      >
                        +880 173 777 8252
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <FaMapMarkerAlt
                        className="text-blue-600 dark:text-blue-400"
                        size={20}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </p>
                      <p>Dhaka, Bangladesh</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <a
                    href="https://github.com/taskin-sky"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-gray-900 dark:border-gray-700 bg-gray-200 dark:bg-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaGithub size={24} />
                  </a>
                  <a
                    href="https://linkedin.com/in/taskin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-gray-900 dark:border-gray-700 bg-gray-200 dark:bg-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                  <a
                    href="mailto:taskinmubassir@gmail.com"
                    className="p-3 border border-gray-900 dark:border-gray-700 bg-gray-200 dark:bg-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FaEnvelope size={24} />
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}

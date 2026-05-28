import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaTrash,
  FaWindowMinimize,
  FaWindowMaximize,
  FaRegSmile,
  FaRegLightbulb,
  FaRegCommentDots,
} from 'react-icons/fa';
import {
  chatbotKnowledge,
  qaMapping,
  projectAnswers,
} from '../../data/chatbotData';

const TRobo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Function to get project-specific responses
  const getProjectResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Check if projectAnswers exists
    if (!projectAnswers) return null;

    // Check for specific project names
    for (const [projectName, answer] of Object.entries(projectAnswers)) {
      if (lowerMessage.includes(projectName.toLowerCase())) {
        return answer;
      }
    }

    // Check for partial matches
    if (lowerMessage.includes('tanjim') || lowerMessage.includes('pathshala')) {
      return projectAnswers["Tanjim's Pathshala"];
    }

    if (lowerMessage.includes('ostad') || lowerMessage.includes('clone')) {
      return projectAnswers['Ostad Home Clone'];
    }

    if (lowerMessage.includes('epixelab')) {
      return projectAnswers['Epixelab Home'];
    }

    if (
      lowerMessage.includes('dailydev') ||
      lowerMessage.includes('daily dev')
    ) {
      return projectAnswers['DailyDev Clone'];
    }

    if (lowerMessage.includes('blog') && lowerMessage.includes('mela')) {
      return projectAnswers['Blog-Mela Platform'];
    }

    if (
      (lowerMessage.includes('news') || lowerMessage.includes('portal')) &&
      lowerMessage.includes('dynamic')
    ) {
      return projectAnswers['Dynamic News Portal'];
    }

    if (
      lowerMessage.includes('portfolio') &&
      (lowerMessage.includes('website') || lowerMessage.includes('site'))
    ) {
      return projectAnswers['Portfolio Website'];
    }

    return null;
  };

  // Initialize chat with welcome message
  useEffect(() => {
    if (
      messages.length === 0 &&
      chatbotKnowledge &&
      chatbotKnowledge.greetings
    ) {
      const welcomeMessage =
        chatbotKnowledge.greetings[
          Math.floor(Math.random() * chatbotKnowledge.greetings.length)
        ];
      setMessages([
        { text: welcomeMessage, sender: 'bot', timestamp: new Date() },
      ]);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);

  // Find best response based on user input
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // FIRST: Check for specific projects
    const projectResponse = getProjectResponse(userMessage);
    if (projectResponse) {
      return projectResponse;
    }

    // Check for greetings
    if (
      lowerMessage.match(
        /^(hi|hello|hey|greetings|sup|hola|good morning|good afternoon|assalamu|salam)/
      )
    ) {
      if (chatbotKnowledge && chatbotKnowledge.greetings) {
        return chatbotKnowledge.greetings[
          Math.floor(Math.random() * chatbotKnowledge.greetings.length)
        ];
      }
      return 'Hello! How can I help you today?';
    }

    // Check for farewells
    if (
      lowerMessage.match(
        /^(bye|goodbye|see you|farewell|bye bye|take care|allah hafez)/
      )
    ) {
      if (chatbotKnowledge && chatbotKnowledge.farewells) {
        return chatbotKnowledge.farewells[
          Math.floor(Math.random() * chatbotKnowledge.farewells.length)
        ];
      }
      return 'Goodbye! Have a great day!';
    }

    // Check against QA mapping
    if (qaMapping && qaMapping.length) {
      for (const item of qaMapping) {
        const match = item.keywords.some((keyword) =>
          lowerMessage.includes(keyword)
        );
        if (match) {
          return item.answer;
        }
      }
    }

    // Default response
    if (chatbotKnowledge && chatbotKnowledge.unknownResponses) {
      return chatbotKnowledge.unknownResponses[
        Math.floor(Math.random() * chatbotKnowledge.unknownResponses.length)
      ];
    }
    return "I'm not sure about that. Ask me about Taskin's skills, projects, or experience!";
  };

  // Handle sending message
  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(
      () => {
        const botResponse = getBotResponse(userMessage.text);
        const botMessage = {
          text: botResponse,
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      },
      500 + Math.random() * 500
    );
  };

  // Handle enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear chat history
  const clearChat = () => {
    if (chatbotKnowledge && chatbotKnowledge.greetings) {
      const welcomeMessage =
        chatbotKnowledge.greetings[
          Math.floor(Math.random() * chatbotKnowledge.greetings.length)
        ];
      setMessages([
        { text: welcomeMessage, sender: 'bot', timestamp: new Date() },
      ]);
    } else {
      setMessages([
        {
          text: "Hello! I'm T-Robo. How can I help you?",
          sender: 'bot',
          timestamp: new Date(),
        },
      ]);
    }
  };

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <FaRobot size={28} />
              </motion.div>
            </div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-blue-500"
            />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full animate-pulse shadow-lg" />
          </div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed bottom-6 right-6 z-50 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 backdrop-blur-sm ${
              isMinimized ? 'w-80 h-14' : 'w-[90vw] md:w-[420px] h-[600px]'
            }`}
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 px-5 py-4">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_white_1px,_transparent_1px)] [background-size:20px_20px]" />
              </div>

              <div className="relative flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                      <FaRobot className="text-white" size={20} />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base">
                      T-Robo Assistant
                    </h3>
                    <p className="text-white/80 text-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Online • Knows everything
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-all"
                  >
                    {isMinimized ? (
                      <FaWindowMaximize size={14} />
                    ) : (
                      <FaWindowMinimize size={14} />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-all"
                  >
                    <FaTimes size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{
                        opacity: 0,
                        x: msg.sender === 'user' ? 30 : -30,
                      }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        >
                          {msg.sender === 'user' ? (
                            <FaRegSmile size={12} className="text-white" />
                          ) : (
                            <FaRobot
                              size={12}
                              className="text-gray-700 dark:text-gray-300"
                            />
                          )}
                        </div>
                        <div
                          className={`rounded-2xl px-4 py-2.5 shadow-md ${
                            msg.sender === 'user'
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                              : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {msg.text}
                          </p>
                          <p
                            className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-white/60' : 'text-gray-400'}`}
                          >
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                          <FaRobot
                            size={12}
                            className="text-gray-700 dark:text-gray-300"
                          />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 shadow-md border border-gray-200 dark:border-gray-700">
                          <div className="flex gap-1.5">
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: 0,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: 0.15,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                            <motion.span
                              animate={{ y: [0, -5, 0] }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: 0.3,
                              }}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button
                      onClick={() => {
                        setInputValue("Tell me about Tanjim's Pathshala");
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-full hover:shadow-md transition-all"
                    >
                      🎯 Tanjim's Pathshala
                    </button>
                    <button
                      onClick={() => {
                        setInputValue('What skills do you have?');
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-full hover:shadow-md transition-all"
                    >
                      💻 Skills
                    </button>
                    <button
                      onClick={() => {
                        setInputValue('What projects have you built?');
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-full hover:shadow-md transition-all"
                    >
                      🚀 Projects
                    </button>
                    <button
                      onClick={() => {
                        setInputValue('How can I contact you?');
                        setTimeout(() => sendMessage(), 100);
                      }}
                      className="text-xs px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 rounded-full hover:shadow-md transition-all"
                    >
                      📧 Contact
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask me anything about Taskin..."
                        className="w-full px-4 py-2.5 pr-10 border border-gray-300 dark:border-gray-600 rounded-xl resize-none bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        rows="1"
                        style={{ minHeight: '42px' }}
                      />
                      <FaRegCommentDots className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendMessage}
                      disabled={!inputValue.trim()}
                      className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaPaperPlane size={16} />
                    </motion.button>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearChat}
                      className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1.5"
                    >
                      <FaTrash size={10} />
                      Clear conversation
                    </motion.button>

                    <div className="flex items-center gap-1.5">
                      <FaRegLightbulb size={10} className="text-yellow-500" />
                      <p className="text-xs text-gray-400">
                        Powered by Taskin's knowledge
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TRobo;

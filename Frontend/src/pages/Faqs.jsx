// Frontend/src/pages/FAQ.jsx - Mobile-first, minimal scroll FAQ page

import { useState } from 'react'
import {
  ExpandMore,
  HelpOutline,
  Search,
  CloudUpload,
  Download,
  Person,
  Security
} from '@mui/icons-material'

function FAQ() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedItems, setExpandedItems] = useState(new Set([0])) // First item expanded by default

  // FAQ Data organized by categories
  const faqCategories = [
    {
      title: "Getting Started",
      icon: <Person className="text-cyan-400" />,
      color: "cyan",
      questions: [
        {
          question: "How do I create an account on Pariksha?",
          answer: "Simply click 'Register' in the top navigation, fill in your details including name, email, roll number, class, and semester. Your account will be created instantly and you can start browsing papers immediately."
        },
        {
          question: "Is Pariksha free to use?",
          answer: "Yes! Pariksha is completely free for all students. You can browse, download, and upload papers without any charges."
        },
        {
          question: "What types of papers can I find on Pariksha?",
          answer: "You can find various exam papers including midterms, finals, quizzes, and assignments across different subjects, classes, and semesters."
        }
      ]
    },
    {
      title: "Uploading Papers",
      icon: <CloudUpload className="text-green-400" />,
      color: "green",
      questions: [
        {
          question: "How do I upload a paper?",
          answer: "Navigate to the 'Upload' section, fill in the paper details (title, subject, class, semester, exam type), select your PDF file, and click submit. Your paper will be reviewed by admin before going live."
        },
        {
          question: "What file formats are supported?",
          answer: "Currently, we only support PDF files. Make sure your file is clear, readable, and under 10MB in size."
        },
        {
          question: "How long does it take for papers to get approved?",
          answer: "Our admin team typically reviews and approves papers within 24-48 hours. You'll see the status change from 'Pending' to 'Approved' in your dashboard."
        },
        {
          question: "Can I edit or delete my uploaded papers?",
          answer: "You can view your uploaded papers in your dashboard. Contact admin if you need any changes to approved papers. You can delete pending or rejected papers yourself."
        }
      ]
    },
    {
      title: "Downloading Papers",
      icon: <Download className="text-blue-400" />,
      color: "blue",
      questions: [
        {
          question: "How do I download papers?",
          answer: "Browse papers on the 'Papers' page, click on any paper to view details, then click the 'Download' button. The PDF will be saved to your device with a clean filename."
        },
        {
          question: "Do I need to be logged in to download papers?",
          answer: "Yes, you need to create a free account and log in to download papers. This helps us maintain quality and track helpful resources."
        },
        {
          question: "Can I download papers on mobile?",
          answer: "Absolutely! Pariksha is fully optimized for mobile devices. You can browse and download papers seamlessly on your phone or tablet."
        }
      ]
    },
    {
      title: "Account & Technical",
      icon: <Security className="text-purple-400" />,
      color: "purple",
      questions: [
        {
          question: "Is my data secure on Pariksha?",
          answer: "Yes, we use industry-standard encryption and secure cloud storage. Your personal information is never shared with third parties. Check our Privacy Policy for more details."
        },
        {
          question: "Why is a paper not downloading?",
          answer: "Try refreshing the page and clicking download again. If the issue persists, the paper might be temporarily unavailable. Contact us if you continue experiencing problems."
        }
      ]
    }
  ]

  // Filter FAQs based on search term
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      qa => 
        qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qa.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  // Toggle expanded state for questions
  const toggleExpanded = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(key)) {
      newExpanded.delete(key)
    } else {
      newExpanded.add(key)
    }
    setExpandedItems(newExpanded)
  }

  // Get color classes for categories
  const getColorClasses = (color) => {
    const colors = {
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400' },
      green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' }
    }
    return colors[color] || colors.cyan
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 sm:py-8">
      <div className="container-custom px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
            <HelpOutline className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Find quick answers to common questions about using Pariksha
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" fontSize="small" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <HelpOutline className="text-slate-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-slate-400 mb-2">No FAQs found</h3>
              <p className="text-slate-500 text-sm">
                Try adjusting your search term or browse the categories below
              </p>
            </div>
          ) : (
            filteredCategories.map((category, categoryIndex) => {
              const colorClasses = getColorClasses(category.color)
              
              return (
                <div key={categoryIndex} className={`card glass-strong border ${colorClasses.border}`}>
                  {/* Category Header */}
                  <div className="p-4 sm:p-6 border-b border-slate-700/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center`}>
                        {category.icon}
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-white">{category.title}</h2>
                    </div>
                  </div>

                  {/* Questions */}
                  <div className="divide-y divide-slate-700/30">
                    {category.questions.map((qa, questionIndex) => {
                      const key = `${categoryIndex}-${questionIndex}`
                      const isExpanded = expandedItems.has(key)

                      return (
                        <div key={questionIndex} className="transition-all duration-300">
                          {/* Question Header */}
                          <button
                            onClick={() => toggleExpanded(categoryIndex, questionIndex)}
                            className="w-full p-4 sm:p-6 text-left hover:bg-slate-800/30 transition-colors duration-300 flex items-center justify-between"
                          >
                            <h3 className="text-sm sm:text-base font-semibold text-white pr-4 leading-relaxed">
                              {qa.question}
                            </h3>
                            <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                              <ExpandMore className={colorClasses.text} />
                            </div>
                          </button>

                          {/* Answer */}
                          <div className={`overflow-hidden transition-all ease-in-out duration-500 ${
                            isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                          }`}>
                            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                                {qa.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Contact Section */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="card glass-strong p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Still have questions?</h3>
            <p className="text-slate-300 mb-4">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:nitinemailss@gmail.com"
                className="btn-md bg-gradient-to-br from-cyan-600 to-blue-700 text-slate-300 hover:scale-105 hover:text-white transition-all duration-300"
              >
                Email Us
              </a>
            </div><div className='mt-2 p-2'>Or</div>
            <div className=''> Connect Us on Our Socials Below</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ

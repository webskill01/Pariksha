// Frontend/src/pages/Terms.jsx - Mobile-first, comprehensive terms page

import React from 'react'
import { Link } from 'react-router-dom'
import {
  Gavel,
  AccountBox,
  CloudUpload,
  Security,
  Copyright,
  Warning,
  ContactSupport,
  Update
} from '@mui/icons-material'

function Terms() {
  // Current date for terms effective date
  const effectiveDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 sm:py-8">
      <div className="container-custom px-4 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6">
            <Gavel className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-3">
            Terms & Conditions
          </h1>
          <p className="text-slate-400 mb-2">
            Please read these terms carefully before using Pariksha
          </p>
          <p className="text-sm text-slate-500">
            Effective Date: {effectiveDate}
          </p>
        </div>

        {/* Quick Summary Card */}
        <div className="card glass-strong p-6 mb-8 border-l-4 ">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center">
            <Warning className="text-cyan-400 mr-2" />
            Quick Summary
          </h2>
          <p className="text-slate-300 leading-relaxed">
            By using Pariksha, you agree to follow our community guidelines, respect intellectual property, 
            use the platform responsibly, and understand that we provide the service "as-is". 
            We reserve the right to moderate content and suspend accounts for violations.
          </p>
        </div>

        {/* Terms Grid - Mobile Optimized */}
        <div className="space-y-6">
          
          {/* 1. Introduction & Acceptance */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <AccountBox className="text-cyan-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">1. Acceptance of Terms</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <p>
                Welcome to Pariksha! By accessing or using our platform, you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our service.
              </p>
              <p>
                Pariksha is an educational platform designed to help students access and share exam papers and study materials. 
                These terms govern your use of our website, mobile applications, and related services.
              </p>
            </div>
          </div>

          {/* 2. User Accounts & Registration */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <AccountBox className="text-green-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">2. User Accounts</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Registration Requirements:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>You must provide accurate and complete information</li>
                  <li>You must be a student or educator to use our platform</li>
                  <li>One account per person - multiple accounts are prohibited</li>
                  <li>You are responsible for maintaining account security</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Account Responsibilities:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Keep your login credentials confidential</li>
                  <li>Notify us immediately of unauthorized account access</li>
                  <li>You are liable for all activities under your account</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Content Upload & Usage */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <CloudUpload className="text-blue-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">3. Content & Uploads</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Permitted Content:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Past exam papers, question papers, and study materials</li>
                  <li>Educational resources that benefit the student community</li>
                  <li>Content you own or have permission to share</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Prohibited Content:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Copyrighted material without proper authorization</li>
                  <li>Current/ongoing exam papers or answer keys</li>
                  <li>Inappropriate, offensive, or harmful content</li>
                  <li>Commercial or promotional materials</li>
                  <li>Personal information of others without consent</li>
                </ul>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-4">
                <p className="text-yellow-400 text-sm">
                  <strong>Content Review:</strong> All uploaded content is subject to admin review before publication. 
                  We reserve the right to reject or remove any content that violates these terms.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Intellectual Property */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Copyright className="text-purple-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">4. Intellectual Property</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Platform Rights:</h3>
                <p className="text-sm">
                  Pariksha owns all rights to the platform, including the website design, code, logos, 
                  and any original content we create. Users may not copy, modify, or distribute our platform assets.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">User Content License:</h3>
                <p className="text-sm">
                  By uploading content, you grant Pariksha a non-exclusive license to host, display, and distribute 
                  your content on our platform. You retain ownership of your uploaded materials.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Copyright Infringement:</h3>
                <p className="text-sm">
                  We respect intellectual property rights. If you believe content infringes your copyright, 
                  please contact us immediately with detailed information for prompt removal.
                </p>
              </div>
            </div>
          </div>

          {/* 5. User Conduct */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <Security className="text-red-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">5. User Conduct</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Acceptable Use:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Use Pariksha for educational purposes only</li>
                  <li>Respect other users and maintain a positive community</li>
                  <li>Follow all applicable laws and regulations</li>
                  <li>Provide constructive feedback and reports</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Prohibited Activities:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Attempting to hack, compromise, or disrupt our systems</li>
                  <li>Creating fake accounts or impersonating others</li>
                  <li>Spamming, harassment, or abusive behavior</li>
                  <li>Commercial use without explicit permission</li>
                  <li>Sharing login credentials or account access</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 6. Termination */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Warning className="text-orange-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">6. Account Termination</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Termination by You:</h3>
                <p className="text-sm">
                  You may delete your account at any time through your dashboard settings. 
                  Your uploaded content may remain available to other users unless specifically requested for removal.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Termination by Us:</h3>
                <p className="text-sm">
                  We reserve the right to suspend or terminate accounts that violate these terms, 
                  engage in prohibited activities, or negatively impact the community. 
                  Termination may be temporary or permanent at our discretion.
                </p>
              </div>
            </div>
          </div>

          {/* 7. Disclaimers & Limitations */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Warning className="text-yellow-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">7. Disclaimers & Limitations</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-2">"As-Is" Service:</h3>
                <p className="text-sm">
                  Pariksha is provided "as-is" without warranties of any kind. We do not guarantee 
                  continuous availability, accuracy of content, or fitness for any particular purpose.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Limitation of Liability:</h3>
                <p className="text-sm">
                  To the maximum extent permitted by law, Pariksha shall not be liable for any indirect, 
                  incidental, or consequential damages arising from your use of our platform.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Content Accuracy:</h3>
                <p className="text-sm">
                  We do not verify the accuracy of user-uploaded content. Users should verify 
                  information independently and use materials at their own discretion.
                </p>
              </div>
            </div>
          </div>

          {/* 8. Privacy & Data */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <Security className="text-indigo-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">8. Privacy & Data Protection</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <p className="text-sm">
                Your privacy is important to us. Our collection, use, and protection of your personal information 
                is governed by our <Link to="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</Link>, 
                which is incorporated into these terms by reference.
              </p>
              <p className="text-sm">
                By using Pariksha, you consent to our data practices as described in the Privacy Policy.
              </p>
            </div>
          </div>

          {/* 9. Changes to Terms */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                  <Update className="text-teal-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">9. Changes to Terms</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <p className="text-sm">
                We may modify these terms from time to time. When we make changes, we will update the 
                "Effective Date" at the top of this page and notify users through our platform or email.
              </p>
              <p className="text-sm">
                Continued use of Pariksha after changes constitute acceptance of the modified terms. 
                If you disagree with changes, you should discontinue using our service.
              </p>
            </div>
          </div>

          {/* 10. Governing Law & Contact */}
          <div className="card glass-strong">
            <div className="p-4 sm:p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-slate-500/20 rounded-lg flex items-center justify-center">
                  <ContactSupport className="text-slate-400" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">10. Governing Law & Contact</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 text-slate-300">
              <div>
                <h3 className="text-white font-semibold mb-2">Governing Law:</h3>
                <p className="text-sm">
                  These terms are governed by the laws of India. Any disputes will be resolved 
                  in the courts of Mumbai, India.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Contact Information:</h3>
                <p className="text-sm">
                  Questions about these terms? Contact us at:
                </p>
                <div className="mt-2 text-sm">
                  <p>Email: <span className="text-cyan-400">nitinemailss@gmail.com</span></p>
                  <p>Contact: <span className="text-cyan-400">Through Socials Below</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agreement Notice */}
        <div className="mt-12 card glass-strong p-6 text-center border-2 border-cyan-500/30">
          <h3 className="text-xl font-bold text-white mb-3">Agreement Acknowledgment</h3>
          <p className="text-slate-300 mb-4">
            By using Pariksha, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/faq"
              className="btn-md bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white transition-all duration-300"
            >
              Read FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms

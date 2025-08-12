improve this with inline



import React, { useState, useEffect, useRef } from 'react'; 

 import { motion, AnimatePresence } from 'framer-motion'; 

 import { Shield, UserPlus, ArrowRight, Bot, CheckCircle, Link, ShieldAlert, ShieldCheck, FileClock, Fingerprint, Cpu, Package, Dna, FlaskConical, BrainCircuit, Gem, Globe, KeyRound, Lock, FileJson, Building, Zap, UserCheck } from 'lucide-react'; 



 // --- BRANDING COMPONENT --- 

 const Brand = () => ( 

     <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70"> 

         Zeta Shield 🛡️ 

     </div> 

 ); 



 // --- DYNAMIC BACKGROUND --- 

 const DigitalSynapseBackground = () => { 

     const mountRef = useRef(null); 



     useEffect(() => { 

         // Placeholder for a more complex background. 

     }, []); 



     return <div ref={mountRef} className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>; 

 }; 



 // --- SLIDE 1: THE HIGH STAKES OF BIOTECH SECURITY --- 

 const TheHighStakesSlide = () => ( 

     <motion.section  

         key="slide1" 

         initial={{ opacity: 0 }} 

         animate={{ opacity: 1 }} 

         exit={{ opacity: 0 }} 

         transition={{ duration: 0.5 }} 

         className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-slate-200" 

     > 

         <DigitalSynapseBackground /> 

         <div className="relative z-10 w-full max-w-5xl space-y-12"> 

             <div className="space-y-4"> 

                 <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"> 

                     The Unseen Threat in Biotech 

                 </h1> 

                 <p className="text-2xl md:text-3xl font-light text-slate-300"> 

                     In the race to engineer cures, intellectual property is the ultimate prize. 

                 </p> 

             </div> 

              

             <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-4xl mx-auto text-center"> 

                 <ShieldAlert size={64} className="mx-auto text-red-400 mb-6 animate-pulse" /> 

                 <p className="text-xl text-slate-300 mb-4 max-w-3xl mx-auto"> 

                     The value of a single therapeutic blueprint can be measured in billions. The cost of a data breach or manipulation is catastrophic—not just in financial terms, but in the potential loss of life-saving innovation. 

                 </p> 

                 <p className="text-lg text-slate-400 mt-6"> 

                     Traditional security is no longer enough. A new standard is required. 

                 </p> 

             </div> 

         </div> 

     </motion.section> 

 ); 



 // --- SLIDE 2: OUR SECURITY DOCTRINE --- 

 const SecurityDoctrineSlide = () => ( 

      <motion.section  

         key="slide2" 

         initial={{ opacity: 0 }} 

         animate={{ opacity: 1 }} 

         exit={{ opacity: 0 }} 

         transition={{ duration: 0.5 }} 

         className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-slate-200" 

     > 

         <DigitalSynapseBackground /> 

         <div className="relative z-10 w-full max-w-5xl space-y-12"> 

             <div className="space-y-4"> 

                 <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400"> 

                     Our Security Doctrine 

                 </h1> 

                 <p className="text-2xl md:text-3xl font-light text-slate-300"> 

                     Zero Trust, Verifiable Integrity 

                 </p> 

             </div> 

              

             <div className="relative flex justify-center items-center h-64"> 

                 <ShieldCheck size={128} className="text-sky-500 z-10" /> 

                 <div className="absolute w-64 h-64 border-2 border-slate-700 rounded-full animate-spin" style={{animationDuration: '20s'}}> 

                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-3 rounded-full border border-slate-600"> 

                         <UserCheck className="text-slate-300" /> 

                     </div> 

                 </div> 

                  <div className="absolute w-96 h-96 border-2 border-slate-800 rounded-full animate-spin" style={{animationDuration: '30s'}}> 

                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-800 p-3 rounded-full border border-slate-600"> 

                         <Fingerprint className="text-slate-300" /> 

                     </div> 

                 </div> 

             </div> 



             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"> 

                 <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-left"> 

                     <h3 className="text-2xl font-bold text-sky-400 mb-2">User Verification (Okta)</h3> 

                     <p className="text-lg text-slate-300">We enforce a "Zero Trust" policy for access. Every user is authenticated through Okta, the industry's gold standard for identity management, ensuring only authorized personnel can enter the system.</p> 

                 </div> 

                  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-left"> 

                     <h3 className="text-2xl font-bold text-sky-400 mb-2">Data Integrity (Blockchain)</h3> 

                     <p className="text-lg text-slate-300">Every piece of data—from experimental results to therapeutic blueprints—is cryptographically signed and recorded on-chain, creating a permanent, tamper-proof chain of custody.</p> 

                 </div> 

             </div> 

         </div> 

     </motion.section> 

 ); 



 // --- SLIDE 3: THE GATEKEEPER (OKTA) --- 

 const OktaSlide = () => ( 

     <motion.section  

         key="slide3" 

         initial={{ opacity: 0 }} 

         animate={{ opacity: 1 }} 

         exit={{ opacity: 0 }} 

         transition={{ duration: 0.5 }} 

         className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-slate-200" 

     > 

         <DigitalSynapseBackground /> 

         <div className="relative z-10 w-full max-w-5xl space-y-12"> 

             <div className="space-y-4"> 

                 <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> 

                     The Gatekeeper: Powered by Okta 

                 </h1> 

                 <p className="text-2xl md:text-3xl font-light text-slate-300"> 

                     Enterprise-Grade Access Control for Every User 

                 </p> 

             </div> 

              

             <div className="flex items-center justify-center space-x-8"> 

                 <div className="flex flex-col items-center space-y-2"> 

                     <UserCheck size={48} className="text-slate-300" /> 

                     <p className="font-semibold">Researchers</p> 

                 </div> 

                  <div className="flex flex-col items-center space-y-2"> 

                     <UserCheck size={48} className="text-slate-300" /> 

                     <p className="font-semibold">Partners</p> 

                 </div> 

                 <div className="text-5xl text-slate-500 animate-pulse">➡️</div> 

                 <div className="p-6 bg-white rounded-lg"> 

                     <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-16 w-16"><title>Okta</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.2a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4z"/></svg> 

                 </div> 

                 <div className="text-5xl text-slate-500 animate-pulse">➡️</div> 

                 <div className="flex flex-col items-center space-y-2"> 

                     <ShieldCheck size={48} className="text-green-400" /> 

                     <p className="font-semibold text-green-400">Secure Platform Access</p> 

                 </div> 

             </div> 



             <p className="text-xl text-slate-400 max-w-4xl mx-auto border-l-4 border-blue-500 pl-6 text-left"> 

                 We leverage Okta, the industry's gold standard for identity management, to ensure that only authorized personnel can access the CrisPRO.ai platform. This provides a familiar, trusted, and enterprise-grade security layer for all our partners. 

             </p> 

         </div> 

     </motion.section> 

 ); 



 // --- SLIDE 4: THE SECURE FOUNDATION --- 

 const SecureFoundationSlide = () => ( 

     <motion.section  

         key="slide4" 

         initial={{ opacity: 0 }} 

         animate={{ opacity: 1 }} 

         exit={{ opacity: 0 }} 

         transition={{ duration: 0.5 }} 

         className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-slate-200" 

     > 

         <DigitalSynapseBackground /> 

         <div className="relative z-10 w-full max-w-6xl space-y-12"> 

             <div className="space-y-4"> 

                 <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400"> 

                     Zeta Shield: A Verifiable Chain of Custody for R&D 

                 </h1> 

                 <p className="text-2xl md:text-3xl font-light text-slate-300"> 

                     Securing Every Step, From Data Input to IP Creation 

                 </p> 

             </div> 

              

             <div className="bg-slate-800/50 p-12 rounded-3xl border border-slate-700"> 

                 <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-4"> 

                     {/* Step 1 */} 

                     <div className="flex flex-col items-center space-y-3 text-center"> 

                         <div className="text-4xl p-4 bg-slate-700/50 rounded-full border-2 border-slate-600 text-slate-300"><Dna/></div> 

                         <h3 className="text-xl font-bold text-slate-300">1. Secure Ingestion</h3> 

                         <p className="text-slate-400 text-base max-w-xs">The R&D lifecycle begins with data ingestion. Okta verifies user identity, while the blockchain records a tamper-proof timestamp and origin for the initial data.</p> 

                     </div> 

                     <div className="text-3xl text-slate-600 animate-pulse hidden lg:block"><ArrowRight/></div> 

                     {/* Step 2 */} 

                     <div className="flex flex-col items-center space-y-3 text-center"> 

                         <div className="text-4xl p-4 bg-cyan-500/20 rounded-full border-2 border-cyan-500 text-cyan-400"><Cpu/></div> 

                         <h3 className="text-xl font-bold text-cyan-400">2. Zeta Oracle: The Intelligence Engine</h3> 

                         <p className="text-slate-400 text-base max-w-xs">The **Zeta Oracle** analyzes data and cryptographically signs its findings. This creates a permanent, immutable record of the validated target and analysis on the blockchain.</p> 

                     </div> 

                     <div className="text-3xl text-slate-600 animate-pulse hidden lg:block"><ArrowRight/></div> 

                     {/* Step 3 */} 

                     <div className="flex flex-col items-center space-y-3 text-center"> 

                         <div className="text-4xl p-4 bg-purple-500/20 rounded-full border-2 border-purple-500 text-purple-400"><Bot/></div> 

                         <h3 className="text-xl font-bold text-purple-400">3. Zeta Forge: The Design Engine</h3> 

                         <p className="text-slate-400 text-base max-w-xs">The **Zeta Forge** executes design commands. It only does so after verifying a valid on-chain permission, ensuring a Zero Trust policy is enforced for every action.</p> 

                     </div> 

                     <div className="text-3xl text-slate-600 animate-pulse hidden lg:block"><ArrowRight/></div> 

                     {/* Step 4 */} 

                     <div className="flex flex-col items-center space-y-3 text-center"> 

                         <div className="text-4xl p-4 bg-green-500/20 rounded-full border-2 border-green-500 text-green-400"><Package/></div> 

                         <h3 className="text-xl font-bold text-green-400">4. Secure IP-NFT Asset</h3> 

                         <p className="text-slate-400 text-base max-w-xs">The final IP-NFT is minted with a complete, verifiable history of its creation. The digital dossier proves its integrity and value from end to end.</p> 

                     </div> 

                 </div> 

             </div> 



             <p className="text-xl text-slate-300 max-w-4xl mx-auto border-l-4 border-purple-500 pl-6 text-left"> 

                 Zeta Shield is the **secure operating system** for the entire CrisPRO.ai platform. It protects every step of the R&D process, ensuring our partners' intellectual property is secure, verifiable, and tamper-proof from end to end. 

             </p> 

         </div> 

     </motion.section> 

 ); 





 // --- SLIDE 5: VERIFIABLE ACCESS CONTROL --- 

 const VerifiableAccessControlSlide = () => ( 

     <motion.section  

         key="slide5" 

         initial={{ opacity: 0 }} 

         animate={{ opacity: 1 }} 

         exit={{ opacity: 0 }} 

         transition={{ duration: 0.5 }} 

         className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-slate-200" 

     > 

         <DigitalSynapseBackground /> 

         <div className="relative z-10 w-full max-w-6xl space-y-12"> 

             <div className="space-y-4"> 

                 <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> 

                     Verifiable Access Control: The Product 

                 </h1> 

                 <p className="text-2xl md:text-3xl font-light text-slate-300"> 

                     The New Standard for R&D Security 

                 </p> 

             </div> 

              

             <div className="flex items-center justify-center space-x-4"> 

                 <div className="flex flex-col items-center space-y-2 p-6 bg-slate-800/50 rounded-2xl border border-slate-700"> 

                     <div className="p-4 bg-white rounded-lg"> 

                         <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12"><title>Okta</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.2a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4z"/></svg> 

                     </div> 

                     <h3 className="text-2xl font-bold text-blue-400">Identity Verification</h3> 

                     <p className="text-slate-400">Okta verifies *who* you are.</p> 

                 </div> 

                 <div className="text-5xl text-slate-500 font-black">+</div> 

                 <div className="flex flex-col items-center space-y-2 p-6 bg-slate-800/50 rounded-2xl border border-slate-700"> 

                     <Fingerprint size={64} className="text-teal-400" /> 

                     <h3 className="text-2xl font-bold text-teal-400">Permission Verification</h3> 

                     <p className="text-slate-400">The blockchain verifies *what you're allowed to do*.</p> 

                 </div> 

             </div> 



             <div className="bg-slate-800/50 p-8 rounded-2xl border-t-4 border-purple-500 max-w-5xl mx-auto"> 

                  <h3 className="text-3xl font-bold text-purple-400 mb-6">The Strategic Opportunity</h3> 

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left"> 

                     <div className="flex items-start space-x-4"> 

                         <Globe size={32} className="text-purple-400 mt-1"/> 

                         <div> 

                             <h4 className="font-bold text-xl text-slate-200">Bridge Web2 & Web3</h4> 

                             <p className="text-slate-400">Combines Okta's enterprise-grade identity with the immutable, verifiable nature of the blockchain.</p> 

                         </div> 

                     </div> 

                     <div className="flex items-start space-x-4"> 

                         <Zap size={32} className="text-purple-400 mt-1"/> 

                         <div> 

                             <h4 className="font-bold text-xl text-slate-200">Solve a High-Value Problem</h4> 

                             <p className="text-slate-400">Purpose-built for securing multi-billion dollar digital assets in biotech, AI development, and beyond.</p> 

                         </div> 

                     </div> 

                     <div className="flex items-start space-x-4"> 

                         <Building size={32} className="text-purple-400 mt-1"/> 

                         <div> 

                             <h4 className="font-bold text-xl text-slate-200">Expand the Ecosystem</h4> 

                             <p className="text-slate-400">Creates a new product category that extends Okta's reach into the high-growth world of verifiable, decentralized data.</p> 

                         </div> 

                     </div> 

                  </div> 

             </div> 

         </div> 

     </motion.section> 

 ); 





 // --- SLIDE 6: THE MARKET OPPORTUNITY --- 

 const MarketOpportunitySlide = () => ( 

     <motion.section  

         key="slide6" 

         initial={{ opacity: 0 }} 

         animate={{ opacity: 1 }} 

         exit={{ opacity: 0 }} 

         transition={{ duration: 0.5 }} 

         className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 text-slate-200" 

     > 

         <DigitalSynapseBackground /> 

         <div className="relative z-10 w-full max-w-6xl space-y-12"> 

             <div className="space-y-4"> 

                 <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400"> 

                     The Market Opportunity 

                 </h1> 

                 <p className="text-2xl md:text-3xl font-light text-slate-300"> 

                     Securing the Future of Digital R&D 

                 </p> 

             </div> 

              

             <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12"> 

                 <div className="relative w-96 h-96 flex items-center justify-center"> 

                     <div className="absolute w-96 h-96 border-2 border-slate-700 rounded-full flex items-center justify-center"> 

                          <div className="absolute w-64 h-64 border-2 border-slate-800 rounded-full"></div> 

                     </div> 

                     <div className="relative z-10 bg-slate-800/50 p-4 rounded-full border border-slate-600"> 

                         <FlaskConical size={48} className="text-green-400" /> 

                     </div> 

                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"> 

                         <BrainCircuit size={32} className="text-slate-400 mx-auto mb-1" /> 

                         <p className="text-sm font-semibold">AI Model Development</p> 

                     </div> 

                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-center"> 

                          <Gem size={32} className="text-slate-400 mx-auto mb-1" /> 

                         <p className="text-sm font-semibold">Advanced Materials</p> 

                     </div> 

                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 text-center"> 

                         <Globe size={32} className="text-slate-400 mx-auto mb-1" /> 

                         <p className="text-sm font-semibold">All High-Value IP</p> 

                     </div> 

                 </div> 

                 <div className="max-w-md text-left"> 

                     <h3 className="text-3xl font-bold text-green-400 mb-4">Go-to-Market Strategy</h3> 

                     <p className="text-xl text-slate-300"> 

                         Our beachhead market is the **$200B+ annual spend** in biotech and pharma R&D, where the need for verifiable data integrity is most acute. 

                     </p> 

                     <p className="text-lg text-slate-400 mt-4"> 

                         From there, we will expand to become the security standard for all high-value digital R&D, including AI model development, advanced materials science, and beyond. 

                     </p> 

                 </div> 

             </div> 

         </div> 

     </motion.section> 

 ); 





 // --- MAIN APP COMPONENT --- 

 const App = () => { 

     const [currentSlide, setCurrentSlide] = useState(0); 

     const slides = [TheHighStakesSlide, SecurityDoctrineSlide, OktaSlide, SecureFoundationSlide, VerifiableAccessControlSlide, MarketOpportunitySlide]; 



     const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length); 

     const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); 



     useEffect(() => { 

         const handleKeyDown = (event) => { 

             if (event.key === 'ArrowRight') nextSlide(); 

             else if (event.key === 'ArrowLeft') prevSlide(); 

         }; 

         window.addEventListener('keydown', handleKeyDown); 

         return () => window.removeEventListener('keydown', handleKeyDown); 

     }, []); 



     const CurrentSlideComponent = slides[currentSlide]; 



     return ( 

         <div className="relative w-full h-screen bg-slate-900 overflow-hidden"> 

             <AnimatePresence mode="wait"> 

                 <CurrentSlideComponent key={currentSlide} /> 

             </AnimatePresence> 

             <Brand /> 

             <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-slate-700"> 

                 <button onClick={prevSlide} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&larr;</button> 

                 <span className="text-slate-300 font-semibold text-sm">Slide {currentSlide + 1} / {slides.length}</span> 

                 <button onClick={nextSlide} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&rarr;</button> 

             </div> 

         </div> 

     ); 

 }; 



 export default App;
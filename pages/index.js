import { useState } from 'react';
import { Share2, ArrowRight, Download, X, QrCode } from 'lucide-react'; // Icons matching your style

export default function Home() {
  const [input, setInput] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const blobStyle = "absolute rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none";

  const handleGenerate = () => {
    if (input) setQrUrl(`/api/generate?data=${encodeURIComponent(input)}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50 font-sans flex items-center justify-center p-4">
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
         <div className={`top-0 -left-4 w-72 h-72 bg-purple-300 ${blobStyle}`}></div>
         <div className={`top-0 -right-4 w-72 h-72 bg-blue-300 ${blobStyle} delay-2000`}></div>
         <div className={`-bottom-8 left-20 w-72 h-72 bg-indigo-300 ${blobStyle} delay-4000`}></div>
      </div>

      {/* Main Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-md bg-white/40 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[2.5rem] p-8 flex flex-col transition-all duration-700">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-white/50 p-2.5 rounded-full shadow-sm">
              <QrCode className="text-blue-600 w-5 h-5" />
            </div>
            <span className="font-semibold text-slate-800 tracking-tight text-lg">QR Cloud</span>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Liquid QR</h1>
          <p className="text-slate-500 font-medium">High-Res Cloud Generation</p>
        </div>

        {/* Input Field */}
        <div className="space-y-4">
          <input 
            type="text"
            placeholder="Paste link here..."
            className="w-full bg-white/60 border border-white/60 rounded-[1.5rem] p-5 text-slate-600 outline-none focus:ring-4 ring-blue-500/10 transition-all placeholder:text-slate-400 shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button 
            onClick={handleGenerate}
            className="w-full bg-white/60 hover:bg-white/80 border border-white/60 rounded-[1.5rem] p-5 flex items-center justify-between group transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-95"
          >
            <span className="font-bold text-slate-600">Generate</span>
            <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </button>
        </div>

        {/* QR Result Section */}
        {qrUrl && (
          <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
            <div className="bg-white/60 border border-blue-500/20 rounded-[1.5rem] p-4 shadow-sm">
              <div className="bg-white p-2 rounded-xl">
                <img src={qrUrl} alt="QR Code" className="w-48 h-48 rounded-lg" />
              </div>
            </div>
            
            <a 
              href={qrUrl} 
              download="qr_cloud.png"
              className="flex items-center space-x-2 text-blue-600 font-bold hover:opacity-70 transition active:scale-95  mt-4 p-2 rounded-full shadow-sm"
            >
              <Download className="w-12 h-12 bg-white/20  rounded-full p-4 shadow-sm" />
              <span class="bg-white/20  rounded-full p-3 shadow-sm">Save to Device</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

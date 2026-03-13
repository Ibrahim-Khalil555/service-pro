import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-slate-50 border-b border-slate-100 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-6xl">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            Have questions about our services or need assistance? Our team is here 
            to provide world-class support.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h3 className="text-2xl font-black text-slate-900">Contact Information</h3>
                <p className="mt-3 text-slate-500 font-medium">Reach out via any of these channels.</p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: 'Email Us', value: 'hello@servicepro.com', color: 'bg-blue-50 text-blue-600' },
                  { icon: Phone, label: 'Call Us', value: '+1 (555) 000-0000', color: 'bg-green-50 text-green-600' },
                  { icon: MapPin, label: 'Visit Us', value: '123 Service St, Tech City, ST 12345', color: 'bg-purple-50 text-purple-600' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md">
                    <div className={`h-12 w-12 flex items-center justify-center rounded-xl ${item.color}`}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-slate-400">{item.label}</p>
                      <p className="font-bold text-slate-900 mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-200 space-y-4">
                <MessageSquare className="h-8 w-8 text-blue-100" />
                <h4 className="text-xl font-black">24/7 Support Available</h4>
                <p className="text-blue-100/80 text-sm leading-relaxed">Our dedicated support team is available around the clock to help you with your booking needs.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-100 shadow-2xl shadow-blue-900/5">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll get back to you soon."); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-slate-200 px-5 py-4 text-sm font-medium focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full rounded-xl border border-slate-200 px-5 py-4 text-sm font-medium focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                    <input 
                      type="text" 
                      required
                      placeholder="How can we help?"
                      className="w-full rounded-xl border border-slate-200 px-5 py-4 text-sm font-medium focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                    <textarea 
                      required
                      rows={6}
                      placeholder="Tell us what you need..."
                      className="w-full rounded-xl border border-slate-200 px-5 py-4 text-sm font-medium focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

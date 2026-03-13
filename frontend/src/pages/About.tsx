import { ShieldCheck, Users, Target, Award } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'Happy Customers', value: '50k+', icon: Users },
    { label: 'Services Completed', value: '120k+', icon: ShieldCheck },
    { label: 'Countries Reached', value: '15+', icon: Target },
    { label: 'Awards Won', value: '25+', icon: Award },
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-blue-600/10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl">
              About <span className="text-blue-500">ServicePro</span>
            </h1>
            <p className="mt-6 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              We are dedicated to revolutionizing the way you access professional services. 
              Our mission is to bridge the gap between skilled experts and customers who demand excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-8 rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:shadow-blue-900/5 group">
                <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-6 w-6" />
                </div>
                <span className="mt-6 text-3xl font-black text-slate-900">{stat.value}</span>
                <span className="mt-1 text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Our Core <span className="text-blue-600">Values</span></h2>
              <div className="space-y-6">
                {[
                  { title: 'Excellence in Service', desc: 'We never settle for "good enough". We strive for perfection in every task we undertake.' },
                  { title: 'Trust & Transparency', desc: 'Our platform is built on verified professional reviews and upfront, honest pricing.' },
                  { title: 'Customer First', desc: 'Your satisfaction is our primary metric for success. We are here to serve you.' }
                ].map((value, i) => (
                  <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white shadow-sm border border-slate-100">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-black">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{value.title}</h3>
                      <p className="mt-1 text-sm text-slate-500 leading-relaxed">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-blue-600/5 border border-blue-600/10 overflow-hidden flex items-center justify-center p-12">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent" />
                <ShieldCheck className="w-full h-full text-blue-600 opacity-20" />
                <div className="absolute inset-x-0 bottom-12 px-12">
                  <div className="bg-white p-8 rounded-2xl shadow-2xl border border-slate-100">
                    <p className="text-lg font-bold text-slate-900 italic">"ServicePro changed the way I maintain my home. Professional, reliable, and incredibly easy to use."</p>
                    <p className="mt-4 font-black text-blue-600 uppercase tracking-widest text-xs">- Sarah Johnson, Homeowner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

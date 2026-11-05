import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock3, Headphones, Check, Copy, Mail, Menu, MessageSquare, Phone, Search, Send, ShieldCheck, X, Zap } from 'lucide-react';
import { store } from './config';

const telLink = `tel:${store.phoneTel}`;
const mailLink = (subject, body) => `mailto:${store.email}?subject=${encodeURIComponent(subject || 'Enquiry from TECHNOVA website')}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

// Fades and slides content in when it scrolls into view.
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>{children}</Tag>;
}

export default function App() {
  const [category, setCategory] = useState('All products');
  const [search, setSearch] = useState('');
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', interest: '', message: '' });
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(h.scrollHeight - h.clientHeight > 0 ? (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const products = useMemo(
    () => store.products.filter((p) => (category === 'All products' || p.category === category) && `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(search.toLowerCase())),
    [category, search]
  );

  const setField = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const messageText = `Hello TECHNOVA, my name is ${form.name || '(name)'}.${form.phone ? ` My number is ${form.phone}.` : ''}${form.interest ? ` I am interested in: ${form.interest}.` : ''}${form.message ? ` ${form.message}` : ''}`;
  const closeMenu = () => setMenu(false);

  const copyNumber = async () => {
    try { await navigator.clipboard.writeText(store.phoneDisplay.replace(/\s/g, '')); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard unavailable */ }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!store.formEndpoint) { window.location.href = mailLink(`Enquiry from ${form.name || 'website visitor'}`, messageText); return; }
    setStatus('sending');
    try {
      const res = await fetch(store.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: form.name, product: form.interest, phone: form.phone, message: form.message }) });
      if (!res.ok) throw new Error('failed');
      setStatus('sent'); setForm({ name: '', phone: '', interest: '', message: '' });
    } catch { setStatus('error'); }
  };

  return (
    <main>
      <div className="progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className="announcement"><Zap size={14} /> Open 24/7 · Call or email us any time</div>

      <header className="header">
        <a className="logo" href="#home"><span className="logo-icon"><Zap /></span>{store.name}<i>.</i></a>
        <button className="menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? <X /> : <Menu />}</button>
        <nav className={menu ? 'nav open' : 'nav'}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#products" onClick={closeMenu}>Products</a>
          <a href="#about" onClick={closeMenu}>About us</a>
          <a className="nav-button" href="#contact" onClick={closeMenu}>Contact us <ArrowUpRight size={16} /></a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-text">
          <p className="eyebrow">● &nbsp; YOUR EVERYDAY TECH DESTINATION</p>
          <h1>Find the tech that <em>moves you.</em></h1>
          <p className="hero-copy">{store.description}</p>
          <div className="actions">
            <a className="primary" href="#products">Explore products <ArrowRight size={17} /></a>
            <a className="call-btn" href="#contact"><MessageSquare size={17} /> Contact us</a>
          </div>
          <div className="points"><span><CheckCircle2 /> Product information</span><span><Clock3 /> Open 24/7</span></div>
        </div>
        <div className="hero-visual">
          <div className="glow" />
          <img src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1100&q=90" alt="A selection of electronic devices" />
          <span className="visual-label">EXPLORE. COMPARE. CHOOSE.</span>
        </div>
      </section>

      <Reveal as="section" className="benefits">
        <div><ShieldCheck /><span><b>Clear product details</b><small>Specifications you can review</small></span></div>
        <div><Headphones /><span><b>Helpful assistance</b><small>Get answers to your questions</small></span></div>
        <div><Clock3 /><span><b>Open 24/7</b><small>Every day of the week</small></span></div>
      </Reveal>

      <section className="products" id="products">
        <Reveal className="section-top">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2>Explore our products<span>.</span></h2>
            <p className="muted">Browse our electronics collection and find the details you need.</p>
          </div>
          <label className="search"><Search /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." /></label>
        </Reveal>
        <Reveal className="categories" delay={80}>{store.categories.map((c) => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</Reveal>
        <div className="product-grid" key={category}>
          {products.map((p, i) => (
            <Reveal as="article" className="product" key={p.id} delay={(i % 3) * 90}>
              <div className="product-image">
                <img src={p.image} alt={p.alt} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <small>{p.category}</small>
              </div>
              <div className="product-info">
                <p>{p.category}</p>
                <h3>{p.name}</h3>
                <div className="description">{p.description}</div>
                <div className="product-bottom">
                  <b>{p.price}</b>
                  <a href="#contact" onClick={() => setForm((f) => ({ ...f, interest: p.name }))}><MessageSquare size={14} /> Enquire now</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        {!products.length && <p className="empty">No products match your search. Try another category or product name.</p>}
        <p className="note">Product names, images, specifications and prices are examples until replaced with the store’s verified catalogue.</p>
      </section>

      <section className="about" id="about">
        <Reveal className="about-art"><Zap size={55} /><b>TECHNOLOGY<br />MADE SIMPLE</b></Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">ABOUT {store.name}</p>
          <h2>Good technology. Clear choices.</h2>
          <p>Introduce your electronics store, the brands and product categories you actually carry, and the support you provide. Share accurate information about warranties, returns, delivery and product condition before publishing.</p>
          <div className="checks"><span><CheckCircle2 /> Accurate product details</span><span><CheckCircle2 /> Helpful customer service</span><span><CheckCircle2 /> Transparent store policies</span></div>
        </Reveal>
      </section>

      <section className="contact" id="contact">
        <Reveal className="contact-head">
          <p className="eyebrow">CONTACT US</p>
          <h2>Need help choosing? Talk to us<span>.</span></h2>
          <p>Ask about stock, exact specifications, prices or delivery. Call us or send a message below and we will get back to you.</p>
          <div className="open-badge"><span className="pulse" /><b>{store.hours}</b><small>{store.hoursNote}</small></div>
        </Reveal>

        <div className="contact-cards">
          <Reveal className="contact-card phone">
            <a className="cc-main" href={telLink}>
              <span className="cc-icon"><Phone size={26} /></span>
              <span className="cc-text"><small>PHONE</small><b>{store.phoneDisplay}</b><em>Tap to call</em></span>
            </a>
            <button type="button" className="copy-btn" onClick={copyNumber} aria-label="Copy phone number">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy'}</button>
          </Reveal>
          <Reveal as="a" className="contact-card mail" href={mailLink()} delay={100}>
            <span className="cc-icon"><Mail size={26} /></span>
            <span className="cc-text"><small>EMAIL</small><b>{store.email}</b><em>Send us an email</em></span>
            <ArrowUpRight className="cc-arrow" />
          </Reveal>
        </div>

        <Reveal className="contact-form" delay={150}>
          <h3>Send a quick message</h3>
          <p className="muted">Tell us what you need and we will get back to you.</p>
          <form className="fields" onSubmit={submitForm}>
            <label>Your name<input required value={form.name} onChange={setField('name')} placeholder="e.g. Ali Khan" /></label>
            <label>Phone number<input type="tel" value={form.phone} onChange={setField('phone')} placeholder="03XX XXXXXXX" /></label>
            <label className="full">Product you are interested in
              <select value={form.interest} onChange={setField('interest')}>
                <option value="">Not sure yet</option>
                {store.products.map((p) => <option key={p.id} value={p.name}>{p.name} ({p.price})</option>)}
              </select>
            </label>
            <label className="full">Message<textarea required rows="4" value={form.message} onChange={setField('message')} placeholder="Tell us what you need" /></label>
            <div className="form-actions full">
              <button type="submit" className="email-btn" disabled={status === 'sending'}><Send size={16} /> {status === 'sending' ? 'Sending...' : 'Send message'}</button>
              <a className="call-btn" href={telLink}><Phone size={16} /> Call now</a>
            </div>
            {status === 'sent' && <p className="form-msg ok" role="status">Thank you. Your message was sent and we will reply soon.</p>}
            {status === 'error' && <p className="form-msg bad" role="alert">Something went wrong. Please call us or email {store.email}.</p>}
          </form>
        </Reveal>
      </section>

      <footer>
        <a className="logo" href="#home"><span className="logo-icon"><Zap /></span>{store.name}<i>.</i></a>
        <p>© {new Date().getFullYear()} {store.name}. All rights reserved.</p>
        <a href="#home">Back to top ↑</a>
      </footer>

      <a className="float-wa" href="#contact" aria-label="Contact us"><MessageSquare size={26} /></a>
    </main>
  );
}

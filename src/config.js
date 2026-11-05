// Edit your store details here.
const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;

export const store = {
  name: 'TECHNOVA',
  description:
    'Smartphones, laptops, audio and smart wearables in one place. Browse the range, compare prices and message us any time to order.',
  email: 'faheemsehar47@gmail.com',
  // Shown as plain text, with a tap-to-call link. No social media links on this site (Snapchat ad policy).
  phoneDisplay: '0341 8227782',
  phoneTel: '+923418227782',
  // Optional: paste a Formspree / Web3Forms endpoint here so the form sends without opening an email app.
  // Example: 'https://formspree.io/f/xxxxxxx'. Leave empty to send through the visitor's email app.
  formEndpoint: '',
  hours: 'Open 24/7',
  hoursNote: 'Every day of the week, including holidays',
  categories: ['All products', 'Smartphones', 'Laptops', 'Audio', 'Wearables'],
  products: [
    { id: 1, name: 'Nova X Pro 5G', category: 'Smartphones', price: 'Rs. 149,999', description: '6.7" AMOLED display, 256GB storage, triple camera and all-day battery.', image: u('photo-1511707171634-5f897ff02aa9'), alt: 'Modern smartphone' },
    { id: 2, name: 'Nova Lite 128', category: 'Smartphones', price: 'Rs. 54,999', description: '6.5" display, 128GB storage, fast charging and a clear dual camera.', image: u('photo-1592750475338-74b7b21085ab'), alt: 'Budget smartphone' },
    { id: 3, name: 'AeroBook 14', category: 'Laptops', price: 'Rs. 189,999', description: '14" laptop, 16GB RAM, 512GB SSD. Light enough for travel, fast enough for work.', image: u('photo-1496181133206-80ce9b88a853'), alt: 'Slim laptop on a desk' },
    { id: 4, name: 'Forge Gaming 15', category: 'Laptops', price: 'Rs. 329,999', description: '15.6" 144Hz display, dedicated graphics and a cooling system built for long sessions.', image: u('photo-1603302576837-37561b2e2302'), alt: 'Gaming laptop' },
    { id: 5, name: 'Pulse ANC Headphones', category: 'Audio', price: 'Rs. 24,999', description: 'Active noise cancellation, 40-hour battery and soft over-ear cushions.', image: u('photo-1505740420928-5e560c06d30e'), alt: 'Over-ear headphones' },
    { id: 6, name: 'Beat Buds Wireless', category: 'Audio', price: 'Rs. 8,499', description: 'Compact wireless earbuds with a charging case and clear call quality.', image: u('photo-1590658268037-6bf12165a8df'), alt: 'Wireless earbuds' },
    { id: 7, name: 'Chrono Smartwatch S2', category: 'Wearables', price: 'Rs. 18,999', description: 'Heart-rate and sleep tracking, GPS and 7 days of battery life.', image: u('photo-1523275335684-37898b6baf30'), alt: 'Smartwatch on a wrist' },
    { id: 8, name: 'FitBand Active', category: 'Wearables', price: 'Rs. 6,999', description: 'Lightweight fitness band with step counter, workout modes and water resistance.', image: u('photo-1575311373937-040b8e1fd5b6'), alt: 'Fitness band' },
    { id: 9, name: 'Boom Mini Speaker', category: 'Audio', price: 'Rs. 12,499', description: 'Portable Bluetooth speaker with deep bass and 12 hours of playtime.', image: u('photo-1608043152269-423dbba4e7e1'), alt: 'Portable speaker' },
  ],
};

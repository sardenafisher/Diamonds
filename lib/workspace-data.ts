'use client';

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  source: 'WhatsApp' | 'Instagram' | 'Web Form' | 'Email' | 'Viator';
  tier: 'VIP' | 'Preferred' | 'Standard';
  lifetimeValue: number;
  dealStage: 'New Lead' | 'Discovery' | 'Proposal' | 'Negotiation' | 'Won';
  dealValue: number;
  assignedAgent: string;
  notes: string;
  createdAt: string;
}

export interface ConversationMessage {
  id: string;
  senderType: 'customer' | 'agent' | 'ai_assistant';
  senderName: string;
  content: string;
  timestamp: string;
  isAiDraft?: boolean;
  isApproved?: boolean;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  channel: 'whatsapp' | 'instagram' | 'email' | 'web';
  status: 'open' | 'pending' | 'resolved';
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: ConversationMessage[];
}

export interface WebsiteAsset {
  id: string;
  domain: string;
  cms: 'WordPress' | 'WooCommerce' | 'Custom';
  phpVersion: string;
  sslValid: boolean;
  sslExpiryDays: number;
  uptime: number;
  hosting: string;
  status: 'Healthy' | 'Updates Pending' | 'Warning';
}

export interface TourBooking {
  id: string;
  tourName: string;
  customerName: string;
  channel: 'Direct' | 'Viator' | 'GetYourGuide';
  date: string;
  guests: number;
  totalPrice: number;
  status: 'Confirmed' | 'Pending' | 'Completed';
}

export interface WorkflowRule {
  id: string;
  name: string;
  trigger: string;
  condition: string;
  action: string;
  isActive: boolean;
  executionsCount: number;
}

export interface SoftwareSubscription {
  id: string;
  name: string;
  category: string;
  costMonthly: number;
  renewalDate: string;
  billingCycle: 'Monthly' | 'Annual';
  status: 'Active' | 'Review';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Manager' | 'Member';
  avatarInitials: string;
  status: 'Active' | 'Invited';
}

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    fullName: 'Elena Vance',
    email: 'elena.vance@horizonretreats.com',
    phone: '+1 (415) 890-2100',
    company: 'Horizon Luxury Escapes',
    source: 'WhatsApp',
    tier: 'VIP',
    lifetimeValue: 34600,
    dealStage: 'Negotiation',
    dealValue: 18400,
    assignedAgent: 'Marcus Vance',
    notes: 'Executive board retreat inquiry. Prefers 68ft Riva catamaran. Previous bookings in 2024 and 2025.',
    createdAt: '2026-10-18',
  },
  {
    id: 'cust-2',
    fullName: 'Lucas Thorne',
    email: 'l.thorne@monarchcapital.co.uk',
    phone: '+44 20 7946 0912',
    company: 'Monarch Capital Partners',
    source: 'Email',
    tier: 'VIP',
    lifetimeValue: 52000,
    dealStage: 'Proposal',
    dealValue: 24500,
    assignedAgent: 'Chloe Zhang',
    notes: 'Annual partners retreat in Capri. Requires dedicated sommelier and port helicopter transfer.',
    createdAt: '2026-10-19',
  },
  {
    id: 'cust-3',
    fullName: 'Sophia Rossi',
    email: 'sophia@rossidesignstudio.it',
    phone: '+39 02 8845 2311',
    company: 'Studio Rossi Milano',
    source: 'Instagram',
    tier: 'Preferred',
    lifetimeValue: 12800,
    dealStage: 'Won',
    dealValue: 9200,
    assignedAgent: 'Marcus Vance',
    notes: 'Architectural photography cruise. Contract signed and 50% deposit received via Stripe.',
    createdAt: '2026-10-14',
  },
  {
    id: 'cust-4',
    fullName: 'Alexander Chen',
    email: 'alex@chenfamilyoffice.sg',
    phone: '+65 6789 4321',
    company: 'Chen Family Office',
    source: 'Viator',
    tier: 'Standard',
    lifetimeValue: 6400,
    dealStage: 'Discovery',
    dealValue: 6400,
    assignedAgent: 'Liam Wright',
    notes: 'Sunset wine tasting tour for 6 guests. Inquired about private charter extension.',
    createdAt: '2026-10-21',
  },
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    customerId: 'cust-1',
    customerName: 'Elena Vance',
    customerEmail: 'elena.vance@horizonretreats.com',
    channel: 'whatsapp',
    status: 'open',
    unreadCount: 1,
    lastMessage: 'Can you confirm captain availability, catering packages, and reserve the slot?',
    lastMessageTime: '14:18',
    messages: [
      {
        id: 'msg-1',
        senderType: 'customer',
        senderName: 'Elena Vance',
        content: 'Hello Marcus, our executive board needs a 3-day private yacht retreat in the Amalfi Coast next month for 12 guests. Can you confirm captain availability, catering packages, and reserve the slot?',
        timestamp: '14:18',
      },
      {
        id: 'msg-2',
        senderType: 'ai_assistant',
        senderName: 'DIAMONDS Assistant',
        content: 'Hello Elena, thank you for reaching out to Horizon. We have availability for the 68ft Riva Dolceriva with Captain Matteo for October 14–17. The private chef package, fuel provisioning, and Capri harbor permits are quoted at $18,400 USD. Would you like me to lock the reservation?',
        timestamp: '14:19',
        isAiDraft: true,
        isApproved: false,
      },
    ],
  },
  {
    id: 'conv-2',
    customerId: 'cust-2',
    customerName: 'Lucas Thorne',
    customerEmail: 'l.thorne@monarchcapital.co.uk',
    channel: 'email',
    status: 'pending',
    unreadCount: 0,
    lastMessage: 'The proposal terms look satisfactory. Please send the invoice schedule.',
    lastMessageTime: '11:42',
    messages: [
      {
        id: 'msg-3',
        senderType: 'customer',
        senderName: 'Lucas Thorne',
        content: 'The proposal terms look satisfactory. Please send the invoice schedule for the deposit so our finance team can remit payment today.',
        timestamp: '11:42',
      },
      {
        id: 'msg-4',
        senderType: 'agent',
        senderName: 'Chloe Zhang',
        content: 'Good morning Lucas, wonderful to hear. I have issued the secure Stripe invoice for the 40% initial reservation deposit directly to your accounts payable desk.',
        timestamp: '12:05',
        isApproved: true,
      },
    ],
  },
  {
    id: 'conv-3',
    customerId: 'cust-3',
    customerName: 'Sophia Rossi',
    customerEmail: 'sophia@rossidesignstudio.it',
    channel: 'instagram',
    status: 'resolved',
    unreadCount: 0,
    lastMessage: 'Thank you! The confirmation voucher arrived safely in my inbox.',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'msg-5',
        senderType: 'customer',
        senderName: 'Sophia Rossi',
        content: 'Thank you! The confirmation voucher arrived safely in my inbox. Looking forward to our cruise.',
        timestamp: 'Yesterday',
      },
    ],
  },
];

export const INITIAL_WEBSITES: WebsiteAsset[] = [
  {
    id: 'web-1',
    domain: 'horizon-retreats.com',
    cms: 'WordPress',
    phpVersion: '8.3.12',
    sslValid: true,
    sslExpiryDays: 248,
    uptime: 99.98,
    hosting: 'Dedicated Cloud Edge (AWS eu-central)',
    status: 'Healthy',
  },
  {
    id: 'web-2',
    domain: 'amalfi-yachtcharters.it',
    cms: 'WooCommerce',
    phpVersion: '8.3.8',
    sslValid: true,
    sslExpiryDays: 114,
    uptime: 99.94,
    hosting: 'FastCGI Staging Container',
    status: 'Updates Pending',
  },
  {
    id: 'web-3',
    domain: 'capri-villas.luxury',
    cms: 'WordPress',
    phpVersion: '8.2.18',
    sslValid: true,
    sslExpiryDays: 310,
    uptime: 99.99,
    hosting: 'High-Concurrency Cluster',
    status: 'Healthy',
  },
];

export const INITIAL_BOOKINGS: TourBooking[] = [
  {
    id: 'bk-101',
    tourName: 'Private 3-Day Amalfi Catamaran Retreat',
    customerName: 'Elena Vance',
    channel: 'Direct',
    date: '2026-10-14',
    guests: 12,
    totalPrice: 18400,
    status: 'Pending',
  },
  {
    id: 'bk-102',
    tourName: 'Capri Sunset Yacht & Wine Excursion',
    customerName: 'Alexander Chen',
    channel: 'Viator',
    date: '2026-10-24',
    guests: 6,
    totalPrice: 2400,
    status: 'Confirmed',
  },
  {
    id: 'bk-103',
    tourName: 'Faraglioni Private Speedboat Cruise',
    customerName: 'Sophia Rossi',
    channel: 'GetYourGuide',
    date: '2026-10-28',
    guests: 8,
    totalPrice: 3200,
    status: 'Confirmed',
  },
  {
    id: 'bk-104',
    tourName: 'Monarch VIP Archipelago Exploration',
    customerName: 'Lucas Thorne',
    channel: 'Direct',
    date: '2026-11-04',
    guests: 14,
    totalPrice: 24500,
    status: 'Confirmed',
  },
];

export const INITIAL_WORKFLOWS: WorkflowRule[] = [
  {
    id: 'wf-1',
    name: 'High-Value Inbound Lead Triage',
    trigger: 'Inbound message on any channel',
    condition: 'Estimated deal value > $10,000 USD',
    action: 'Assign to Marcus Vance + Generate AI proposal draft + Flag for human sign-off',
    isActive: true,
    executionsCount: 42,
  },
  {
    id: 'wf-2',
    name: 'Viator & GetYourGuide Calendar Sync',
    trigger: 'New OTA reservation voucher logged',
    condition: 'Tour date within next 30 days',
    action: 'Block master calendar slot + Notify skipper Matteo + Log CRM customer record',
    isActive: true,
    executionsCount: 184,
  },
  {
    id: 'wf-3',
    name: 'WordPress Security & Uptime Heartbeat',
    trigger: 'Every 5 minutes prober',
    condition: 'Response code != 200 or SSL expiry < 30 days',
    action: 'Send urgent alert to Admin + Log diagnostic trace',
    isActive: true,
    executionsCount: 8920,
  },
];

export const INITIAL_SUBSCRIPTIONS: SoftwareSubscription[] = [
  {
    id: 'sub-1',
    name: 'Amazon Web Services (AWS)',
    category: 'Cloud Hosting & S3',
    costMonthly: 340,
    renewalDate: '2026-11-01',
    billingCycle: 'Monthly',
    status: 'Active',
  },
  {
    id: 'sub-2',
    name: 'Cloudflare Pro & DNS Security',
    category: 'Domain & DDoS Security',
    costMonthly: 45,
    renewalDate: '2026-11-15',
    billingCycle: 'Monthly',
    status: 'Active',
  },
  {
    id: 'sub-3',
    name: 'WhatsApp Business API Gateway',
    category: 'Customer Messaging',
    costMonthly: 120,
    renewalDate: '2026-11-10',
    billingCycle: 'Monthly',
    status: 'Active',
  },
  {
    id: 'sub-4',
    name: 'Google Workspace Enterprise',
    category: 'Team Email & Docs',
    costMonthly: 180,
    renewalDate: '2026-12-01',
    billingCycle: 'Monthly',
    status: 'Active',
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Marcus Vance',
    email: 'marcus.vance@apexoperations.io',
    role: 'Owner',
    avatarInitials: 'MV',
    status: 'Active',
  },
  {
    id: 'tm-2',
    name: 'Elena Vance',
    email: 'elena.vance@horizonretreats.com',
    role: 'Manager',
    avatarInitials: 'EV',
    status: 'Active',
  },
  {
    id: 'tm-3',
    name: 'Chloe Zhang',
    email: 'chloe.zhang@apexoperations.io',
    role: 'Admin',
    avatarInitials: 'CZ',
    status: 'Active',
  },
  {
    id: 'tm-4',
    name: 'Liam Wright',
    email: 'liam.w@apexoperations.io',
    role: 'Member',
    avatarInitials: 'LW',
    status: 'Active',
  },
];

-- DIAMONDS Business Management Platform
-- Complete PostgreSQL / Supabase Schema Definition with Row-Level Security (RLS)

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Workspaces (Multi-Tenant Isolation)
CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'Professional',
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Workspace Members (Role-Based Access Control)
CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Member' CHECK (role IN ('Owner', 'Admin', 'Manager', 'Member', 'Viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

-- 4. Customers & Leads (CRM 360)
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  channel_source TEXT NOT NULL DEFAULT 'WhatsApp',
  tier TEXT NOT NULL DEFAULT 'Standard' CHECK (tier IN ('Standard', 'Preferred', 'VIP')),
  lifetime_value NUMERIC(12, 2) DEFAULT 0.00,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Deals & Sales Pipeline
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  value NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  stage TEXT NOT NULL DEFAULT 'New Lead' CHECK (stage IN ('New Lead', 'Discovery', 'Proposal', 'Negotiation', 'Won', 'Lost')),
  probability INTEGER DEFAULT 50 CHECK (probability BETWEEN 0 AND 100),
  close_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Multichannel Conversations
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  channel TEXT NOT NULL CHECK (channel IN ('whatsapp', 'instagram', 'facebook', 'email', 'web')),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'pending', 'resolved')),
  unread_count INTEGER DEFAULT 0,
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  last_message_preview TEXT,
  last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Messages & AI Grounded Drafts
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'agent', 'ai_assistant')),
  sender_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_ai_draft BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT TRUE,
  approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Websites & Infrastructure
CREATE TABLE IF NOT EXISTS public.websites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  domain TEXT NOT NULL,
  cms_type TEXT NOT NULL DEFAULT 'WordPress',
  php_version TEXT DEFAULT '8.3',
  ssl_valid BOOLEAN DEFAULT TRUE,
  ssl_expiry DATE,
  uptime_percentage NUMERIC(5, 2) DEFAULT 99.98,
  hosting_provider TEXT DEFAULT 'Cloud Edge Container',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Bookings & Tour Reservations
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  tour_name TEXT NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 1,
  booking_date DATE NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL,
  channel TEXT NOT NULL DEFAULT 'Direct' CHECK (channel IN ('Direct', 'Viator', 'GetYourGuide', 'FareHarbor')),
  status TEXT NOT NULL DEFAULT 'Confirmed' CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Workflows & Automations
CREATE TABLE IF NOT EXISTS public.workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  trigger_event TEXT NOT NULL,
  condition_rule TEXT NOT NULL,
  action_type TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Subscriptions & Operational Expenses
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  service_name TEXT NOT NULL,
  category TEXT NOT NULL,
  cost_monthly NUMERIC(10, 2) NOT NULL,
  renewal_date DATE,
  auto_renew BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Configuration
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.websites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Workspace Isolation Policy Helper
CREATE OR REPLACE FUNCTION public.user_has_workspace_access(ws_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE workspace_id = ws_id AND user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policies
CREATE POLICY "Users can access their workspaces"
ON public.workspaces FOR ALL
USING (EXISTS (
  SELECT 1 FROM public.workspace_members
  WHERE workspace_id = public.workspaces.id AND user_id = auth.uid()
));

CREATE POLICY "Workspace members can read customers"
ON public.customers FOR ALL
USING (public.user_has_workspace_access(workspace_id));

CREATE POLICY "Workspace members can access deals"
ON public.deals FOR ALL
USING (public.user_has_workspace_access(workspace_id));

CREATE POLICY "Workspace members can access conversations"
ON public.conversations FOR ALL
USING (public.user_has_workspace_access(workspace_id));

CREATE POLICY "Workspace members can access websites"
ON public.websites FOR ALL
USING (public.user_has_workspace_access(workspace_id));

CREATE POLICY "Workspace members can access bookings"
ON public.bookings FOR ALL
USING (public.user_has_workspace_access(workspace_id));

CREATE POLICY "Workspace members can access workflows"
ON public.workflows FOR ALL
USING (public.user_has_workspace_access(workspace_id));

CREATE POLICY "Workspace members can access subscriptions"
ON public.subscriptions FOR ALL
USING (public.user_has_workspace_access(workspace_id));

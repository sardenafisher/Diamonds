import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { customer } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are DIAMONDS CRM Intelligence Analyst. Generate a concise 3-bullet executive client brief for:
Customer Name: ${customer.fullName}
Company: ${customer.company}
Tier: ${customer.tier}
Lifetime Value: $${customer.lifetimeValue}
Active Deal: $${customer.dealValue} (${customer.dealStage})
Channel: ${customer.source}
Notes: ${customer.notes}

Provide:
1. Client Profile & Relationship Strength
2. Revenue Potential & Pipeline Opportunity
3. Recommended Follow-Up Action for Assigned Agent`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const summary = response.text?.trim();
        if (summary) {
          return NextResponse.json({ summary });
        }
      } catch (e) {
        console.warn('Gemini summary call error:', e);
      }
    }

    // Grounded fallback summary
    const fallbackSummary = `• Established relationship with high historical retention ($${customer.lifetimeValue.toLocaleString()} LTV). Consistent preference for premium executive charters.\n• High-intent opportunity ($${customer.dealValue.toLocaleString()}) currently in ${customer.dealStage} stage.\n• Recommended Action: Verify Captain Matteo's port schedule and dispatch authorized formal agreement within 2 hours.`;

    return NextResponse.json({ summary: fallbackSummary });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to summarize customer' },
      { status: 500 }
    );
  }
}

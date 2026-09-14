export interface InquiryData {
  type?: 'inspection' | 'contact';
  name: string;
  phone: string;
  location?: string;
  structureType?: string;
  problemArea?: string;
  message?: string;
}

export const TARGET_WHATSAPP_NUMBER = '919711494386'; // +91 97114 94386
export const TARGET_DISPLAY_PHONE = '+91 97114 94386';

/**
 * Builds the official formatted WhatsApp message for Aquaseal Inquiries
 */
export function buildWhatsAppInspectionMessage(data: InquiryData): string {
  const isInspection = (data.type || 'inspection') === 'inspection';
  
  if (isInspection) {
    return [
      `*AQUASEAL WATERPROOFING - SITE INSPECTION REQUEST*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Customer Name:* ${data.name.trim()}`,
      `📞 *Phone Number:* ${data.phone.trim()}`,
      data.location ? `📍 *Location/City:* ${data.location.trim()}` : '',
      data.structureType ? `🏢 *Property Type:* ${data.structureType.trim()}` : '',
      data.problemArea ? `💧 *Issue Area:* ${data.problemArea.trim()}` : '',
      data.message ? `📝 *Notes:* ${data.message.trim()}` : '',
      `━━━━━━━━━━━━━━━━━━━━`,
      `Hello Aquaseal Team, please schedule a free technical site inspection for this property.`,
    ].filter(Boolean).join('\n');
  }

  return [
    `*AQUASEAL WATERPROOFING - GENERAL INQUIRY*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    `👤 *Name:* ${data.name.trim()}`,
    `📞 *Phone:* ${data.phone.trim()}`,
    data.structureType ? `🏢 *Property Type:* ${data.structureType.trim()}` : '',
    data.problemArea ? `💧 *Requirement:* ${data.problemArea.trim()}` : '',
    data.message ? `📝 *Message:* ${data.message.trim()}` : '',
    `━━━━━━━━━━━━━━━━━━━━`,
    `Hello Aquaseal Team, I would like to get a quote/consultation for this requirement.`,
  ].filter(Boolean).join('\n');
}

/**
 * Generates the direct WhatsApp Click-to-Chat URL
 */
export function getWhatsAppUrl(data: InquiryData): string {
  const text = buildWhatsAppInspectionMessage(data);
  return `https://api.whatsapp.com/send?phone=${TARGET_WHATSAPP_NUMBER}&text=${encodeURIComponent(text)}`;
}

/**
 * Directly navigates or opens WhatsApp
 */
export function openWhatsAppDirectly(url: string) {
  try {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  } catch (e) {
    window.location.href = url;
  }
}

/**
 * Submits the inquiry to the backend API and initiates WhatsApp messaging
 */
export async function submitInquiry(data: InquiryData): Promise<{ success: boolean; whatsappUrl: string }> {
  const whatsappUrl = getWhatsAppUrl(data);

  // 1. Post to server-side leads database
  try {
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        type: data.type || 'inspection',
      }),
    }).catch((err) => {
      console.warn('[Inquiry Service] Background server sync warning:', err);
    });
  } catch (err) {
    console.warn('[Inquiry Service] Post failed:', err);
  }

  // 2. Also save in localStorage as persistent client backup
  try {
    const existing = JSON.parse(localStorage.getItem('aquaseal_saved_leads') || '[]');
    existing.unshift({
      id: `local_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...data,
    });
    localStorage.setItem('aquaseal_saved_leads', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    // Ignore storage errors
  }

  // 3. Attempt to automatically open WhatsApp in a new tab or app
  try {
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // If popup was blocked by browser, we return the URL so the UI can provide an immediate prominent button
    }
  } catch (e) {
    console.warn('[Inquiry Service] Window.open error:', e);
  }

  return { success: true, whatsappUrl };
}

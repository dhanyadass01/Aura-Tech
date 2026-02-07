
/**
 * AURA TECH - Spreadsheet Backend Service
 * Connects to Google Sheet ID: 141a_MiG32ee6A87-YWWrUZAZdLlf3dCmEox7yZPBIn8
 */

export interface SheetRow {
  timestamp: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  userType: string;
  projectTitle: string;
  projectType: string;
  deliveryDate?: string;
  description: string;
}

// PASTE YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL HERE
const SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwEhfugPpbuzFBUisK-4NL15gdvsaH7oq70aYXv8bDqmDpq5AKY714J4zVuzXWEd6BjvA/exec'; 

const STORAGE_KEY = 'aura_tech_spreadsheet_data';

export const spreadsheetService = {
  /**
   * Saves a new record to the spreadsheet and triggers automatic email via Apps Script.
   */
  async saveRecord(row: Omit<SheetRow, 'timestamp'>): Promise<{ success: boolean; id: string }> {
    try {
      const newRecord: SheetRow = {
        ...row,
        timestamp: new Date().toISOString()
      };

      // 1. Local Cache (for immediate redundancy)
      const records = this.getAllRecords();
      records.push(newRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));

      // 2. Real-time sync to the provided Google Spreadsheet
      if (SHEET_WEBHOOK_URL) {
        try {
          await fetch(SHEET_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors', // Standard for Apps Script redirects
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(row),
          });
          console.log('Project row synced to Google Spreadsheet & Email Queue triggered.');
        } catch (syncError) {
          console.warn('Sync delayed. Data preserved in local session.', syncError);
        }
      }
      
      return { success: true, id: Math.random().toString(36).substr(2, 9) };
    } catch (error) {
      console.error('Data layer failure:', error);
      throw new Error('Failed to record project');
    }
  },

  getAllRecords(): SheetRow[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  exportToExcel(): void {
    const records = this.getAllRecords();
    if (records.length === 0) {
      alert("No project data captured in this session yet.");
      return;
    }

    const headers = ['Timestamp', 'Client Name', 'Email', 'Phone', 'User Type', 'Project Title', 'Type', 'Delivery Date', 'Description'];
    const csvRows = [
      headers.join(','),
      ...records.map(r => [
        `"${r.timestamp}"`,
        `"${r.clientName}"`,
        `"${r.clientEmail}"`,
        `"${r.clientPhone}"`,
        `"${r.userType}"`,
        `"${r.projectTitle}"`,
        `"${r.projectType}"`,
        `"${r.deliveryDate || ''}"`,
        `"${r.description.replace(/"/g, '""')}"`
      ].join(','))
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `AURA_TECH_MasterSheet_Sync.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

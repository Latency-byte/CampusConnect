import { useSearchParams } from 'react-router-dom'

export default function Invoice() {
  const [searchParams] = useSearchParams()

  // Customer details from URL params or defaults
  const customerName = searchParams.get('name') || 'John Smith'
  const customerEmail = searchParams.get('email') || 'john.smith@student.edu.au'

  // Invoice details
  const invoiceNumber = `INV-${Math.floor(Date.now() / 1000)}`
  const issueDate = new Date().toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
  const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })

  // Amounts (GST-inclusive pricing)
  const gstExclusive = 8.18
  const gst = 0.82
  const total = 9.00

  return (
    <>
      <style>{`
        @media print {
          .disclaimer-banner { display: none !important; }
          .navbar { display: none !important; }
          .footer { display: none !important; }
          body { background: white; }
          main { margin: 0; padding: 0; }
          .invoice-page { padding: 0; }
          .invoice-actions { display: none; }
        }
      `}</style>

      <div className="invoice-page" style={{ maxWidth: 900, margin: '0 auto', padding: '40px 20px' }}>

        {/* Print button */}
        <div className="invoice-actions" style={{ display: 'flex', gap: 12, marginBottom: 28, justifyContent: 'flex-end' }}>
          <button
            className="btn btn-primary"
            onClick={() => window.print()}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            🖨️ Download / Print Invoice
          </button>
        </div>

        {/* Invoice container */}
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '48px', boxShadow: 'var(--shadow)' }}>

          {/* Header / Letterhead */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48, paddingBottom: 24, borderBottom: '2px solid var(--primary)' }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--primary)', marginBottom: 4 }}>CampusConnect</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8 }}>Educational platform for students & institutions</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>ABN 12 345 678 901</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--primary)' }}>INVOICE</div>
            </div>
          </div>

          {/* Invoice details */}
          <div style={{ marginBottom: 40 }} className="grid-2-gap32">
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Bill To</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{customerName}</div>
              <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{customerEmail}</div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Invoice Number</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{invoiceNumber}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Issue Date</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{issueDate}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Due Date</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{dueDate}</div>
              </div>
            </div>
          </div>

          {/* Line items table */}
          <div style={{ marginBottom: 40, overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '12px 0', textAlign: 'left', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</th>
                  <th style={{ padding: '12px 0', textAlign: 'center', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Qty</th>
                  <th style={{ padding: '12px 0', textAlign: 'right', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unit Price</th>
                  <th style={{ padding: '12px 0', textAlign: 'right', fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '20px 0', fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>
                    CampusConnect Premium — Monthly Subscription
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>Unlimited AI Study Assistant, draft feedback, lecture summaries, study planner, 50GB storage</div>
                  </td>
                  <td style={{ padding: '20px 0', textAlign: 'center', fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>1</td>
                  <td style={{ padding: '20px 0', textAlign: 'right', fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>$8.18</td>
                  <td style={{ padding: '20px 0', textAlign: 'right', fontSize: 14, color: 'var(--text-primary)', fontWeight: 600 }}>$8.18</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals section */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 40 }}>
            <div style={{ width: '100%', maxWidth: 320 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border)', marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Subtotal (excl. GST)</div>
                <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 600 }}>${gstExclusive.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border)', marginBottom: 12 }}>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>GST (10%)</div>
                <div style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 600 }}>${gst.toFixed(2)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 16, color: 'var(--text-primary)', fontWeight: 700 }}>Total (incl. GST)</div>
                <div style={{ fontSize: 18, color: 'var(--primary)', fontWeight: 800 }}>${total.toFixed(2)}</div>
              </div>
            </div>
          </div>

          {/* Payment status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: 'var(--success-light)', border: '1px solid var(--success)', borderRadius: 'var(--radius)', marginBottom: 32 }}>
            <span style={{ fontSize: 20 }}>✓</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--success)' }}>Payment Status: PAID</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Payment received via PayPal on {issueDate}</div>
            </div>
          </div>

          {/* Footer / Terms */}
          <div style={{ paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: '0 0 8px 0' }}>
              Thank you for your subscription! For support, visit campusconnect.edu.au or email support@campusconnect.edu.au
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
              This is an automatically generated invoice. For billing inquiries, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

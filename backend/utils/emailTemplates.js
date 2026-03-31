// Professional Email Templates for Travel Planner

export const emailTemplates = {
  // Password Reset OTP Template
  passwordResetOTP: (otp, userName = 'User') => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
          color: white;
        }
        .header h1 {
          font-size: 32px;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .header p {
          font-size: 16px;
          opacity: 0.95;
        }
        .content {
          padding: 40px 30px;
          background: white;
        }
        .greeting {
          font-size: 20px;
          color: #333;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .message {
          font-size: 16px;
          color: #555;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        .otp-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .otp-label {
          color: white;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 15px;
          opacity: 0.9;
        }
        .otp-code {
          font-size: 48px;
          font-weight: bold;
          color: white;
          letter-spacing: 10px;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
          font-family: 'Courier New', monospace;
        }
        .warning {
          background: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 15px 20px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .warning p {
          color: #856404;
          font-size: 14px;
          margin: 0;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 3px solid #667eea;
        }
        .footer p {
          color: #666;
          font-size: 14px;
          margin: 5px 0;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 10px;
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
        }
        .btn {
          display: inline-block;
          padding: 15px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          margin: 20px 0;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🔐 Password Reset</h1>
          <p>Secure verification code inside</p>
        </div>
        
        <div class="content">
          <div class="greeting">Hello ${userName}! 👋</div>
          
          <div class="message">
            <p>We received a request to reset your password. Use the verification code below to complete the process.</p>
          </div>
          
          <div class="otp-container">
            <div class="otp-label">Your Verification Code</div>
            <div class="otp-code">${otp}</div>
          </div>
          
          <div class="warning">
            <p>⏰ <strong>Important:</strong> This code will expire in 10 minutes for security reasons.</p>
          </div>
          
          <div class="message">
            <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          </div>
        </div>
        
        <div class="footer">
          <p><strong>Travel Planner</strong></p>
          <p>Your adventure begins here ✈️</p>
          <div class="social-links">
            <a href="#">Help Center</a> | 
            <a href="#">Contact Us</a> | 
            <a href="#">Privacy Policy</a>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} Travel Planner. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Booking Confirmation Template
  bookingConfirmation: (booking) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }
        .email-container {
          max-width: 650px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 50px 30px;
          text-align: center;
          color: white;
          position: relative;
        }
        .header::before {
          content: '✓';
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 60px;
          background: white;
          color: #667eea;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }
        .header h1 {
          font-size: 36px;
          margin-top: 30px;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .header p {
          font-size: 18px;
          opacity: 0.95;
        }
        .content {
          padding: 40px 30px;
        }
        .booking-id {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          margin: 30px 0;
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
        }
        .booking-id span {
          font-size: 14px;
          opacity: 0.9;
          display: block;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        .booking-id strong {
          font-size: 28px;
          letter-spacing: 3px;
          font-family: 'Courier New', monospace;
        }
        .details-card {
          background: #f8f9fa;
          border-radius: 15px;
          padding: 25px;
          margin: 25px 0;
          border-left: 5px solid #667eea;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        .detail-row:last-child {
          border-bottom: none;
        }
        .detail-label {
          color: #666;
          font-weight: 600;
          font-size: 14px;
        }
        .detail-value {
          color: #333;
          font-weight: 600;
          text-align: right;
        }
        .total-row {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 10px;
          margin: 20px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .total-row .label {
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .total-row .amount {
          font-size: 32px;
          font-weight: bold;
        }
        .info-box {
          background: #e3f2fd;
          border-left: 4px solid #2196f3;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
        }
        .info-box p {
          color: #0d47a1;
          font-size: 14px;
          line-height: 1.6;
          margin: 5px 0;
        }
        .cta-button {
          text-align: center;
          margin: 30px 0;
        }
        .btn {
          display: inline-block;
          padding: 18px 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
          transition: transform 0.3s;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 3px solid #667eea;
        }
        .footer p {
          color: #666;
          font-size: 14px;
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🎉 Booking Confirmed!</h1>
          <p>Your adventure awaits</p>
        </div>
        
        <div class="content">
          <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
            Dear <strong>${booking.booked_by || 'Traveler'}</strong>,
          </p>
          
          <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 25px;">
            Great news! Your booking has been successfully confirmed. We're excited to be part of your travel journey! 🌍✈️
          </p>
          
          <div class="booking-id">
            <span>BOOKING REFERENCE</span>
            <strong>${booking.booking_id}</strong>
          </div>
          
          <h3 style="color: #667eea; margin: 30px 0 20px 0; font-size: 20px;">
            📋 Booking Details
          </h3>
          
          <div class="details-card">
            <div class="detail-row">
              <span class="detail-label">🏖️ Destination</span>
              <span class="detail-value">${booking.destination}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">🏨 Accommodation</span>
              <span class="detail-value">${booking.accommodation}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📅 Check-in Date</span>
              <span class="detail-value">${booking.check_in_date || 'As per itinerary'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📅 Check-out Date</span>
              <span class="detail-value">${booking.check_out_date || 'As per itinerary'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">🌙 Number of Nights</span>
              <span class="detail-value">${booking.num_nights || 'TBD'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">💳 Payment Method</span>
              <span class="detail-value">${booking.payment_method || 'Online'}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📧 Contact Email</span>
              <span class="detail-value">${booking.email}</span>
            </div>
          </div>
          
          <div class="total-row">
            <span class="label">Total Amount</span>
            <span class="amount">₹${parseFloat(booking.total_cost || 0).toLocaleString()}</span>
          </div>
          
          <div class="info-box">
            <p><strong>📌 Important Information:</strong></p>
            <p>• Please arrive at least 2 hours before your scheduled check-in time</p>
            <p>• Carry a valid ID proof and this booking confirmation</p>
            <p>• Our team will contact you 24 hours before your travel date</p>
            <p>• For any changes, please contact us at least 48 hours in advance</p>
          </div>
          
          <div class="cta-button">
            <a href="#" class="btn">View Full Itinerary</a>
          </div>
          
          <p style="text-align: center; color: #666; margin-top: 30px; font-size: 14px;">
            Need help? We're here for you 24/7!<br>
            Contact us: <strong style="color: #667eea;">support@travelplanner.com</strong>
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Travel Planner</strong></p>
          <p>Making your travel dreams come true ✈️🌴</p>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} Travel Planner. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Booking Status Update Template
  bookingStatusUpdate: (booking, status) => {
    const statusConfig = {
      approved: {
        color: '#28a745',
        icon: '✓',
        title: 'Booking Approved!',
        message: 'Great news! Your booking has been approved by our team.'
      },
      rejected: {
        color: '#dc3545',
        icon: '✕',
        title: 'Booking Update',
        message: 'We regret to inform you that your booking could not be approved at this time.'
      },
      confirmed: {
        color: '#007bff',
        icon: '✓',
        title: 'Booking Confirmed',
        message: 'Your booking has been confirmed. Get ready for your adventure!'
      }
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.approved;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
          background: ${config.color};
          padding: 50px 30px;
          text-align: center;
          color: white;
          position: relative;
        }
        .status-icon {
          width: 80px;
          height: 80px;
          background: white;
          color: ${config.color};
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 50px;
          font-weight: bold;
          margin: 0 auto 20px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        }
        .header h1 {
          font-size: 32px;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .content {
          padding: 40px 30px;
        }
        .message-box {
          background: #f8f9fa;
          border-left: 5px solid ${config.color};
          padding: 25px;
          border-radius: 10px;
          margin: 25px 0;
        }
        .message-box p {
          color: #333;
          font-size: 16px;
          line-height: 1.6;
        }
        .booking-info {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 12px;
          margin: 25px 0;
        }
        .booking-info p {
          margin: 8px 0;
          font-size: 15px;
        }
        .booking-info strong {
          display: inline-block;
          min-width: 150px;
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 3px solid #667eea;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="status-icon">${config.icon}</div>
          <h1>${config.title}</h1>
        </div>
        
        <div class="content">
          <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
            Dear <strong>${booking.booked_by}</strong>,
          </p>
          
          <div class="message-box">
            <p>${config.message}</p>
          </div>
          
          <div class="booking-info">
            <p><strong>Booking ID:</strong> ${booking.booking_id}</p>
            <p><strong>Destination:</strong> ${booking.destination}</p>
            <p><strong>Status:</strong> ${status.toUpperCase()}</p>
          </div>
          
          <p style="color: #666; font-size: 15px; margin: 25px 0;">
            If you have any questions, please don't hesitate to contact our support team.
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Travel Planner</strong></p>
          <p style="color: #999; font-size: 12px; margin-top: 15px;">
            © ${new Date().getFullYear()} Travel Planner. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
    `;
  },

  // Query Reply Template
  queryReply: (query, reply) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
        }
        .email-container {
          max-width: 650px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
          color: white;
        }
        .header-icon {
          font-size: 60px;
          margin-bottom: 15px;
        }
        .header h1 {
          font-size: 32px;
          margin-bottom: 10px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 18px;
          color: #333;
          margin-bottom: 25px;
        }
        .query-box {
          background: #f8f9fa;
          border-left: 5px solid #667eea;
          padding: 25px;
          border-radius: 10px;
          margin: 25px 0;
        }
        .query-box h3 {
          color: #667eea;
          margin-bottom: 15px;
          font-size: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .query-box p {
          color: #555;
          font-size: 15px;
          line-height: 1.6;
        }
        .reply-box {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 15px;
          margin: 25px 0;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }
        .reply-box h3 {
          margin-bottom: 15px;
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .reply-box p {
          font-size: 16px;
          line-height: 1.8;
        }
        .info-banner {
          background: #e3f2fd;
          border-radius: 10px;
          padding: 20px;
          margin: 25px 0;
          border: 2px dashed #2196f3;
        }
        .info-banner p {
          color: #0d47a1;
          font-size: 14px;
          text-align: center;
        }
        .cta-section {
          text-align: center;
          margin: 35px 0;
        }
        .btn {
          display: inline-block;
          padding: 16px 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 16px;
          box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        .footer {
          background: #f8f9fa;
          padding: 30px;
          text-align: center;
          border-top: 3px solid #667eea;
        }
        .footer p {
          color: #666;
          font-size: 14px;
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <div class="header-icon">💬</div>
          <h1>We've Got Your Answer!</h1>
          <p>Response to your query</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            <p>Hello! 👋</p>
            <p style="margin-top: 10px; color: #666;">Thank you for reaching out to us. Our team has reviewed your query and here's our response:</p>
          </div>
          
          <div class="query-box">
            <h3>📝 Your Query</h3>
            <p><strong>Subject:</strong> ${query.subject}</p>
            <p style="margin-top: 15px;">${query.message}</p>
          </div>
          
          <div class="reply-box">
            <h3>💡 Our Response</h3>
            <p>${reply}</p>
          </div>
          
          <div class="info-banner">
            <p>
              <strong>Need more help?</strong><br>
              Feel free to reply to this email or reach out to us anytime!
            </p>
          </div>
          
          <div class="cta-section">
            <a href="#" class="btn">Visit Help Center</a>
          </div>
          
          <p style="text-align: center; color: #666; margin-top: 30px; font-size: 14px;">
            We're always here to help you plan your perfect trip! 🌍✈️
          </p>
        </div>
        
        <div class="footer">
          <p><strong>Travel Planner Support Team</strong></p>
          <p>Available 24/7 for your travel needs</p>
          <div style="margin: 20px 0;">
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Help Center</a> |
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">Contact Us</a> |
            <a href="#" style="color: #667eea; text-decoration: none; margin: 0 10px;">FAQs</a>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 20px;">
            © ${new Date().getFullYear()} Travel Planner. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
};

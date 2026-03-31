# 🔐 Environment Variables for Netlify Deployment

## Copy these environment variables to Netlify Dashboard

### Required Variables:

#### 1. MONGODB_URI
**Value:** Your MongoDB Atlas connection string
**Example:**
```
mongodb+srv://travelplanner:YourPassword@cluster.mongodb.net/tour_planner?retryWrites=true&w=majority
```

**How to get:**
1. Go to MongoDB Atlas → Database → Connect
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` with your database user password
5. Replace `test` with `tour_planner`

---

#### 2. JWT_SECRET
**Value:** Random 32+ character string
**Example:**
```
your-super-secret-jwt-key-min-32-characters-long-change-this
```

**How to generate:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

#### 3. EMAIL_USER
**Value:**
```
adiashuto30@gmail.com
```

---

#### 4. EMAIL_PASSWORD
**Value:**
```
fiiq flty ifrz zmwn
```

**Note:** This is your Gmail App Password, not your regular Gmail password.

---

#### 5. EMAIL_FROM
**Value:**
```
Travel Planner <adiashuto30@gmail.com>
```

---

#### 6. NODE_ENV
**Value:**
```
production
```

---

## 📋 Quick Copy Format for Netlify CLI:

```bash
netlify env:set MONGODB_URI "mongodb+srv://travelplanner:YourPassword@cluster.mongodb.net/tour_planner?retryWrites=true&w=majority"
netlify env:set JWT_SECRET "your-super-secret-jwt-key-min-32-characters-long"
netlify env:set EMAIL_USER "adiashuto30@gmail.com"
netlify env:set EMAIL_PASSWORD "fiiq flty ifrz zmwn"
netlify env:set EMAIL_FROM "Travel Planner <adiashuto30@gmail.com>"
netlify env:set NODE_ENV "production"
```

---

## 📋 Variables Table for Netlify Dashboard:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| MONGODB_URI | `mongodb+srv://...` | From MongoDB Atlas |
| JWT_SECRET | `random-32-char-string` | Generate secure random string |
| EMAIL_USER | `adiashuto30@gmail.com` | Gmail address |
| EMAIL_PASSWORD | `fiiq flty ifrz zmwn` | Gmail App Password |
| EMAIL_FROM | `Travel Planner <adiashuto30@gmail.com>` | Email sender name |
| NODE_ENV | `production` | Environment type |

---

## ⚠️ Security Notes:

1. **Never commit .env files to Git**
2. **JWT_SECRET should be unique and random**
3. **Change admin password after first login**
4. **Rotate secrets periodically**
5. **Use different values for staging/production**

---

## 🔄 To Update Variables:

### Using Netlify CLI:
```bash
netlify env:set VARIABLE_NAME "new-value"
```

### Using Netlify Dashboard:
1. Site settings → Environment variables
2. Edit variable
3. Save
4. Trigger redeploy

---

## ✅ Verification:

After setting variables, verify:
```bash
netlify env:list
```

---

## 📞 Need Help?

If email isn't working:
1. Verify EMAIL_USER and EMAIL_PASSWORD
2. Check Gmail App Password is active
3. Enable "Less secure app access" if needed
4. Test with a simple email send

If database isn't connecting:
1. Verify MONGODB_URI format
2. Check MongoDB Atlas IP whitelist (0.0.0.0/0)
3. Verify database user permissions
4. Test connection locally first

#!/bin/bash

echo "🚀 Deploying Travel Planner to Netlify"
echo "========================================"
echo ""

# Check if netlify-cli is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "🔐 Setting up environment variables..."
echo ""

# Set environment variables
netlify env:set MONGODB_URI "mongodb+srv://ashutoshkumar231_db_user:tE6Far909Usr6esJ@cluster0.bvyimii.mongodb.net/tour_planner?retryWrites=true&w=majority&appName=Cluster0"

netlify env:set JWT_SECRET "travel-planner-secret-key-2024-super-secure-random-string"

netlify env:set EMAIL_USER "adiashuto30@gmail.com"

netlify env:set EMAIL_PASSWORD "fiiq flty ifrz zmwn"

netlify env:set EMAIL_FROM "Travel Planner <adiashuto30@gmail.com>"

netlify env:set NODE_ENV "production"

echo ""
echo "✅ Environment variables set!"
echo ""
echo "🚀 Deploying to production..."
netlify deploy --prod

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Your site is now live!"
echo "2. Create admin user in MongoDB Atlas (see MONGODB_SETUP.md)"
echo "3. Test all features"
echo ""

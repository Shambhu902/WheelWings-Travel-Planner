#!/bin/bash

echo "🚀 Travel Planner - Netlify Deployment Setup"
echo "=============================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository. Please run 'git init' first."
    exit 1
fi

# Check if changes are committed
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes."
    echo "📝 Committing changes..."
    git add .
    git commit -m "Add Netlify deployment configuration"
fi

# Push to GitHub
echo "📤 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Setup MongoDB Atlas (FREE): https://www.mongodb.com/cloud/atlas"
echo "2. Deploy to Netlify: https://app.netlify.com"
echo ""
echo "📖 Read full deployment guide: NETLIFY_DEPLOYMENT.md"
echo ""
echo "🎯 Quick Deploy Commands:"
echo "   npm install -g netlify-cli"
echo "   netlify login"
echo "   netlify init"
echo "   netlify deploy --prod"
echo ""

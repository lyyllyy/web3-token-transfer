

echo "🚀 Setting up Web3 Token Transfer..."
echo ""

# Check Node version
required="18.0.0"
current=$(node -v | cut -d'v' -f2)

echo "✓ Node.js: $current"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed"
else
    echo "❌ Failed to install"
    exit 1
fi

# Create .env
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ Created .env file"
    echo "⚠️  Edit .env with your settings"
else
    echo "✓ .env already exists"
fi

chmod +x scripts/*.sh

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env: nano .env"
echo "2. Run: npm start"
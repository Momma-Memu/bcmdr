echo "Checking for NodeJS dependency..."

if command -v node &> /dev/null; then
  echo "NodeJS found"
else
  echo "NodeJS not present... Installing dependency."
  echo "Note: You may need to restart the terminal after installation."
  # installs nvm (Node Version Manager)
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

  # # download and install Node.js (you may need to restart the terminal)
  nvm install lts
  nvm use lts

  # Restart the shell to pull in the bashrc changes.
  exec bash

  # verifies the right Node.js version is in the environment
  if command -v node -v &> /dev/null; then # should print `v20.15.1`
    echo "Unable to install required dependency"
    exit 1
  fi
fi

# package='@types/node'
# if [ `npm list -g | grep -c $package` -eq 0 ]; then
#   echo "Installing node packages..."
#   npm install $package --no-shrinkwrap
# fi

echo "All dependencies resolved! Adding bcmdr to your environment."

dir=$PWD

chmod +x ./bash/bcmdr.sh

# echo '# ----------- Bash Commander -----------' >> ~/.bashrc 
